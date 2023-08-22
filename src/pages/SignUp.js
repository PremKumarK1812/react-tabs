import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/login');
        console.log(user);
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
                  placeholder='Email Address'
                  required
                />
              </div>
              <div className='password'>
                <label htmlFor='create-password'>Create Password</label>
                <input
                  type='password'
                  id='create-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
              </div>
              <button type='submit' onClick={onSubmit} className='signup-button'>
                Sign up
              </button>
              <button type='submit' onClick={googleSignUp} className='signin-button'>
                Sign up with Google
              </button>
              <p className='account'>
                Already have an account?{' '}
                <NavLink className='navlink' to='/login'>
                  Sign in
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
