import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your shared expenses and communicate with your roommates!</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/expenses">
          <button style={{ margin: '10px', padding: '10px 20px' }}>
            View Expenses
          </button>
        </Link>
        
        <Link to="/messages">
          <button style={{ margin: '10px', padding: '10px 20px' }}>
            View Messages
          </button>
        </Link>
      </div>
    </div>
  );
}