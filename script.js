document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener("DOMContentLoaded", () => {
    const commandInput = document.getElementById("command-input");
    const output = document.getElementById("output");
    const voiceAssistantPage = document.getElementById("voice-assistant-page");
    const terminal = document.getElementById("terminal");
    const assistantText = document.getElementById("assistant-text");
    const chatMessages = document.getElementById("chat-messages");
    const chatInputField = document.getElementById("chat-input-field");
    const sendButton = document.getElementById("send-button");
    
    // Display the terminal after 5 seconds
    setTimeout(() => {
        document.querySelector(".welcome-page").style.display = "none";
        document.querySelector("#terminal").style.display = "block";
    }, 5000);

    document.getElementById("wlcmtxt").style.letterSpacing = "12px";

    // Define terminal commands
    const commands = {
        about: "My name is Rishi Kant Shukla. I am a Python Developer. I am pursuing B.Tech in Electronics and Communication.",
        projects: `
            1. Project 1 - VYOM - Virtual Yield Optimization Machine. It is a bot designed using PyTorch and TensorFlow.<br>
            2. Project 2 - Gym E-Commerce website for Shivay Fitness.<br>
            3. Project 3 - Portfolio Website.
        `,
        skills: `
            Python <br>
            C <br>
            HTML, CSS and JavaScript <br>
            React.js
        `,
        clear: () => {
            const outputChildren = output.children;
            while (outputChildren.length > 3) {
                output.removeChild(outputChildren[3]);
            }
        },
        voice: () => {
            transitionToVoiceAssistant();
        }
    };

    commandInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const inputValue = commandInput.value.trim().toLowerCase();
            if (commands[inputValue]) {
                if (typeof commands[inputValue] === "function") {
                    commands[inputValue]();
                } else {
                    const response = commands[inputValue];
                    const newOutput = document.createElement("p");
                    newOutput.innerHTML = `<span class="prompt">C:\\Users\\Visitor&gt;</span> ${inputValue}`;
                    output.appendChild(newOutput);

                    const newResponse = document.createElement("p");
                    newResponse.innerHTML = response;
                    output.appendChild(newResponse);

                    output.scrollTop = output.scrollHeight;

                    appendChatMessage('user', inputValue);
                    appendChatMessage('bot', response);
                }
            } else {
                const newOutput = document.createElement("p");
                newOutput.innerHTML = `<span class="prompt">C:\\Users\\Visitor&gt;</span> ${inputValue}`;
                output.appendChild(newOutput);

                const newResponse = document.createElement("p");
                newResponse.innerHTML = `'${inputValue}' is not recognized as a command.`;
                output.appendChild(newResponse);

                output.scrollTop = output.scrollHeight;

                appendChatMessage('user', inputValue);
                appendChatMessage('bot', `'${inputValue}' is not recognized as a command.`);
            }

            commandInput.value = "";
        }
    });
    const texts = [
      'Python Developer 🤖',
      'Machine Learning Enthusiast 🤓',
      'Data Science Explorer 🔍',
      'Web Development Wizard ⚡️'
    ];
    let currentTextIndex = 0;
    let currentText = '';
    let typingSpeed = 50; // in milliseconds
    
    function typeText() {
      if (currentText.length < texts[currentTextIndex].length) {
        currentText += texts[currentTextIndex].charAt(currentText.length);
        typedTextElement.innerText = currentText;
        setTimeout(typeText, typingSpeed);
      } else {
        currentText = '';
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, 2000); // wait for 2 seconds before typing the next text
      }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      typeText();
    });
  
    document.getElementById("wlcmtxt").style.letterSpacing = "12px";
    // Voice assistant introduction
    function introduceVoiceAssistant() {
        const introductionText = "Hello! I am Vyom, your voice assistant.";
        speakText(introductionText);
    }

    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
    
        // Start the wave animation when speaking
        utterance.onstart = () => {
            document.getElementById("assistant-text").innerText = text;
            document.getElementById('voice-wave').style.display = 'flex';
        };
    
        // Stop the wave animation when speech ends
        utterance.onend = () => {
            document.getElementById("assistant-text").innerText = "Click Listen to Speak Again!";
            document.getElementById('voice-wave').style.display = 'none';
        };
    
        window.speechSynthesis.speak(utterance);
    }
    

    function transitionToVoiceAssistant() {
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.style.display = 'none';
            voiceAssistantPage.style.display = 'flex';
            setTimeout(() => {
                voiceAssistantPage.style.opacity = '1';
                introduceVoiceAssistant();
            }, 10);
        }, 500);
    }

    document.getElementById("listen-button").addEventListener("click", () => {
        startVoiceAssistant();
    });

    document.getElementById("back-button").addEventListener("click", () => {
        transitionToTerminal();
    });

    sendButton.addEventListener("click", () => {
        const message = chatInputField.value.trim();
        if (message) {
            appendChatMessage('user', message);
            handleChatInput(message);
            chatInputField.value = '';
        }
    });

    chatInputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });

    function startVoiceAssistant() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                document.getElementById("assistant-text").innerText = "Listening...";
            };

            recognition.onresult = (event) => {
                const voiceCommand = event.results[0][0].transcript.toLowerCase().trim();
                document.getElementById("assistant-text").innerText = `Recognized Command: ${voiceCommand}`;
                appendChatMessage('user', voiceCommand);
                handleVoiceCommand(voiceCommand);
            };

            recognition.onerror = (event) => {
                document.getElementById("assistant-text").innerText = `Error occurred: ${event.error}`;
            };

            recognition.onend = () => {
                document.getElementById("assistant-text").innerText = "Click Listen to Speak Again!";
            };

            recognition.start();
        } else {
            document.getElementById("assistant-text").innerText = "Your browser does not support voice recognition.";
        }
    }

    function handleVoiceCommand(command) {
        const voiceCommands = {
            "hello": "Hello! How can I assist you today?",
            "hi vyom": "Hello! How can I assist you today?",
            "hello vyom": "Hello! How can I assist you today?",
            "tell me about you": "I am VYOM, Virtual Yield Optimization Machine!",
            "who designed you": "I was designed by Rishi Sir.",
            "who developed you": "I was developed by Rishi Sir.",
            "who is rishi kant shukla": "He is a Python Developer and a Machine Learning Enthusiast.",
            "help": "You can ask me about myself, know who designed me, and what I can do!"
        };

        const response = voiceCommands[command] || `'${command}' is not recognized as a command.`;
        document.getElementById("assistant-text").innerText = response;
        speakText(response);
        appendChatMessage('bot', response);
    }

    function handleChatInput(input) {
        const voiceCommands = {
            "hello": "Hello! How can I assist you today?",
            "hi vyom": "Hello! How can I assist you today?",
            "hello vyom": "Hello! How can I assist you today?",
            "tell me about you": "I am VYOM, Virtual Yield Optimization Machine!",
            "who designed you": "I was designed by Rishi Sir.",
            "who developed you": "I was developed by Rishi Sir.",
            "who is rishi kant shukla": "He is a Python Developer and a Machine Learning Enthusiast.",
            "help": "You can ask me about myself, know who designed me, and what I can do!"
        };

        const response = voiceCommands[input.toLowerCase()] || `'${input}' is not recognized as a command.`;
        appendChatMessage('bot', response);
        speakText(response);
    }

    function appendChatMessage(sender, message) {
        const chatMessage = document.createElement("div");
        chatMessage.className = `chat-message ${sender}`;
        chatMessage.innerHTML = message;
        chatMessages.appendChild(chatMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function transitionToTerminal() {
        voiceAssistantPage.style.opacity = '0';
        setTimeout(() => {
            voiceAssistantPage.style.display = 'none';
            terminal.style.display = 'block';
            setTimeout(() => {
                terminal.style.opacity = '1';
            }, 10);
        }, 500);
    }
});




//CMD SOUND//
// Get the input and audio elements
const commandInput = document.getElementById("command-input");
const inputSound = document.getElementById("input-sound");
const typingSound = document.getElementById("typing-sound");

// Add click event listener to the input field
commandInput.addEventListener("click", function() {
    // Play the sound
    inputSound.play();
});
commandInput.addEventListener("keydown", function() {
    // Play the sound
    typingSound.currentTime = 0; // Reset audio to start
    typingSound.play();
       
        // Set a timeout to stop the sound after a specified duration (e.g., 200ms)
        soundTimeout = setTimeout(() => {
            typingSound.pause();
        }, 1000); // Change the duration (in milliseconds) as needed
});



// TYPED-TEXT ON CMD //
const typedTextElement = document.getElementById('typed-text');
  const texts = [
    'Python Developer 🤖',
    'Machine Learning Enthusiast 🤓',
    'Data Science Explorer 🔍',
    'Web Development Wizard ⚡️'
  ];
  let currentTextIndex = 0;
  let currentText = '';
  let typingSpeed = 50; // in milliseconds
  
  function typeText() {
    if (currentText.length < texts[currentTextIndex].length) {
      currentText += texts[currentTextIndex].charAt(currentText.length);
      typedTextElement.innerText = currentText;
      setTimeout(typeText, typingSpeed);
    } else {
      currentText = '';
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setTimeout(typeText, 2000); // wait for 2 seconds before typing the next text
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    typeText();
  });