# 💰 Personal Finance AI

A beautiful personal finance tracker built with **React + Vite**, featuring **Gemini AI integration** for intelligent financial insights. Track your income (salary, freelance, investments) and expenses (rent, food, car, etc.) with an intuitive dashboard and get AI-powered advice!

![Demo](https://img.shields.io/badge/React-18-blue)
![Demo](https://img.shields.io/badge/Gemini-AI-purple)
![Demo](https://img.shields.io/badge/Vite-Build-green)

---

## ✨ Features

- 📊 **Dashboard** — Visual overview with income, expenses, balance, and pie chart breakdown
- 💵 **Transaction Management** — Add/delete income and expense transactions with categories
- 🤖 **Gemini AI Advisor** — Ask AI questions about your finances and get personalized advice
- 💾 **Local Storage** — All data saved locally in your browser
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🎨 **Modern UI** — Beautiful gradient design with smooth animations

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/personal-finance-ai.git
cd personal-finance-ai
npm install
```

### 2. Add Gemini API Key

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key:
# VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Get your free API key:** [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploy to Vercel (Free)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/personal-finance-ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New Project"**
3. Select your `personal-finance-ai` repository
4. Vercel will auto-detect Vite settings
5. Click **"Environment Variables"** and add:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** `your_actual_api_key_here`
6. Click **"Deploy"**
7. Your site will be live in seconds! 🎉

---

## 📁 Project Structure

```
personal-finance-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Stats cards + pie chart
│   │   ├── TransactionForm.jsx # Add income/expense form
│   │   ├── TransactionList.jsx # List of all transactions
│   │   └── GeminiAI.jsx        # Gemini AI integration
│   ├── hooks/
│   │   └── useLocalStorage.js  # Persist data to localStorage
│   ├── App.jsx                 # Main app with tabs
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env.example                # API key template
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and paste it into your `.env` file

> ⚠️ **Security Note:** Never commit your `.env` file to GitHub. It's already in `.gitignore`.

---

## 🛠️ Built With

- [React](https://react.dev/) — UI Framework
- [Vite](https://vitejs.dev/) — Build Tool
- [Recharts](https://recharts.org/) — Charts
- [Lucide React](https://lucide.dev/) — Icons
- [Gemini API](https://ai.google.dev/) — AI Intelligence

---

## 📝 License

MIT License — feel free to use, modify, and share!

---

Made with ❤️ for better personal finance management.
