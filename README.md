<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/your-username/alumniconnect">
    <img src="client/src/assets/logo.png" alt="Logo" width="140" height="140">
  </a>

  <h1 align="center"> AlumniConnect</h1>

  <p align="center">
    <b>A Full-Stack Ecosystem for Academic Networking & Career Growth</b>
  </p>
</div>

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

<br />

## 🚀 Overview

**AlumniConnect** is an enterprise-grade MERN stack application designed to bridge the gap between students and alumni. Unlike static directories, this platform features **real-time communication**, **job referral systems**, and **event management** to foster genuine professional relationships.

It implements complex features like Role-Based Access Control (RBAC), WebSocket-based messaging, and secure SMTP email services.

---

## 🏗️ System Architecture

The application follows a decoupled **Client-Server** architecture to ensure scalability.

```mermaid
graph TD;
    User[End User] -->|HTTPS| Client[React Frontend];
    Client -->|REST API| Server[Node/Express Backend];
    Client -->|Socket.io| Socket[Real-Time Service];
    Server -->|Mongoose| DB[(MongoDB Atlas)];
    Server -->|Nodemailer| SMTP[Email Gateway];
    Server -->|JWT| Auth[Authentication Layer];
    
    subgraph "Backend Services"
        Server
        Socket
        Auth
    end
