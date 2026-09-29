````md
# 🏥 Medi-Care

> A modern full-stack healthcare platform for discovering doctors, booking appointments, managing payments, and administering healthcare services.

**Next.js** • **React** • **Express.js** • **MongoDB** • **BetterAuth** • **Stripe**

---

## 🌐 Live Demo

🚀 **[Visit Medi-Care Live](https://medi-care-kappa-ten.vercel.app/)**

---

## 📸 Project Preview

### 🏠 Patient-Facing Website

![Medi-Care Homepage](./screenshots/homepage.png)

### 📊 Admin Dashboard & Analytics

![Medi-Care Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 📖 About the Project

**Medi-Care** is a full-stack healthcare management platform designed to connect patients with verified healthcare professionals through a modern, secure, and user-friendly digital experience.

The platform provides dedicated workflows for:

- 👤 Patients
- 🩺 Doctors
- 🛡️ Administrators

Patients can discover verified doctors, search and filter healthcare professionals, view doctor profiles, book appointments, make secure payments, and manage their appointments.

Doctors can manage their professional information and appointment-related workflows.

Administrators have access to a dedicated dashboard where they can manage users, verify doctors, manage appointments and payments, and monitor platform analytics.

---

# ✨ Features

## 👤 Patient Features

- 🔐 Email and password authentication
- 🔵 Google authentication
- 👤 Patient profile management
- 🔎 Search doctors
- 🩺 Filter doctors by specialization
- 📊 Filter doctors by experience
- 💰 Filter doctors by consultation fee
- ✅ Browse verified doctors
- 📄 Paginated doctor listing
- 👨‍⚕️ View detailed doctor profiles
- 📅 Book appointments
- 🔄 Reschedule appointments
- ❌ Cancel appointments
- 📋 View appointment history
- 💳 Secure Stripe payment
- 💰 View payment records
- 🔔 User-friendly notifications
- 📱 Responsive interface

---

## 🩺 Doctor Features

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
- 🩺 Manage doctors
- ✅ Verify doctors
- ❌ Reject doctor verification
- 🔄 Manage doctor verification status
- 📅 Manage appointments
- 💳 Payment management
- 📈 Platform analytics
- 👤 Monitor registered patients
- 🩺 Monitor registered doctors
- 📅 Monitor appointments
- ⭐ Monitor doctor ratings
- 📊 Doctor performance analytics
- 🚫 Block or suspend users
- 🔐 Role-based admin authorization

---

# 📊 Analytics Dashboard

The admin dashboard provides an overview of the platform's important statistics.

### Dashboard Metrics

- 👤 Total Patients
- 🩺 Total Doctors
- 📅 Total Appointments
- ⭐ Average Doctor Rating

### Doctor Performance

Administrators can view doctor performance through a visual rating chart.

This provides an overview of doctor ratings and helps administrators monitor performance across the platform.

---

# 🔐 Authentication & Authorization

Medi-Care uses **BetterAuth** for authentication, sessions, and role-based authorization.

### Authentication Methods

- Email & Password
- Google OAuth
- Secure sessions
- Role-based access control
- Protected dashboard routes
- Protected backend APIs

### User Roles

| Role | Access |
|------|--------|
| `patient` | Doctors, appointments, payments, patient dashboard |
| `doctor` | Doctor profile and doctor dashboard |
| `admin` | Users, doctors, appointments, payments, analytics |

---

# 👨‍⚕️ Doctor Discovery

The doctor directory allows patients to quickly find healthcare professionals.

Users can:

- Search doctors
- Filter by specialization
- Filter by experience
- Filter by consultation fee
- View verified doctors
- Navigate through multiple pages
- Open detailed doctor profiles

### 🔎 Search & Filtering

The doctor listing supports multiple filters:

```text
Search
   │
   ├── Doctor Name
   │
   ├── Specialization
   │
   ├── Experience
   │
   └── Consultation Fee
````

### 📄 Pagination

Doctor listings support pagination so the application can efficiently handle larger numbers of doctors.

---

# 📅 Appointment Management

Patients can manage their healthcare appointments directly from their dashboard.

### Appointment Workflow

```text
Find Doctor
     ↓
View Doctor Profile
     ↓
Select Date & Available Slot
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

The system supports appointment states such as:

* Pending
* Confirmed
* Rescheduled
* Completed
* Cancelled

---

# 💳 Payment System

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

The application keeps payment information connected with appointment records for easier management.

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
     ↙       ↘
 Verify     Reject
    ↓
Verified Doctor
    ↓
Public Doctor Listing
```

Only doctors with the appropriate verified status are displayed in the public doctor directory.

---

# 🏗️ System Architecture

Medi-Care uses a separated frontend and backend architecture.

```text
                    ┌──────────────────────┐
                    │        Users         │
                    │ Patient / Doctor /   │
                    │        Admin         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Next.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                           REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Express.js      │
                    │       Backend        │
                    └───────┬──────┬───────┘
                            │      │
                ┌───────────┘      └────────────┐
                ▼                               ▼
       ┌─────────────────┐             ┌─────────────────┐
       │     MongoDB     │             │     Stripe      │
       │     Database    │             │    Payments     │
       └─────────────────┘             └─────────────────┘
```

---

# 🧑‍💻 Tech Stack

## Frontend

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **Next.js**         | React framework and application routing |
| **React.js**        | User interface                          |
| **JavaScript**      | Application logic                       |
| **Tailwind CSS**    | Styling and responsive design           |
| **HeroUI**          | UI components                           |
| **Recharts**        | Analytics and data visualization        |
| **React Hook Form** | Form management                         |
| **React Toastify**  | Notifications                           |

## Backend

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| **Node.js**    | Backend runtime                  |
| **Express.js** | REST API                         |
| **MongoDB**    | Database                         |
| **BetterAuth** | Authentication and authorization |
| **Stripe**     | Payment processing               |

## Tools & Deployment

* Git
* GitHub
* VS Code
* Postman
* Vercel
* MongoDB

---

# 📁 Project Modules

```text
Medi-Care
│
├── Authentication
│   ├── Email & Password
│   ├── Google OAuth
│   ├── Sessions
│   └── Role-Based Access
│
├── Doctors
│   ├── Doctor Listing
│   ├── Search
│   ├── Filters
│   ├── Pagination
│   ├── Doctor Details
│   └── Verification
│
├── Appointments
│   ├── Booking
│   ├── Rescheduling
│   ├── Cancellation
│   └── Status Management
│
├── Payments
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
    ├── Users
    ├── Doctors
    ├── Appointments
    ├── Payments
    └── Analytics
```

---

# 🎨 UI & UX

The application follows a modern healthcare-focused visual design.

### Design Highlights

* 🌙 Modern dark interface
* 💠 Cyan and teal accent colors
* 📱 Responsive layouts
* 🧩 Reusable components
* 🎯 Clear navigation
* 📊 Data-focused dashboards
* 🪄 Smooth interactions
* 🖥️ Desktop and mobile support
* 👨‍⚕️ Professional healthcare presentation
* 🔐 Clear authentication states

---

# 🔌 REST API Integration

The frontend communicates with the Express.js backend through REST APIs.

### Main API Areas

```text
/api/doctors
/api/appointments
/api/payment
/api/admin/users
/api/admin/doctors
```

The separated architecture keeps frontend presentation and backend business logic independent, making the application easier to maintain and extend.

---

# 🔒 Security

Medi-Care includes several security-focused practices:

* Protected authentication routes
* Role-based authorization
* Protected dashboard access
* Backend API validation
* Secure authentication sessions
* Doctor verification before public listing
* Protected admin functionality
* Environment variables for sensitive credentials
* Stripe payment processing

> ⚠️ Never commit `.env`, API keys, database passwords, OAuth secrets, or Stripe secret keys to GitHub.

---

# ⚙️ Environment Variables

## Frontend

Create a `.env.local` file:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_uri
DB_NAME=mediCareDB

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key

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

For production, replace the localhost URLs with your deployed frontend and backend URLs.

---

# 🛠️ Installation

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

Create the required `.env.local` and `.env` files and add your credentials.

## 4. Start the Frontend

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:3000
```

## 5. Start the Backend

Navigate to the backend project and run:

```bash
npm run dev
```

The backend will normally run at:

```text
http://localhost:5000
```

---

# 📈 Future Improvements

Potential future improvements include:

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

Medi-Care was built to demonstrate practical full-stack development skills including:

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

# 👨‍💻 Developer

## Abdus Sami Rahat

**Frontend / Full-Stack Web Developer**

* 🐙 GitHub: [@asrahat](https://github.com/asrahat)
* 💼 LinkedIn: [Abdus Sami Rahat](https://www.linkedin.com/in/abdus-sami-rahat/)
* 🌐 Portfolio: [myself-theta-five.vercel.app](https://myself-theta-five.vercel.app/)

---

# 🌐 Live Website

🚀 **https://medi-care-kappa-ten.vercel.app/**

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ by Abdus Sami Rahat**

````
