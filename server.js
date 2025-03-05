const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔹 Shared secret key (Fixed, so all users can decrypt messages)
const secretKey = crypto.createHash('sha256').update('my-secure-chat-key').digest();

// Encrypt function
function encryptMessage(message) {
    const iv = crypto.randomBytes(16); // Generate a new IV for each message
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') };
}

// Decrypt function
function decryptMessage(encryptedData, ivHex) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle messages sent by clients
    socket.on('sendMessage', (msg) => {
        console.log("Received Message from", socket.id, ":", msg);
        const encryptedMsg = encryptMessage(msg);

        // Send the encrypted message back to the sender (for display purposes)
        socket.emit('receiveEncryptedMessage', encryptedMsg);

        // Broadcast the encrypted message to all other clients
        socket.broadcast.emit('receiveMessage', encryptedMsg);
    });

    // Handle decryption requests
    socket.on('decryptMessage', (encryptedMsg) => {
        try {
            const decryptedMsg = decryptMessage(encryptedMsg.encryptedData, encryptedMsg.iv);
            // Send the decrypted message only to the requesting client (receiver)
            socket.emit('decryptedMessage', decryptedMsg);
        } catch (error) {
            console.error("Decryption failed:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});