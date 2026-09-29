
# 🏥 Medi-Care

### Modern Full-Stack Healthcare Management Platform

Medi-Care is a modern healthcare platform that connects patients with verified doctors and provides a complete digital experience for doctor discovery, appointment booking, secure payments, and healthcare management.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C7B7?style=for-the-badge)](https://medi-care-kappa-ten.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication-111827?style=for-the-badge)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

---

## 🌐 Live Demo

🚀 **[Visit Medi-Care](https://medi-care-kappa-ten.vercel.app/)**

Explore the deployed application:

**https://medi-care-kappa-ten.vercel.app/**

---

## 📸 Project Preview

### 🏠 Patient-Facing Website

![Medi-Care Homepage](./screenshots/homepage.png)

### 📊 Admin Dashboard & Analytics

![Medi-Care Admin Dashboard](./screenshots/admin-dashboard.png)

---

# 📖 About the Project

**Medi-Care** is a full-stack healthcare management platform designed to connect patients with verified healthcare professionals through a modern, secure, and user-friendly digital experience.

The platform provides dedicated workflows for:

- 👤 Patients
- 🧑‍⚕️ Doctors
- 🛡️ Administrators

Patients can discover verified doctors, search and filter healthcare professionals, view doctor profiles, book appointments, make secure payments, and manage their appointments.

Doctors can manage their professional information, availability, and healthcare-related workflows.

Administrators have access to a dedicated dashboard for managing users, doctors, appointments, payments, verification, and platform analytics.

---

# ✨ Key Features

## 👤 Patient Features

- 🔐 Email & password authentication
- 🔵 Google OAuth authentication
- 👤 Patient profile management
- 🔎 Search doctors
- 🩺 Filter doctors by specialization
- 📊 Filter doctors by experience
- 💰 Filter doctors by consultation fee
- ✅ Browse verified doctors
- 📄 Paginated doctor listings
- 🧑‍⚕️ View detailed doctor profiles
- 📅 Book appointments
- 🔄 Reschedule appointments
- ❌ Cancel appointments
- 📋 View appointment history
- 💳 Secure Stripe payments
- 💰 View payment records
- 🔔 User-friendly notifications
- 📱 Responsive interface

---

## 🧑‍⚕️ Doctor Features

- 🔐 Secure authentication
- 👤 Doctor profile management
- 🏥 Hospital information
- 🩺 Medical specialization
- 🎓 Qualifications
- 💼 Professional experience
- 💵 Consultation fee
- 📅 Available days
- ⏰ Available appointment slots
- 🖼️ Doctor profile image
- ⏳ Doctor verification workflow
- 📊 Doctor dashboard
- 🔒 Role-based access control

---

## 🛡️ Admin Features

- 📊 Admin dashboard
- 👥 Manage users
- 🧑‍⚕️ Manage doctors
- ✅ Verify doctors
- ❌ Reject doctor verification
- 🔄 Manage verification status
- 📅 Manage appointments
- 💳 Payment management
- 📈 Platform analytics
- 👤 Monitor registered patients
- 🧑‍⚕️ Monitor registered doctors
- 📋 Monitor appointment records
- ⭐ Monitor doctor ratings
- 📊 Doctor performance analytics
- 🚫 Block or suspend users
- 🔐 Role-based admin authorization

---

# 🔎 Doctor Discovery

Medi-Care provides a dedicated doctor directory where patients can easily find healthcare professionals.

### Search & Filtering

Patients can search and filter doctors using:

- Doctor name
- Specialization
- Experience
- Consultation fee
- Verification status

### Doctor Listing Flow

```text
Search / Filter
      ↓
Verified Doctors
      ↓
Doctor Cards
      ↓
Doctor Profile
      ↓
Book Appointment
````

### Pagination

Doctor listings support pagination to provide a clean browsing experience and efficiently handle larger datasets.

---

# 📅 Appointment Management

Patients can manage their appointments directly from their dashboard.

### Appointment Workflow

```text
Find Doctor
     ↓
View Doctor Profile
     ↓
Select Date
     ↓
Select Available Slot
     ↓
Book Appointment
     ↓
Complete Payment
     ↓
Appointment Confirmation
     ↓
Manage Appointment
     ↓
Reschedule / Cancel
```

### Appointment Statuses

The platform supports:

* Pending
* Confirmed
* Rescheduled
* Completed
* Cancelled

---

# 💳 Secure Payment System

Medi-Care integrates **Stripe Checkout** for secure appointment payments.

### Payment Workflow

```text
Book Appointment
       ↓
Create Stripe Checkout Session
       ↓
Stripe Payment
       ↓
Payment Confirmation
       ↓
Payment Record
       ↓
Update Appointment Payment Status
```

Payment information is connected with appointment records so users and administrators can track payment activity.

---

# 🛡️ Doctor Verification

Doctor profiles go through an administrative verification workflow before becoming publicly available.

### Verification Workflow

```text
Doctor Registration
        ↓
Pending Verification
        ↓
Admin Review
      ↙   ↘
   Verify  Reject
      ↓
Verified Doctor
      ↓
Public Doctor Listing
```

Only doctors with the appropriate verification status are displayed in the public doctor directory.

---

# 📊 Admin Analytics

The admin dashboard provides important platform-level statistics and doctor performance insights.

### Dashboard Metrics

| Metric                | Description                           |
| --------------------- | ------------------------------------- |
| 👤 Total Patients     | Number of registered patient accounts |
| 🧑‍⚕️ Total Doctors   | Number of doctor profiles             |
| 📅 Total Appointments | Number of appointment records         |
| ⭐ Average Rating      | Average doctor rating                 |

### Doctor Performance

Administrators can view doctor performance through a visual rating chart.

This provides an overview of doctor ratings and platform activity.

---

# 🔐 Authentication & Authorization

Medi-Care uses **BetterAuth** for authentication, session management, and role-based authorization.

### Authentication Methods

* Email & Password
* Google OAuth
* Secure sessions
* Protected routes
* Role-based access control
* Protected backend APIs

### User Roles

| Role      | Main Access                                        |
| --------- | -------------------------------------------------- |
| `patient` | Doctors, appointments, payments, patient dashboard |
| `doctor`  | Doctor profile and doctor dashboard                |
| `admin`   | Users, doctors, appointments, payments, analytics  |

The application separates permissions according to user roles to protect sensitive functionality.

---

# 🏗️ System Architecture

Medi-Care follows a separated frontend and backend architecture.

```text
                         ┌──────────────────┐
                         │      Users       │
                         │ Patient / Doctor │
                         │      / Admin     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     Next.js      │
                         │    Frontend      │
                         └────────┬─────────┘
                                  │
                              REST API
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Express.js    │
                         │     Backend      │
                         └───────┬───┬──────┘
                                 │   │
                    ┌────────────┘   └─────────────┐
                    ▼                              ▼
             ┌──────────────┐              ┌──────────────┐
             │   MongoDB    │              │    Stripe    │
             │   Database   │              │   Payments   │
             └──────────────┘              └──────────────┘
```

---

# 🧩 Application Modules

```text
Medi-Care
│
├── Authentication
│   ├── Email & Password
│   ├── Google OAuth
│   ├── Sessions
│   └── Role-Based Access
│
├── Doctor Management
│   ├── Doctor Listing
│   ├── Search
│   ├── Filtering
│   ├── Pagination
│   ├── Doctor Details
│   └── Verification
│
├── Appointment Management
│   ├── Booking
│   ├── Rescheduling
│   ├── Cancellation
│   └── Status Management
│
├── Payment Management
│   ├── Stripe Checkout
│   ├── Payment Records
│   └── Payment Status
│
├── Patient Dashboard
│   ├── Profile
│   ├── Appointments
│   └── Payments
│
├── Doctor Dashboard
│   └── Doctor Management
│
└── Admin Dashboard
    ├── User Management
    ├── Doctor Management
    ├── Appointment Management
    ├── Payment Management
    └── Analytics
```

---

# 🛠️ Tech Stack

## Frontend

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **Next.js**         | React framework and application routing |
| **React.js**        | User interface                          |
| **JavaScript**      | Application development                 |
| **Tailwind CSS**    | Styling and responsive design           |
| **HeroUI**          | UI components                           |
| **Recharts**        | Analytics and data visualization        |
| **React Hook Form** | Form handling                           |
| **React Toastify**  | Notifications                           |

## Backend

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| **Node.js**    | Backend runtime                |
| **Express.js** | REST API                       |
| **MongoDB**    | Database                       |
| **BetterAuth** | Authentication & authorization |
| **Stripe**     | Payment processing             |

## Tools & Deployment

* Git
* GitHub
* VS Code
* Postman
* Vercel
* MongoDB

---

# 🎨 UI & UX

Medi-Care follows a modern healthcare-focused visual design.

### Design Highlights

* 🌙 Modern dark interface
* 💠 Cyan and teal accent colors
* 📱 Responsive layouts
* 🧩 Reusable components
* 🎯 Clear navigation
* 📊 Professional dashboard design
* 🪄 Smooth interactions
* 🖥️ Desktop and mobile support
* 🔐 Clear authentication states
* 🧑‍⚕️ Healthcare-focused visual language

---

# 🔌 REST API

The Next.js frontend communicates with the Express.js backend through REST APIs.

### Main API Areas

```text
/api/doctors
/api/appointments
/api/payment
/api/admin/users
/api/admin/doctors
```

The separated API architecture keeps frontend presentation and backend business logic independent and easier to maintain.

---

# 🔒 Security

Security is an important part of the Medi-Care architecture.

The application includes:

* 🔐 Authentication
* 🛡️ Role-based authorization
* 🔒 Protected dashboard routes
* 🔒 Protected backend APIs
* ✅ Doctor verification
* 🚫 Admin-only management functionality
* 🔑 Environment-based secret configuration
* 💳 Secure Stripe payment processing

> **Important:** Never commit `.env` files, database passwords, API keys, OAuth secrets, Stripe secret keys, or other sensitive credentials to GitHub.

---

# ⚙️ Environment Variables

## Frontend

Create a `.env.local` file:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_uri
DB_NAME=mediCareDB

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Backend

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_uri
CLIENT_URI=http://localhost:3000
```

For production deployment, replace localhost URLs with the appropriate deployed frontend and backend URLs.

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd medi-care
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create the required environment files:

```text
Frontend → .env.local
Backend  → .env
```

Add your MongoDB, BetterAuth, Google OAuth, Stripe, and other required credentials.

## 4. Start the Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## 5. Start the Backend

Navigate to the backend project and run:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 📁 Recommended Repository Structure

```text
Medi-Care/
│
├── README.md
├── screenshots/
│   ├── homepage.png
│   └── admin-dashboard.png
│
├── app/
├── components/
├── lib/
├── public/
│
├── package.json
└── ...
```

---

# 📈 Future Improvements

Potential improvements for future versions include:

* 💬 Doctor-patient messaging
* 🔔 Real-time appointment notifications
* 📧 Email appointment reminders
* 📱 Progressive Web App support
* 🧾 Downloadable payment invoices
* 🗓️ Advanced calendar integration
* ⭐ Patient review management
* 📊 Advanced admin reports
* 🌐 Multi-language support
* 🔔 Push notifications

---

# 🎯 Project Goals

Medi-Care was developed to demonstrate practical full-stack development skills including:

* Modern Next.js development
* React development
* REST API integration
* Authentication and authorization
* Role-based application architecture
* MongoDB database management
* Stripe payment integration
* Dashboard development
* Data visualization
* Responsive UI design
* Production deployment

---

# 🌐 Live Website

🚀 **https://medi-care-kappa-ten.vercel.app/**

---

# 👨‍💻 Developer

## Abdus Sami Rahat

**Frontend / Full-Stack Web Developer**

* 🐙 **GitHub:** [@asrahat](https://github.com/asrahat)
* 💼 **LinkedIn:** [Abdus Sami Rahat](https://www.linkedin.com/in/abdus-sami-rahat/)
* 🌐 **Portfolio:** [myself-theta-five.vercel.app](https://myself-theta-five.vercel.app/)

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐.

---

### Built with ❤️ by Abdus Sami Rahat



