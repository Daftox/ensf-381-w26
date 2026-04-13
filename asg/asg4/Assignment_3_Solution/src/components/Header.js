import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo.webp" alt="Sweet Scoop" style={{ height: '50px', marginRight: '15px' }} />
          <h1>Sweet Scoop Ice Cream Shop</h1>
        </div>

        <div className="auth-section">
          {userId ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>Welcome, <strong>{username}</strong>!</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </header>

      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/history">Order History</Link>
      </div>
    </>
  );
}

export default Header;