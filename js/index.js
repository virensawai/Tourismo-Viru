document.addEventListener('DOMContentLoaded', () => {
            // --- Intersection Observer for animations ---
            const aboutSections = document.querySelectorAll('.about-section');
            if (aboutSections.length > 0) {
                const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
                const observerCallback = (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                        } else {
                            entry.target.classList.remove('is-visible');
                        }
                    });
                };
                const observer = new IntersectionObserver(observerCallback, observerOptions);
                aboutSections.forEach(section => observer.observe(section));
            }

            // --- Mobile Menu Toggle ---
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            if (mobileMenuButton && mobileMenuOverlay) {
                mobileMenuButton.addEventListener('click', () => {
                    const isOpen = mobileMenuOverlay.classList.toggle('open');
                    mobileMenuButton.setAttribute('aria-expanded', isOpen);
                });
                // [FIX] Close mobile menu when a link is clicked
                mobileMenuOverlay.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenuOverlay.classList.remove('open');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    });
                });
            }

            // --- Smart Assistant Logic ---
            const chatFab = document.getElementById('chat-fab');
            const chatContainer = document.getElementById('chat-container');
            const closeChatBtn = document.getElementById('close-chat-btn');
            const chatMessages = document.getElementById('chat-messages');
            const chatInput = document.getElementById('chat-input');
            const sendChatBtn = document.getElementById('send-chat-btn');

            const toggleChat = () => chatContainer.classList.toggle('visible');
            chatFab.addEventListener('click', toggleChat);
            closeChatBtn.addEventListener('click', toggleChat);
            
            const addMessage = (sender, message) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message', `${sender}-message`);
                if (sender === 'user') {
                    messageElement.textContent = message;
                } else {
                    messageElement.innerHTML = message; // HTML for assistant markdown
                }
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            };
            
            const showLoadingIndicator = () => {
                const indicatorElement = document.createElement('div');
                indicatorElement.classList.add('chat-message', 'assistant-message');
                indicatorElement.id = 'loading-indicator';
                indicatorElement.innerHTML = `
                    <div class="loading-indicator">
                        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                    </div>`;
                chatMessages.appendChild(indicatorElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            };

            const hideLoadingIndicator = () => {
                const indicator = document.getElementById('loading-indicator');
                if (indicator) indicator.remove();
            };

            const handleSendMessage = async () => {
                const userMessage = chatInput.value.trim();
                if (!userMessage) return;

                addMessage('user', userMessage);
                chatInput.value = '';
                showLoadingIndicator();

                try {
                    const assistantResponse = await getAssistantResponse(userMessage);
                    hideLoadingIndicator();
                    addMessage('assistant', assistantResponse);
                } catch (error) {
                    hideLoadingIndicator();
                    addMessage('assistant', "I'm sorry, I'm having a bit of trouble connecting right now. Please try again in a moment.");
                    console.error("Error getting assistant response:", error);
                }
            };

            sendChatBtn.addEventListener('click', handleSendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSendMessage();
            });

            // --- Gemini API Call ---
            const getAssistantResponse = async (userQuery, retries = 3, delay = 1000) => {
                const apiKey = ""; // API key is handled by the environment, leave empty
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const systemPrompt = `You are 'Tourismo', a friendly and expert AI guide for the Tourismo website. Your sole purpose is to help users with their travel plans for Amravati. Your knowledge base consists of these locations: Bamboo Garden, Oxygen Park, Ambadevi Temple, Chhatri Talao, and Wadali Talao & Garden. Keep your answers concise, helpful, and focused strictly on Amravati tourism. If asked about anything else, politely decline and steer the conversation back to Amravati travel.`;

                const payload = {
                    contents: [{ parts: [{ text: userQuery }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                };

                for (let i = 0; i < retries; i++) {
                    try {
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) {
                            throw new Error(`API Error: ${response.status}`);
                        }

                        const result = await response.json();
                        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                        
                        if (text) {
                            // [SECURITY] Sanitize output: escape HTML entities, then apply bold formatting
                            const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                            return escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        } else {
                            throw new Error("Invalid response structure from API.");
                        }
                    } catch (error) {
                        console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
                        if (i === retries - 1) throw error; // Throw error on last attempt
                        await new Promise(res => setTimeout(res, delay));
                        delay *= 2; // Exponential backoff
                    }
                }
            };

            // Initial greeting
            addMessage('assistant', 'Hello! I am the Tourismo Assistant. How can I help you plan your visit to Amravati today?');
        });