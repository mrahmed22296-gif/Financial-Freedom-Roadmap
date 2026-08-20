import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import GeminiAI from './components/GeminiAI';

export default function App() {
  const [transactions, setTransactions] = useLocalStorage('finance_transactions', []);
  const [activeTab, setActiveTab] = useState('dashboard');

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <div className="header">
        <h1><Wallet size={40} style={{ display: 'inline', marginRight: '12px', verticalAlign: 'middle' }} />Personal Finance AI</h1>
        <p>Track your income, expenses, and get AI-powered financial insights</p>
      </div>

      <div className="container">
        <div className="tabs" style={{ justifyContent: 'center' }}>
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            AI Advisor
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <Dashboard transactions={transactions} />
            <TransactionForm onAdd={addTransaction} />
          </>
        )}

        {activeTab === 'transactions' && (
          <>
            <TransactionForm onAdd={addTransaction} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </>
        )}

        {activeTab === 'ai' && (
          <GeminiAI transactions={transactions} />
        )}
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 20px', color: 'white', opacity: 0.7 }}>
        <p>Personal Finance AI • Built with React + Gemini API</p>
      </footer>
    </div>
  );
}
