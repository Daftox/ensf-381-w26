import React from 'react';

function DisplayStatus({ type, message }) {
  const statusStyle = {
    color: type === 'success' ? 'green' : 'red',
    marginTop: '10px',
    fontWeight: 'bold'
  };

  return (
    <div className="status-message" style={statusStyle}>
      {message}
    </div>
  );
}

export default DisplayStatus;