import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/home');
      })
      .catch((err) => {
        console.log('An error occurred', err.message);
      });
  };

  const googleSignUp = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/home');
        console.log(user);
      })
      .catch((err) => {
        console.log('An error occurred', err.message);
      });
  };
  return (
    <main>
      <section>
        <div>
          <div className='content'>
            <form className='form'>
              <h1 className='title-1'>React Accordion</h1>
              <div className='email'>
                <label htmlFor='email-address'>Email Address</label>
                <input
                  type='email'
                  id='email-address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email Address'
                />
              </div>
              <div className='password'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='Password'
                />
              </div>
              <button type='submit' onClick={onLogin} className='login-button'>
                Login
              </button>
              <button
                type='submit'
                onClick={googleSignUp}
                className='signin-button'
              >
                Login with Google
              </button>
              <p className='account'>
                Don't have an account?{' '}
                <NavLink className='navlink' to='/signup'>
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
