const socket = io();

// Select elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');

// Debugging - Check if script runs
console.log("Script Loaded: Chat App Started");

// Send button click event
sendButton.addEventListener('click', async () => {
    console.log("Send button clicked");
    await sendMessage();
});

// Enter key event listener
messageInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        console.log("Enter key pressed");
        await sendMessage();
    }
});

// Function to send a message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        console.log("Empty message - not sending");
        return;
    }

    console.log("Sending message:", message);
    socket.emit('sendMessage', message); // Send message to server
    messageInput.value = ''; // Clear input field
}

// Receive encrypted messages (for the sender)
socket.on('receiveEncryptedMessage', (encryptedMsg) => {
    console.log("Received Encrypted Message (Sender):", encryptedMsg);

    // Display encrypted message in chat box (only for the sender)
    const encryptedElement = document.createElement('div');
    encryptedElement.classList.add(
        'p-2', 'bg-blue-500', 'text-white', 'rounded-lg', 'text-sm', 'max-w-xs', 'self-end', 'shadow-lg'
    ); // Use Tailwind's predefined colors

    encryptedElement.innerHTML = `<b>Encrypted:</b> ${encryptedMsg.encryptedData}`;
    chatBox.appendChild(encryptedElement);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Receive encrypted messages (for the receiver)
socket.on('receiveMessage', (encryptedMsg) => {
    console.log("Received Encrypted Message (Receiver):", encryptedMsg);

    // Request server to decrypt message
    socket.emit('decryptMessage', encryptedMsg);
});

// Receive decrypted message (for the receiver)
socket.on('decryptedMessage', (decryptedMsg) => {
    console.log("Decrypted Message (Receiver):", decryptedMsg);

    // Display decrypted message in chat box (only for the receiver)
    const decryptedElement = document.createElement('div');
    decryptedElement.classList.add(
        'p-2', 'bg-purple-500', 'text-white', 'rounded-lg', 'text-sm', 'max-w-xs', 'self-start', 'shadow-lg'
    ); // Changed to purple for better contrast

    decryptedElement.innerHTML = `<b>Decrypted:</b> ${decryptedMsg}`;
    chatBox.appendChild(decryptedElement);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});
