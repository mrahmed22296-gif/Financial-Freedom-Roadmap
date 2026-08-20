import React from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';

export default function TransactionList({ transactions, onDelete }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Transactions</h3>
        <div className="empty-state">
          <Calendar size={48} />
          <p>No transactions yet. Add your first one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Transactions</h3>
      <div>
        {sortedTransactions.map(transaction => (
          <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-info">
              <h4>{transaction.category}</h4>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {transaction.date}
                {transaction.description && (
                  <>
                    <span style={{ margin: '0 4px' }}>•</span>
                    <Tag size={12} />
                    {transaction.description}
                  </>
                )}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="btn btn-danger"
                style={{ padding: '8px', borderRadius: '6px' }}
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
