# 🏪 Shop Capstone Project

A simple **Shop Owner Loyalty & Customer Management App** — built with **MERN Stack** (MongoDB, Express, React, Node.js).

---

## 📋 Overview

This project helps shop owners:
- ✅ Register and log in securely
- ✅ Add customers to a loyalty list
- ✅ Track how many times a customer visits
- ✅ Reward loyal customers
- ✅ Manage customers easily with a clean dashboard

---

## 🚀 Features

- **Shop Owner Auth:** Register & Login with JWT tokens
- **Customer Registry:** Add new customers with name & phone
- **Visit Counter:** Automatically counts total visits
- **Dashboard:** View & manage all your customers
- **Protected Routes:** Only logged-in shop owners can manage customers


## ⚙️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Axios, React Router |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |

---

## 📂 Project Structure

```plaintext
shop-capstone/
 ├── client/               # React frontend
 │   ├── src/
 │   │   ├── components/   # Login, Register, Dashboard, AddCustomer
 │   │   ├── services/     # Axios API instance
 │   │   ├── styles/       # CSS files
 │   │   └── App.js
 │   └── public/
 ├── server/               # Node.js + Express backend
 │   ├── controllers/      # Auth & Customer logic
 │   ├── models/           # Mongoose Schemas
 │   ├── routes/           # API Routes
 │   ├── middleware/       # Auth Middleware
 │   ├── config/           # DB config
 │   └── server.js
 ├── .env                  # Environment variables
 ├── package.json
 └── README.md
⚡ How to Run Locally
1️⃣ Clone the repo

bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/shop-capstone.git
cd shop-capstone
2️⃣ Install backend

bash
Copy
Edit
cd server
npm install
3️⃣ Install frontend

bash
Copy
Edit
cd ../client
npm install
4️⃣ Setup environment

Create .env in /server:

env
Copy
Edit
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
5️⃣ Run backend

bash
Copy
Edit
cd ../server
npm run dev
6️⃣ Run frontend

bash
Copy
Edit
cd ../client
npm start





Here is a link to my app on Netlify

Here is a link to my backend on Render


Here  is a link to a short demo on how my app works
https://drive.google.com/file/d/12HtukQUhp6pHGAb1Pld_4nsGM_wPKHoT/view?usp=drive_link

