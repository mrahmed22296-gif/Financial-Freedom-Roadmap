import React from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#667eea', '#764ba2', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expense;

  // Group expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div>
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <div className="stat-card income">
          <TrendingUp size={28} />
          <div className="stat-label">Total Income</div>
          <div className="stat-value">${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="stat-card expense">
          <TrendingDown size={28} />
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">${expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="stat-card balance" style={{ marginBottom: '24px' }}>
        <Wallet size={28} />
        <div className="stat-label">Net Balance</div>
        <div className="stat-value">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
      </div>

      {chartData.length > 0 && (
        <div className="card">
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={20} />
            Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
