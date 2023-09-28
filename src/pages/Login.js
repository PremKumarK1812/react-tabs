import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showCredentials, setShowCredentials] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordMatch = useRef('');
  passwordMatch.current = watch('password');

  const validation = {
    email: {
      required: {
        value: true,
        message: 'Email is Mandatory',
      },
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: 'Enter a valid Email address',
      },
    },
    password: {
      required: {
        value: true,
        message: 'Password is Mandatory',
      },
      minLength: {
        value: 8,
        message: 'Your password should contain atleast 8 characters',
      },
      maxLength: {
        value: 16,
        message: 'Password should have only 16 characters',
      },
    },
  };

  const toggleCredentials = (e) => {
    e.preventDefault();
    setShowCredentials((showCredentials) => !showCredentials);
  };

  const onLogin = handleSubmit(async (e) => {
    if (e.email && e.password) {
      await signInWithEmailAndPassword(auth, e.email, e.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setEmail('');
          setPassword('');
          alert('Logged in Successfully!!!');
          navigate('/home');
        })
        .catch((err) => {
          alert('Log in Failed');
          console.log('An error occurred', err.message);
        });
    }
  });

  const googleSignUp = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/home');
        alert('Logged in Successfully!!!');
        console.log(user);
      })
      .catch((err) => {
        alert('Log in Failed');
        console.log('An error occurred', err.message);
      });
  };
  return (
    <main>
      <section>
        <div>
          <div className='content'>
            <form className='form'>
              <h1 className='title-1'>Login</h1>
              <div className='email'>
                <label htmlFor='email-address'>Email Address</label>
                <input
                  type='email'
                  id='email-address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email Address'
                  {...register('email', validation.email)}
                />
                <p className='error-msg'>
                  {errors.email && errors.email.message}
                </p>
              </div>
              <div className='password'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  {...register('password', validation.password)}
                />
              </div>
              <p className='error-msg'>
                {errors.password && errors.password.message}
              </p>
              <button type='submit' className='login-button' onClick={onLogin}>
                Login
              </button>
              <button
                type='submit'
                onClick={googleSignUp}
                className='signin-button'
              >
                Sign in with Google
              </button>
              <p className='account'>
                Don't have an account?{' '}
                <NavLink className='navlink' to='/signup'>
                  Sign up
                </NavLink>
              </p>
              <button
                className='show-credentials-button'
                onClick={toggleCredentials}
              >
                User Credentials
              </button>
              {showCredentials && (
                <div className='test-credentials'>
                  <p>
                    <strong>Email:</strong> abcd@test.com
                  </p>
                  <p>
                    <strong>Password:</strong> Abcd!123
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
