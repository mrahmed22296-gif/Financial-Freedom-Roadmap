import React, { useState } from 'react';
import { Sparkles, Send, AlertCircle } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export default function GeminiAI({ transactions }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const handleAsk = async () => {
    if (!question.trim()) return;
    if (!GEMINI_API_KEY) {
      setError('Please add your Gemini API key to the .env file (VITE_GEMINI_API_KEY)');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    const financialContext = `
My financial data:
- Total Income: $${income.toFixed(2)}
- Total Expenses: $${expense.toFixed(2)}
- Net Balance: $${(income - expense).toFixed(2)}
- Expense Breakdown: ${Object.entries(expensesByCategory).map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`).join(', ')}

Recent Transactions:
${transactions.slice(-10).map(t => `- ${t.type.toUpperCase()}: ${t.category} $${parseFloat(t.amount).toFixed(2)} (${t.date})${t.description ? ' - ' + t.description : ''}`).join('\n')}
`;

    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful personal finance advisor. Use the following financial data to answer the user's question. Be concise, practical, and actionable.\n\n${financialContext}\n\nUser Question: ${question}`
            }]
          }]
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || 'API request failed');
      }

      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
      setResponse(aiText);
    } catch (err) {
      setError(err.message || 'Failed to get response from Gemini AI');
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How can I save more money?",
    "Analyze my spending habits",
    "Give me a budget plan",
    "Where am I overspending?"
  ];

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={22} />
        Gemini AI Financial Advisor
      </h3>

      {!GEMINI_API_KEY && (
        <div style={{ background: '#fef3c7', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e' }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: '14px' }}>Add your Gemini API key to .env file to use AI features</span>
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label className="label">Ask about your finances</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="input"
            placeholder="e.g. How can I reduce my expenses?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            onClick={handleAsk}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? <div className="loading" /> : <Send size={18} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => { setQuestion(q); }}
            className="tab"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            {q}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', fontSize: '14px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {response && (
        <div className="ai-response">
          <strong style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            <Sparkles size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Gemini Response:
          </strong>
          {response}
        </div>
      )}
    </div>
  );
}
