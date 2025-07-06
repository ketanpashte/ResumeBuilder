# Resume Builder Frontend

React.js frontend application for the Resume Builder platform.

## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Multi-step Form**: Intuitive resume building process
- **Real-time Validation**: Form validation with error handling
- **Dashboard**: Manage multiple resumes
- **PDF Download**: Export resumes as professional PDFs
- **Authentication**: Secure login and registration
- **Search & Filter**: Find resumes quickly
- **Mobile Responsive**: Works on all devices

## 🛠️ Tech Stack

- **React 18**
- **Vite** (Build tool)
- **React Router** (Navigation)
- **React Hook Form** (Form management)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP client)
- **React Hot Toast** (Notifications)
- **Lucide React** (Icons)

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── resume/         # Resume form components
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/            # React context
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ResumeBuilderPage.jsx
│   └── ResumeEditPage.jsx
├── services/           # API services
│   ├── api.js
│   ├── authService.js
│   └── resumeService.js
├── utils/              # Utility functions
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Styling

The project uses Tailwind CSS with custom components defined in `src/index.css`. Key design elements:

- **Primary Color**: Blue (#3b82f6)
- **Secondary Color**: Gray (#64748b)
- **Font**: Inter
- **Components**: Custom button, input, and card styles

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

Run tests with:
```bash
npm run test
```

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```bash
# Build image
docker build -t resume-builder-frontend .

# Run container
docker run -p 3000:3000 resume-builder-frontend
```

## 🔒 Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token included in API requests
4. Protected routes check authentication
5. Auto-logout on token expiration

## 📋 Form Validation

The application includes comprehensive form validation:
- Required field validation
- Email format validation
- Password strength requirements
- Date range validation
- URL format validation

## 🎯 Key Features

### Resume Builder
- **Step-by-step process**: 5 sections (Personal, Education, Experience, Skills, Projects)
- **Dynamic forms**: Add/remove multiple entries
- **Auto-save**: Form data preserved during navigation
- **Validation**: Real-time error checking

### Dashboard
- **Resume management**: View, edit, delete resumes
- **Search functionality**: Find resumes by title or name
- **Quick actions**: Download PDF, edit, delete
- **Statistics**: Resume count and user info

### PDF Generation
- **Professional templates**: Clean, ATS-friendly layouts
- **Instant download**: Generate and download PDFs
- **Proper formatting**: Optimized for printing and viewing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
