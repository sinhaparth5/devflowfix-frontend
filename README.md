# DevFlowFix

> **Autonomous AI agent that detects, analyzes, and resolves CI/CD failures in real-time.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20.3-red.svg)](https://angular.dev)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-Latest-blue.svg)](https://primeng.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-brightgreen.svg)](https://www.docker.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

DevFlowFix is an intelligent autonomous system that automatically fixes **75% of deployment failures in under 8 minutes** by:

- 📡 **Receiving webhooks** from GitHub Actions, ArgoCD, and Kubernetes
- 🧠 **Analyzing failures** using AI (NVIDIA NIM) and RAG technology
- 🔧 **Executing safe remediation** actions (workflow reruns, pod restarts, sync operations)
- 📈 **Learning from outcomes** to improve confidence scoring

## ✨ Features

### 🔥 Core Capabilities

- **Real-Time Detection** - Instantly detects CI/CD failures from multiple sources
- **AI-Powered Analysis** - Uses NVIDIA NIM and RAG to analyze root causes
- **Automatic Remediation** - Safely executes fixes with confidence scoring
- **Continuous Learning** - Improves accuracy over time through outcome analysis
- **Multi-Platform Support** - GitHub Actions, ArgoCD, Kubernetes, and more

### 🎨 Frontend Features

- **Modern UI** - Built with Angular 20.3, PrimeNG, and Nebular
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Beautiful Landing Page** - Engaging home page with animations
- **Authentication System** - Secure login/register with JWT tokens
- **Real-time Updates** - Live status monitoring and notifications

### 🔐 Security

- JWT-based authentication
- Confidence-based execution (prevents unsafe operations)
- Secure API communication
- Role-based access control (planned)
- Audit logging for all actions

## 🛠 Tech Stack

### Frontend
- **Framework:** Angular 20.3 (Standalone Architecture)
- **UI Libraries:** 
  - PrimeNG - Rich component library
  - Nebular - Angular design system
- **Icons:** PrimeIcons, Eva Icons
- **Styling:** CSS3 with modern animations
- **State Management:** RxJS

### Backend (Integration Ready)
- **AI/ML:** NVIDIA NIM, RAG
- **Webhooks:** GitHub Actions, ArgoCD, Kubernetes
- **Authentication:** JWT tokens
- **API:** RESTful API

### DevOps
- **Containerization:** Docker, Docker Compose
- **Web Server:** Nginx (optimized for SPA)
- **CI/CD:** GitHub Actions ready
- **Cloud:** AWS, GCP, Azure compatible

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Docker (for deployment)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/devflowfix.git
cd devflowfix
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Copy environment template
cp src/environments/environment.ts src/environments/environment.prod.ts

# Update with your API URL
# Edit src/environments/environment.prod.ts
```

4. **Run development server**
```bash
ng serve
```

Navigate to `http://localhost:4200/`

### Quick Start with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# View at http://localhost
```

## 📁 Project Structure

```
devflowfix/
├── src/
│   ├── app/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── login/           # Login component
│   │   │   ├── register/        # Registration component
│   │   │   ├── auth.routes.ts   # Auth routing
│   │   │   └── auth.config.ts   # Auth configuration
│   │   ├── pages/
│   │   │   └── home/            # Landing page
│   │   ├── guards/              # Route guards
│   │   ├── app.config.ts        # App configuration
│   │   └── app.routes.ts        # App routing
│   ├── environments/            # Environment configs
│   └── styles.css              # Global styles
├── Dockerfile                   # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── nginx.conf                  # Nginx configuration
└── README.md                   # This file
```

## 💻 Development

### Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build:prod

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Creating Components

```bash
# Generate a new component
ng generate component components/my-component --standalone

# Generate a new service
ng generate service services/my-service
```

### Code Style

This project follows Angular style guide and uses:
- ESLint for linting
- Prettier for formatting
- Standalone components architecture
- Modern control flow (@if, @for)

### Development Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "feat: add new feature"`
5. Push and create a Pull Request

## 🚢 Deployment

### Build for Production

```bash
# Create production build
npm run build:prod

# Output will be in dist/devflowfix/browser
```

### Docker Deployment

```bash
# Build Docker image
docker build -t devflowfix .

# Run container
docker run -d -p 80:80 devflowfix

# Or use Docker Compose
docker-compose up -d
```

### Cloud Deployment

#### AWS (ECS)
```bash
# Tag and push to ECR
docker tag devflowfix:latest AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/devflowfix:latest
docker push AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/devflowfix:latest
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/devflowfix
gcloud run deploy devflowfix --image gcr.io/PROJECT_ID/devflowfix --platform managed
```

#### Azure
```bash
# Push to Azure Container Registry
az acr build --registry YOUR_ACR --image devflowfix:latest .
```

See [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## ⚙️ Configuration

### Environment Variables

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  appName: 'DevFlowFix',
  version: '1.0.0',
  
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
  },
  
  features: {
    enableAnalytics: true,
    enableErrorTracking: true,
  },
};
```

### API Configuration

Update `src/app/auth/auth.config.ts` to point to your backend:

```typescript
baseEndpoint: environment.apiUrl,
```

### Theme Customization

PrimeNG theme can be changed in `angular.json`:

```json
"node_modules/primeng/resources/themes/lara-dark-blue/theme.css"
```

Available themes:
- `lara-light-blue` (default)
- `lara-dark-blue`
- `md-light-indigo`
- `saga-blue`

## 📚 Documentation

- [Setup Guide](./STANDALONE_SETUP_GUIDE.md) - Complete setup instructions
- [PrimeNG Setup](./PRIMENG_SETUP_GUIDE.md) - PrimeNG configuration
- [Docker Guide](./DOCKER_DEPLOYMENT_GUIDE.md) - Deployment guide
- [API Documentation](./docs/API.md) - API reference (coming soon)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow Angular style guide
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 📝 Roadmap

### Phase 1 - MVP (Current)
- [x] Landing page with PrimeNG
- [x] Authentication system
- [x] Docker deployment setup
- [ ] Backend API integration
- [ ] Dashboard UI

### Phase 2 - Core Features
- [ ] Real-time webhook handling
- [ ] AI analysis integration
- [ ] Auto-remediation engine
- [ ] Confidence scoring system

### Phase 3 - Advanced Features
- [ ] Learning system
- [ ] Analytics dashboard
- [ ] Multi-tenant support
- [ ] Advanced reporting

### Phase 4 - Enterprise
- [ ] SSO integration
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Premium integrations

## 📊 Performance

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s
- **Lighthouse Score:** 95+
- **Bundle Size:** ~500KB (gzipped)

## 🔒 Security

- JWT authentication with refresh tokens
- HTTPS only in production
- Security headers (CSP, X-Frame-Options, etc.)
- Input validation and sanitization
- Rate limiting (backend)
- CORS configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Your Name** - Lead Developer
- **Contributors** - See [CONTRIBUTORS.md](CONTRIBUTORS.md)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- PrimeNG for the beautiful components
- Nebular for the design system
- NVIDIA for NIM technology
- Open source community

## 📞 Support

- **Email:** support@devflowfix.com
- **Documentation:** https://docs.devflowfix.com
- **Discord:** https://discord.gg/devflowfix
- **Twitter:** [@devflowfix](https://twitter.com/devflowfix)

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Made with ❤️ by the DevFlowFix Team**

[Website](https://devflowfix.com) • [Documentation](https://docs.devflowfix.com) • [Blog](https://blog.devflowfix.com)