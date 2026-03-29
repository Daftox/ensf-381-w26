import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <div className="login-page">
      <Header />
      <main className="main-section">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;