# Password Breach Checker

## Overview

A secure web application that allows users to check if their passwords have been compromised in data breaches. The application uses the HaveIBeenPwned API with k-anonymity model to ensure privacy - only the first 5 characters of a password's SHA-1 hash are sent to the API, never the actual password. Features include single password checking, batch password validation (up to 10 passwords), and comprehensive security information to educate users about the checking process.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for development tooling
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system supporting light/dark themes
- **State Management**: TanStack Query for server state and local React state for UI interactions
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with rate limiting and request validation
- **Security**: Rate limiting (100 requests/15min for single checks, 20 requests/15min for batch)
- **Validation**: Zod schemas for request validation and type safety

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema**: User management table with UUID primary keys
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: In-memory storage fallback for development environments

### Authentication and Authorization
- **Session Management**: Server-side sessions stored in PostgreSQL
- **User Schema**: Username/password authentication with bcrypt hashing
- **Security**: No password storage in logs or client-side, secure session cookies

### Password Security Implementation
- **K-Anonymity Model**: Only first 5 characters of SHA-1 hash sent to API
- **Client-Side Hashing**: SHA-1 computation performed locally
- **No Storage Policy**: Passwords never logged, stored, or cached
- **Privacy Protection**: Local processing ensures password privacy

## External Dependencies

### Third-Party APIs
- **HaveIBeenPwned API**: Primary data source for breach detection using k-anonymity model
- **Rate Limiting**: Built-in respect for API limits with client-side rate limiting

### Database Services
- **PostgreSQL**: Primary database for user data and sessions
- **Neon Database**: Cloud PostgreSQL provider integration configured

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Google Fonts**: Inter font family for typography consistency
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool and development server with hot reloading
- **Replit Integration**: Development environment compatibility with runtime error handling
- **TypeScript**: Type safety across full-stack application