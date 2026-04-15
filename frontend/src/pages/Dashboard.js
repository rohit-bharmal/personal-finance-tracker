import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];

export default function Dashboard({ token, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const loadExpenses = async () => {
    const data = await getExpenses(token);
    if (Array.isArray(data)) {
      setExpenses(data);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    await addExpense(
      {
        title,
        amount: Number(amount),
        category,
        date: new Date().toISOString().split("T")[0],
      },
      token,
    );
    setTitle("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id, token);
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Finance Tracker</h1>
          <p className="dash-subtitle">Keep track of your spending</p>
        </div>
        <button className="btn-outline" onClick={onLogout}>Logout</button>
      </header>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total Spent</span>
          <span className="stat-value">{total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Transactions</span>
          <span className="stat-value">{expenses.length}</span>
        </div>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          placeholder="What did you spend on?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary">Add</button>
      </form>

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add your first one above!</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((e) => (
            <li key={e.id} className="expense-item">
              <div className="expense-info">
                <span className="expense-title">{e.title}</span>
                <span className="expense-meta">{e.category} &middot; {e.date}</span>
              </div>
              <div className="expense-right">
                <span className="expense-amount">
                  {e.amount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </span>
                <button className="btn-delete" onClick={() => handleDelete(e.id)} title="Delete">
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
