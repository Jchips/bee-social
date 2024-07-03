import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const VerifyEmail = () => {
  return (
    <div className="verify-email">
      <Card className='auth-card text-center'>
        <p>Please check your email to verify your account.</p>
        <p>Once verified, you can <Link to='/login'>log in</Link></p>
      </Card>
    </div>
  );
}

export default VerifyEmail;
