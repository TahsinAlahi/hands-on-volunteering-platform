# HandsOn - Social Volunteering Platform

---

## 📌 Project Overview

HandsOn is a community-driven platform designed to connect individuals with volunteering opportunities. It allows users to sign up, manage their profiles, explore available volunteer events, and request or offer help within the community. The platform aims to enhance collaboration and make volunteering more accessible, encouraging people to give back to society.

### [Frontend Link](https://handson-frontend.vercel.app/)

### [Backend Link](https://handson-server.vercel.app/)

---

## 📌 Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication
  - bcrypt for password hashing
  - dotenv for environment variable management
  - morgan for logging requests

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - Axios for API requests
  - React Query for data fetching
  - React Toastify for notifications

---

## 📌 Features

- **User Registration & Profile Management**:
  - Create an account, manage profile details.
  - Authentication via JWT.
- **Discover & Join Volunteer Events**:
  - Browse upcoming volunteer events.
  - Join or create events.
- **Community Help Requests**:
  - Post a request for help or offer assistance to others in the community.
- **Real-time Notifications**:
  - Get notified about event updates or new community help requests.

---

## 📌 Setup Instructions

### Prerequisites:

- Node.js (version 18+ recommended)
- MongoDB (for local development, use a service like MongoDB Atlas for production)
- Vite (for building the frontend)

### 1. Clone the Repository

```bash
git clone https://github.com/TahsinAlahi/hands-on-volunteering-platform.git
cd hands-on-volunteering-platform
```

### 2. Set up the Backend

1. Navigate to the **backend** folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the necessary environment variables:

   ```text
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   CLIENT_URL=your_client_url
   ```

4. Run the server:

   ```bash
   npm run server
   ```

   The backend will be running on `http://localhost:5000`.

### 3. Set up the Frontend

1. Navigate to the **frontend** folder:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the **frontend** directory and add the following:

   ```text
   VITE_API_URL=your_backend_api_url
   ```

4. Run the frontend:

   ```bash
   npm run dev
   ```

   The frontend will be running on `http://localhost:3000`.

## 📌 API Documentation

## **🔑 Authentication API**

### **1️⃣ POST /api/auth/signup**

Register a new user.

#### **Request Body**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### **Response**

```json
{
  "message": "User created successfully"
}
```

#### **Errors**

- `409 Conflict` – User already exists

---

### **2️⃣ POST /api/auth/login**

Log in to an existing user account and receive a JWT token.

#### **Request Body**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### **Response**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "id": "67db3238ab22131fa79cac49",
  "message": "User logged in successfully"
}
```

#### **Authentication**

- JWT token is sent via HTTP-only cookies.
- Token expires in **3 days**.

#### **Errors**

- `401 Unauthorized` – User does not exist
- `401 Unauthorized` – Invalid password

---

### **3️⃣ POST /api/auth/logout**

Log out the current user.

#### **Response**

```json
{
  "message": "User logged out successfully"
}
```

#### **Errors**

- `401 Unauthorized` – User not logged in

---

## **📅 Event Management API**

### **1️⃣ POST /api/events/create**

Create a new event.

#### **Request Body**

```json
{
  "title": "Beach Cleanup Drive",
  "description": "Join us to clean the beach and save marine life.",
  "category": "Environment",
  "date": "2025-04-10",
  "time": "10:00 AM",
  "location": "Miami Beach",
  "createdBy": "65fd24e2ab22131fa79cac49"
}
```

#### **Response**

```json
{
  "_id": "65fd98d9e6a4b2a1c4567a8f",
  "title": "Beach Cleanup Drive",
  "description": "Join us to clean the beach and save marine life.",
  "category": "Environment",
  "date": "2025-04-10T00:00:00.000Z",
  "time": "10:00 AM",
  "location": "Miami Beach",
  "createdBy": "65fd24e2ab22131fa79cac49",
  "attendees": [],
  "createdAt": "2025-03-20T14:22:35.123Z",
  "updatedAt": "2025-03-20T14:22:35.123Z",
  "__v": 0
}
```

#### **Errors**

- `400 Bad Request` – Missing required fields

---

### **2️⃣ GET /api/events/**

Retrieve all events.

#### **Response**

```json
[
  {
    "_id": "65fd98d9e6a4b2a1c4567a8f",
    "title": "Beach Cleanup Drive",
    "description": "Join us to clean the beach and save marine life.",
    "category": "Environment",
    "date": "2025-04-10T00:00:00.000Z",
    "time": "10:00 AM",
    "location": "Miami Beach",
    "createdBy": {
      "_id": "65fd24e2ab22131fa79cac49",
      "name": "Alice Johnson"
    },
    "attendees": []
  }
]
```

---

### **3️⃣ GET /api/events/available**

Retrieve all upcoming events (sorted by date).

#### **Response**

```json
[
  {
    "_id": "65fd98d9e6a4b2a1c4567a8f",
    "title": "Beach Cleanup Drive",
    "description": "Join us to clean the beach and save marine life.",
    "category": "Environment",
    "date": "2025-04-10T00:00:00.000Z",
    "time": "10:00 AM",
    "location": "Miami Beach",
    "createdBy": "65fd24e2ab22131fa79cac49",
    "attendees": []
  }
]
```

---

### **4️⃣ GET /api/events/:id**

Retrieve event details by event ID.

#### **Request Example**

`GET /api/events/65fd98d9e6a4b2a1c4567a8f`

#### **Response**

```json
{
  "_id": "65fd98d9e6a4b2a1c4567a8f",
  "title": "Beach Cleanup Drive",
  "description": "Join us to clean the beach and save marine life.",
  "category": "Environment",
  "date": "2025-04-10T00:00:00.000Z",
  "time": "10:00 AM",
  "location": "Miami Beach",
  "createdBy": "65fd24e2ab22131fa79cac49",
  "attendees": []
}
```

#### **Errors**

- `400 Bad Request` – Invalid event ID
- `404 Not Found` – Event not found

---

### **5️⃣ POST /api/events/join/:id**

Join an event by event ID.

#### **Request Example**

`POST /api/events/join/65fd98d9e6a4b2a1c4567a8f`

#### **Request Body**

```json
{
  "userId": "65fd24e2ab22131fa79cac49"
}
```

#### **Response**

```json
{
  "message": "User joined the event successfully",
  "event": {
    "_id": "65fd98d9e6a4b2a1c4567a8f",
    "title": "Beach Cleanup Drive",
    "description": "Join us to clean the beach and save marine life.",
    "category": "Environment",
    "date": "2025-04-10T00:00:00.000Z",
    "time": "10:00 AM",
    "location": "Miami Beach",
    "createdBy": "65fd24e2ab22131fa79cac49",
    "attendees": ["65fd24e2ab22131fa79cac49"]
  }
}
```

#### **Errors**

- `400 Bad Request` – Invalid event ID
- `400 Bad Request` – Invalid user ID
- `400 Bad Request` – User already joined the event

---

## **🆘 Help Requests API**

### **1️⃣ POST /api/help/create**

Create a new help request.

#### **Request Body**

```json
{
  "title": "Need volunteers for food distribution",
  "description": "We need volunteers to help distribute food in downtown.",
  "urgency": "Urgent",
  "createdBy": "65fd24e2ab22131fa79cac49"
}
```

#### **Response**

```json
{
  "_id": "65fe12a7b8e1c3d9a78d2e4f",
  "title": "Need volunteers for food distribution",
  "description": "We need volunteers to help distribute food in downtown.",
  "urgency": "Urgent",
  "createdBy": "65fd24e2ab22131fa79cac49",
  "responses": [],
  "createdAt": "2025-03-20T18:40:00.456Z",
  "updatedAt": "2025-03-20T18:40:00.456Z",
  "__v": 0
}
```

#### **Errors**

- `400 Bad Request` – Missing required fields

---

### **2️⃣ GET /api/help/**

Retrieve all help requests.

#### **Response**

```json
[
  {
    "_id": "65fe12a7b8e1c3d9a78d2e4f",
    "title": "Need volunteers for food distribution",
    "description": "We need volunteers to help distribute food in downtown.",
    "urgency": "Urgent",
    "createdBy": {
      "_id": "65fd24e2ab22131fa79cac49",
      "name": "Alice Johnson"
    },
    "responses": []
  }
]
```

---

### **3️⃣ GET /api/help/:id**

Retrieve a specific help request by ID.

#### **Request Example**

`GET /api/help/65fe12a7b8e1c3d9a78d2e4f`

#### **Response**

```json
{
  "_id": "65fe12a7b8e1c3d9a78d2e4f",
  "title": "Need volunteers for food distribution",
  "description": "We need volunteers to help distribute food in downtown.",
  "urgency": "Urgent",
  "createdBy": {
    "_id": "65fd24e2ab22131fa79cac49",
    "name": "Alice Johnson"
  },
  "responses": [
    {
      "userId": {
        "_id": "65fd2a83b2a13c78e9c4567a",
        "name": "Bob Williams"
      },
      "message": "I can help!",
      "timestamp": "2025-03-20T19:15:00.123Z"
    }
  ]
}
```

#### **Errors**

- `400 Bad Request` – Invalid help request ID
- `404 Not Found` – Help request not found

---

### **4️⃣ POST /api/help/response/:id**

Add a response to a help request.

#### **Request Example**

`POST /api/help/response/65fe12a7b8e1c3d9a78d2e4f`

#### **Request Body**

```json
{
  "userId": "65fd2a83b2a13c78e9c4567a",
  "message": "I can help!"
}
```

#### **Response**

```json
{
  "_id": "65fe12a7b8e1c3d9a78d2e4f",
  "title": "Need volunteers for food distribution",
  "description": "We need volunteers to help distribute food in downtown.",
  "urgency": "Urgent",
  "createdBy": "65fd24e2ab22131fa79cac49",
  "responses": [
    {
      "userId": "65fd2a83b2a13c78e9c4567a",
      "message": "I can help!",
      "timestamp": "2025-03-20T19:15:00.123Z"
    }
  ]
}
```

#### **Errors**

- `400 Bad Request` – Missing required fields
- `400 Bad Request` – Invalid help request ID
- `400 Bad Request` – Invalid user ID
- `404 Not Found` – Help request not found

---

## 📌 Running the Project

### Local Development

To run the project locally:

1. Follow the setup instructions above for both the backend and frontend.
2. Make sure the backend is running on `http://localhost:5000` and the frontend on `http://localhost:3000`.
3. You can now interact with the app by navigating to `http://localhost:3000` in your browser.

### Production Deployment

1. For the backend, deploy using services like Heroku, Vercel, or DigitalOcean.
2. For the frontend, deploy using Vercel or Netlify.

---

### Author

- **Tahsin Alahi Prodhan** - [GitHub](https://github.com/TahsinAlahi)
