# FakeStore E-Commerce App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📌 Project Overview

FakeStore is a fully functional front-end E-Commerce application built with React. It allows users to browse, create, update, and delete products using the [FakeStoreAPI](https://fakestoreapi.com/), a mock REST API designed for testing and prototyping.

> **Note:** FakeStoreAPI is a testing API. While it responds positively to POST, PUT, and DELETE requests, changes do not persist in their backend. This project is designed to demonstrate front-end API integration and CRUD functionality.

---

## ✨ Features

### 🏠 Home Page

- Polished hero section with a welcome message and store introduction
- "Browse Products" and "Add a Product" call-to-action buttons
- "Why It Feels Better" feature section highlighting app improvements
- FakeStoreAPI disclaimer clearly displayed below the action buttons
- Fully styled with custom React Bootstrap components

### 🛍 Product Listing Page

- Fetches and displays all products from FakeStoreAPI
- Search by title or description
- Filter by category
- Product count display ("Showing X of Y products")
- Each product card shows image, title, price, and a "View Details" button
- Smooth card hover animations

### 📄 Product Details Page

- Displays full product information: image, title, description, category, and price
- Teal-styled category badge
- Star rating display with review count
- Edit Product button
- Delete Product button with confirmation modal before deletion
- Redirects to product listing after deletion

### ➕ Add Product Page

- Form with fields for title, price, description, and category
- Full Bootstrap form validation with custom error messages
- Success toast notification on submission
- Auto-redirects to product listing after successful creation
- Frosted glass card wrapper styling
- FakeStoreAPI disclaimer displayed below the submit button

### ✏️ Edit Product Page

- Pre-fills form with existing product data
- Full Bootstrap form validation
- Success toast notification on update
- Auto-redirects to product details after successful update
- Frosted glass card wrapper styling
- FakeStoreAPI disclaimer displayed below the submit button

### 🗑 Delete Product

- Confirmation modal before deletion
- Redirects to product listing after deletion

### 🧭 Navigation Bar

- Fully responsive React Bootstrap Navbar
- Active link highlighting with animated underline
- Links to Home, Products, and Add Product
- Works correctly on mobile view with hamburger menu

### 🦶 Footer

- Consistent styling matching the navbar
- Displays across all pages
- Sticks to the bottom of the page regardless of content height

---

## 🚀 Additional Improvements

Beyond the core requirements, the following enhancements were implemented:

- **Accessibility features** — skip-to-content link, ARIA labels, focus management, and keyboard navigation support
- **Reduced motion support** — respects `prefers-reduced-motion` browser settings for animations
- **Scroll to top on route change** — smooth scroll behavior when navigating between pages
- **Route Error Boundary** — catches and handles errors in routes gracefully
- **Search and category filtering** — on the product listing page
- **Toast notifications** — for success messages on create and update
- **Auto-redirect after actions** — after creating or updating a product
- **Loading indicators** — spinners displayed while API calls are in progress
- **Error handling** — user-friendly error messages throughout the app
- **FakeStoreAPI disclaimer** — clearly communicated on the homepage and on the Add Product and Edit Product forms, informing users that changes will not persist
- **Custom CSS theme** — teal/aquamarine color scheme with frosted glass effects, gradient backgrounds, and subtle grid overlay
- **Google Fonts** — Fraunces (serif) and Inter Tight for polished typography
- **Star rating display** — on the product details page using FakeStoreAPI rating data
- **Price formatting** — consistent two-decimal formatting throughout
- **Product card hover effects** — smooth lift animation on product cards

---

## 🛠 Technologies Used

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| React            | UI component framework              |
| React Router DOM | Client-side routing and navigation  |
| Axios            | HTTP requests to FakeStoreAPI       |
| React Bootstrap  | UI components and responsive layout |
| Bootstrap        | CSS framework and utilities         |
| JavaScript       | Core programming language           |
| CSS3             | Custom styling and theming          |
| Vite             | Development build tool              |
| FakeStoreAPI     | Mock REST API for product data      |

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd fakestore-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AsyncStatus.jsx
│   ├── Footer.jsx
│   ├── NavBar.jsx
│   ├── ProductCard.jsx
│   └── RouteErrorBoundary.jsx
├── pages/
│   ├── AddProduct.jsx
│   ├── EditProduct.jsx
│   ├── HomePage.jsx
│   ├── ProductDetails.jsx
│   └── ProductList.jsx
├── utils/
│   └── fakestore.js
├── App.css
├── App.jsx
└── main.jsx
```

---

## 📋 API Reference

Base URL: `https://fakestoreapi.com`

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/products`     | Fetch all products         |
| GET    | `/products/:id` | Fetch a single product     |
| POST   | `/products`     | Create a new product       |
| PUT    | `/products/:id` | Update an existing product |
| DELETE | `/products/:id` | Delete a product           |

---

## ⚠️ Important Note About FakeStoreAPI

FakeStoreAPI is a mock API for testing purposes. All POST, PUT, and DELETE requests will return a successful response, but **no data is actually modified** on their servers. This is expected behavior and is clearly communicated within the app on the homepage and all product action forms.

---

_Built with React as part of the Coding Temple curriculum._
