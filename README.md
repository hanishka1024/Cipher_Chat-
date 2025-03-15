# Cipher_Chat

Cipher Chat is a real-time encrypted chat application built using **Node.js, Express, Socket.io, and AES encryption** to ensure secure messaging between users. The application encrypts messages before transmission and decrypts them only for the intended receiver.

## 🚀 Features
- **End-to-End Encryption**: Messages are encrypted using AES-256-CBC before being transmitted.
- **Real-time Messaging**: Uses WebSockets (Socket.io) for instant chat updates.
- **User-Friendly UI**: Built with **Tailwind CSS** for a sleek and responsive design.
- **Put-to-Light UI Enhancements**: Messages are visually differentiated between sender and receiver.
- **Scalable System**: Can handle multiple users and groups.

## 🛠 Tech Stack
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express.js
- **WebSocket Communication**: Socket.io
- **Encryption**: Crypto module (AES-256-CBC)

## 📂 Project Structure
```
CipherChat/
│── public/            # Frontend Files
│   ├── index.html     # Main Chat UI
│   ├── script.js      # Handles socket communication
│── server.js          # Backend server & WebSocket logic
│── package.json       # Dependencies & scripts
│── README.md          # Project documentation
```
## 📡 How It Works
1. A user enters a message and sends it.
2. The message is encrypted using **AES-256-CBC**.
3. The encrypted message is sent over WebSockets (Socket.io) to all clients.
4. The receiver requests decryption from the server.
5. The server decrypts and displays the message.

## 🔒 Security Measures
- **AES-256 Encryption** ensures messages are unreadable during transmission.
- **IV (Initialization Vector)** is randomly generated for each message for enhanced security.
- **Server handles decryption requests** only for the intended recipients.


