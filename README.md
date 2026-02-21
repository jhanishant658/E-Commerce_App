  # 🛒 E-Commerce Web Application

  A full-stack e-commerce application with a **React frontend** and **Spring Boot backend**.

- **Frontend:** `e-commerce_frontend`
- **Backend:** `E-Commerce_Backend`

  ---

  ## 📌 Project Overview

  This repository contains two apps that run together:
  
- A customer/admin web UI for product browsing, cart, checkout, and order management.
- A REST API backend for authentication, product/catalog management, cart, orders, ratings/reviews, and payment order creation.

---

## 🧱 Repository Structure

```text
E-Commerce_App/
├── e-commerce_frontend/      # React app (customer + admin UI)
├── E-Commerce_Backend/       # Spring Boot REST API
└── README.md
```
## ✨ Features

### Customer Features
- Sign up and sign in
- Browse products by category
- Product search
- Product detail page
- Add to cart, update quantity, remove items
- Checkout flow
- Order history and order detail view

### Admin Features
- Admin sign in
- Admin dashboard
- Add products
- View all orders
- Update order status

### Backend Features
- REST APIs for auth, products, cart, orders, ratings, reviews, payments
- JWT token generation/validation utilities
- Spring Security + BCrypt password hashing
- MySQL persistence with Spring Data JPA
- Razorpay order creation endpoint

  ---

## 🧰 Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Tailwind CSS
- Material UI
- Framer Motion

### Backend
- Java 17
- Spring Boot 3
- Spring Web
- Spring Security
- Spring Data JPA
- MySQL
- JJWT
- Razorpay Java SDK

### Database
- MySQL  
---

## ✅ Prerequisites

Install before running:
- **Node.js** 18+ (recommended)
- **npm**
- **Java** 17+
- **Maven** 3.9+ (or use Maven Wrapper)
- **MySQL** 8+

---

## 🚀 Getting Started
## 🚀 Local Setup

## 1) Clone repository

```bash
git clone https://github.com/jhanishant658/E-Commerce_App.git
cd E-Commerce_App
```

## 2) Configure and run backend

```bash
cd E-Commerce_Backend
```

Edit `src/main/resources/application.properties` for your local database and payment keys.

Example:

  ```properties
spring.application.name=E-Commerce-Backend
spring.datasource.url=jdbc:mysql://localhost:3306/ECommerceDB
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
server.port=8081

# Razorpay (test keys)
razorpay.key=YOUR_RAZORPAY_KEY
razorpay.secret=YOUR_RAZORPAY_SECRET
```

Run backend:

```bash
      Option A: Maven Wrapper (if needed once: chmod +x mvnw)
./mvnw spring-boot:run

# Option B: System Maven
mvn spring-boot:run
```

Backend URL: `http://localhost:8081`

## 3) Install and run frontend

  Open a new terminal:
 
```bash
cd e-commerce_frontend
npm install
npm start
```

##▶️ Backend Setup (Spring Boot)
Frontend URL: `http://localhost:3000`
---

## 🔌 API Reference (high-level)

Base URL: `http://localhost:8081`

### Auth
- `POST /auth/signup`
- `POST /auth/signin`

### Products
- `POST /admin/products`
- `PUT /admin/products/{id}`
- `DELETE /admin/products/{id}`
- `GET /products/{id}`
- `GET /products/category/{categoryId}`
- `GET /products/filter`
- `GET /product/search/{searchTerm}`
- `GET /product/{FirstLevelCategory}/{SecondLevelCategory}/{ThirdLevelCategory}`

### Cart
- `POST /cart`
- `POST /cartitem/{userId}`
- `GET /usercart/{userId}`
- `PATCH /cartitem/{userId}/{cartItemId}`
- `DELETE /cartItem/{userId}/{cartItemId}`

### Orders
- `POST /order/{userId}`
- `GET /order/getAllOrder`
- `GET /order/orderhistory/{userId}`
- `GET /order/orderDetail/{orderId}`
- `PATCH /order/updateOrder/{orderId}/{OrderStatus}`
- `DELETE /order/cancelOrder/{orderid}`

### Reviews & Ratings
- `POST /review/{userId}`
- `GET /review/{productId}`
- `POST /rating/{userId}`
- `GET /rating/{productId}`

### Payments
- `POST /payment/create-order`

---

## 🧪 Verification Commands
From project root:

```bash
# Backend test
cd E-Commerce_Backend && mvn test

# Frontend production build
cd ../e-commerce_frontend && npm run build
```

---

## 🔒 Security Recommendations

Current backend config may include sensitive credentials in `application.properties`.

Recommended improvements:
- Move DB and payment keys to environment variables.
- Keep secrets out of Git history.
- Rotate previously exposed credentials.
- Add an `application-local.properties` (gitignored) for developer machines.

---

## 👨‍💻 Author

- Nishant Jha
  ---
- Demo Video: https://youtu.be/TuoYUaecMxI
  --

