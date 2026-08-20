import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other Income'];
const EXPENSE_CATEGORIES = ['Rent', 'Food', 'Car', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Transport', 'Other'];

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date
    });

    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Type</label>
          <div className="tabs">
            <button
              type="button"
              className={`tab ${type === 'income' ? 'active' : ''}`}
              onClick={() => { setType('income'); setCategory(''); }}
            >
              Income
            </button>
            <button
              type="button"
              className={`tab ${type === 'expense' ? 'active' : ''}`}
              onClick={() => { setType('expense'); setCategory(''); }}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="label">Amount ($)</label>
            <input
              type="number"
              className="input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Category</label>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Description (Optional)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Monthly rent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          <PlusCircle size={18} />
          Add Transaction
        </button>
      </form>
    </div>
  );
}
