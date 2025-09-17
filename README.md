# Password Breach Checker

A secure web application that allows users to check if their passwords have been compromised in known data breaches. Built with privacy and security as top priorities.

## 🔒 Security Features

- **Privacy First**: Uses the k-anonymity model - only the first 5 characters of your password's SHA-1 hash are sent to the API
- **No Password Storage**: Your passwords are never logged, stored, or cached anywhere
- **Client-Side Processing**: Password hashing happens locally in your browser
- **Rate Limited**: Prevents abuse with intelligent rate limiting

## ✨ Features

- **Single Password Check**: Instantly verify if a password has been breached
- **Batch Processing**: Check up to 10 passwords simultaneously
- **Detailed Results**: Shows breach count and provides security recommendations
- **Educational Content**: Learn about password security and the checking process
- **Modern Interface**: Clean, responsive design with dark/light theme support

## 🛡️ How It Works

This application uses the [HaveIBeenPwned API](https://haveibeenpwned.com/API/v3) with the k-anonymity model to protect your privacy:

1. Your password is hashed using SHA-1 locally
2. Only the first 5 characters of the hash are sent to the API
3. The API returns all hash suffixes matching that prefix
4. Your browser checks if your full hash matches any returned results
5. **Your actual password never leaves your device**

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HerCommitership/password-breach-checker.git
cd password-breach-checker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file with:
SESSION_SECRET=your-session-secret-here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5000`

## 🏗️ Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **TypeScript**
- **Rate limiting** for security
- **RESTful API** design

### Security
- **bcrypt** for password hashing
- **Express Rate Limit** for API protection
- **Helmet** for security headers
- **k-anonymity model** implementation

## 📱 Usage

### Single Password Check
1. Enter your password in the input field
2. Click "Check Password"
3. View the results and security recommendations

### Batch Password Check
1. Navigate to the "Batch Check" tab
2. Enter up to 10 passwords (one per line)
3. Click "Check All Passwords"
4. Review the comprehensive results

## 🔧 API Endpoints

- `POST /api/check-password` - Check a single password
- `POST /api/check-passwords` - Check multiple passwords (batch)

## 🛡️ Security Considerations

- **No Logging**: Passwords are never written to logs or console
- **Memory Safety**: Password data is not cached in memory
- **Transport Security**: All communications use HTTPS in production
- **Rate Limiting**: 100 requests per 15 minutes for single checks, 20 for batch
- **Input Validation**: All inputs are validated and sanitized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and security awareness purposes. While it uses industry-standard privacy protection methods, always follow best practices for password security:

- Use unique, strong passwords for each account
- Enable two-factor authentication where available
- Consider using a password manager
- Regularly update passwords for important accounts

## 🙏 Acknowledgments

- [HaveIBeenPwned](https://haveibeenpwned.com/) for providing the breach data API
- [Troy Hunt](https://www.troyhunt.com/) for creating and maintaining the HaveIBeenPwned service
- The open-source community for the excellent tools and libraries used in this project

---

**⚡ Live Demo**: [Try it on Replit](https://replit.com/@HerCommitership/password-breach-checker)

**🔗 Report Issues**: [GitHub Issues](https://github.com/HerCommitership/password-breach-checker/issues)