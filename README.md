# 🛒 E-Commerce Web Application

🎥 **Demo Video:** https://youtu.be/TuoYUaecMxI  
👨‍💻 **Author:** Nishant Jha 

---

## 📌 Overview

A **full-stack E-Commerce Web Application** built with **React.js** and **Spring Boot**, designed to provide a smooth online shopping experience.

This project demonstrates real-world development concepts including **REST APIs, JWT authentication, database integration, and frontend–backend communication**.

---

## ✨ Key Features

### 🛒 Product Management
- Dynamic product listing  
- Categories & search  
- Product detail pages  

### 👤 User Authentication
- Signup & Login  
- JWT based authentication  

### 🛍️ Cart & Checkout
- Add / remove products  
- Update quantities  
- Checkout flow (demo)  

### 📱 Responsive UI
- Mobile & Desktop optimized  

### ⚡ REST APIs
- User APIs  
- Product APIs  
- Order APIs  

---

## 🧠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- React Router  
- Context API / Redux  

### Backend
- Spring Boot  
- Java  
- Spring Data JPA  
- RESTful APIs  

### Database
- MySQL  

### Tools
- Postman  
- Git & GitHub  

---

## 📁 Project Structure
E-Commerce_App
│
├── ecommerce_frontend # React Frontend
├── E-commerce_backend # Spring Boot Backend
└── README.md

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14+)  
- Java JDK 17+  
- Maven  
- MySQL  
- Git  

---

## 📥 Clone Repository

```bash
git clone https://github.com/jhanishant658/E-Commerce_App.git
cd E-Commerce_App

---

##▶️ Frontend Setup (React)

cd ecommerce_frontend
npm install
npm start
Frontend Runs at : http://localhost:3000

##▶️ Backend Setup (Spring Boot)

cd E-commerce_backend
mvn clean install
mvn spring-boot:run
Backend runs at: http://localhost:8080

##🔐 Backend Configuration

Update application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password

jwt.secret=your_jwt_secret
