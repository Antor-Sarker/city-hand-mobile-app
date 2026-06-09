# CityHand Mobile App

A modern local service marketplace mobile application built with React Native Expo, allowing users to discover services, book appointments, manage bookings, and maintain their profiles seamlessly.


## Demo Video
[🎥 Watch Demo Video](https://drive.google.com/file/d/1AuNO1FXJ0NFBoF-j6e-ysaJZyvuKPS0r/view?usp=sharing)

## 📱 Overview

CityHand is a local service provider platform that connects customers with service professionals. The mobile application provides a smooth booking experience, secure authentication, service discovery, and booking management.

This project is part of the CityHand ecosystem, which includes:

* Mobile App (React Native Expo)
* Web Application (Next.js)
* Backend API (Express.js & MongoDB)

---

## 🚀 Quick Start

```bash
git clone https://github.com/Antor-Sarker/city-hand-mobile-app.git
cd city-hand-mobile-app
npm install
npx expo start
```

---

## ⚙️ Installation & Setup

### Prerequisites

Before running the project, make sure you have installed:

* Node.js (v20+ recommended)
* npm
* Git
* Expo Go App (for physical device testing)
* Android Studio (optional for emulator)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/cityhand-mobile.git
cd cityhand-mobile
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the project root:

Example:

```env
EXPO_PUBLIC_BASE_URL=http://localhost:5000/api
```

For testing on a physical device:

```env
EXPO_PUBLIC_BASE_URL=http://192.168.1.100:5000/api
```

For Live Api:

```env
EXPO_PUBLIC_BASE_URL=https://city-hand-backend.onrender.com/api
```

---

### 4. Start Development Server

```bash
npx expo start
```

Or

```bash
npm start
```

---

### Run on Android

```bash
npm run android
```

---

### Run on iOS

```bash
npm run ios
```

> Requires macOS and Xcode.

---

## 📱 Testing on Physical Device

1. Install Expo Go from Play Store or App Store.
2. Run:

```bash
npx expo start
```

3. Scan the QR code using Expo Go.
4. The app will launch directly on your device.

---

## 🔐 Authentication & Authorization

* User Registration (Signup)
* User Login
* Access Token Authentication
* Refresh Token Authentication
* Protected Routes
* Authentication Context API
* Secure Session Management
* Logout Functionality

---

## ✨ Features

### Home Screen

* Dynamic Service Listing
* Category-Based Service Filtering
* Service Search
* Debounced Search API Calls
* Horizontal Category Navigation
* Modern App Bar UI
* Bottom Tab Navigation

### Service Management

* View Service Details
* Navigate to Booking Screen
* Create Service Booking

### Booking Management

* View All My Bookings
* Edit Booking
* Cancel Booking
* Confirm Booking
* Booking Status Tracking

### Profile Management

* View User Profile
* Account Information Display
* Logout Support

---

## 🛠 Tech Stack

### Mobile Application

* React Native
* Expo SDK
* TypeScript
* React Navigation
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Access Token & Refresh Token

### Web Application

* Next.js
* JavaScript

---

## 🔄 Authentication Flow

1. User signs up or logs in.
2. Backend generates Access Token and Refresh Token.
3. Access Token is attached to API requests using Axios.
4. Expired Access Tokens are refreshed automatically.
5. Protected screens are accessible only to authenticated users.

---

## 📸 Main Screens

* Sign In Screen
* Sign Up Screen
* Home Screen
* Services Search
* Service Details Screen
* Booking Screen
* My Bookings Screen
* Profile Screen

---

## 📋 API Documentation

https://documenter.getpostman.com/view/41187911/2sBXirjoqX

---

## 🔗 Related Repositories

### Backend Repository

https://github.com/Antor-Sarker/city-hand-backend

### Web Frontend Repository

https://github.com/Antor-Sarker/city-hand

---

## 📈 Key Learning Outcomes

* React Native App Development with Expo
* Secure JWT Authentication
* Access & Refresh Token Implementation
* API Integration using Axios
* Context API State Management
* Protected Navigation Flow
* Search Optimization using Debouncing
* Mobile UI/UX Development
* Full-Stack Application Architecture

---

## 🔮 Future Improvements

* Push Notifications
* Real-Time Booking Updates
* Rating & Review System
* Chat System
* Service Provider Dashboard
* Dark Mode Support

---

## 👨‍💻 Author

Antor Sarker

Full Stack & React Native Developer

Tech Stack:
React Native • Expo • TypeScript • Node.js • Next.js • Express.js • MongoDB
