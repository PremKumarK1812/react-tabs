import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordMatch = useRef('');
  passwordMatch.current = watch('password');

  const onSubmit = async (data, e) => {
    console.log(data);
    if (data.fullName && data.email && data.password) {
      e.preventDefault();

      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setEmail('');
          setPassword('');
          navigate('/login');
          alert('Signed Up Successfully!!!');
          console.log(user);
        })
        .catch((err) => {
          alert('Sign up Failed');
          console.log('An error occurred', err.message);
        });
    }
  };

  const validation = {
    fullName: {
      required: {
        value: true,
        message: 'Enter your Full Name',
      },
      minLength: {
        value: 5,
        message: 'Your name should contain atleast 5 characters',
      },
      maxLength: {
        value: 15,
        message: 'Your name should have only 10 characters',
      },
    },
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
    confirmPassword: {
      required: {
        value: true,
        message: 'Confirm Password is Mandatory',
      },
      minLength: {
        value: 8,
        message: 'Your password should contain atleast 8 characters',
      },
      maxLength: {
        value: 16,
        message: 'Confirm Password should have only 16 characters',
      },
      validate: (value) => {
        if (value !== passwordMatch.current) {
          return "The passwords doesn't match";
        }
      },
    },
  };

  const googleSignUp = async (e) => {
    e.preventDefault();

    await signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        alert('Logged in Successfully!!!');
        navigate('/home');
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
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <h1 className='title-1'>Sign Up</h1>
              <div className='fullname'>
                <label htmlFor='full-name'>Full Name</label>
                <input
                  type='text'
                  id='full-name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Full Name'
                  {...register('fullName', validation.fullName)}
                />
                <p className='error-msg'>
                  {errors.fullName && errors.fullName.message}
                </p>
              </div>
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
                <label htmlFor='create-password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  {...register('password', validation.password)}
                />
                <p className='error-msg'>
                  {errors.password && errors.password.message}
                </p>
              </div>
              <div className='confirm-password'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                  type='password'
                  id='confirm-password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password'
                  {...register('confirmPassword', validation.confirmPassword)}
                />
                <p className='error-msg'>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </div>
              <button type='submit' className='signup-button'>
                Sign up
              </button>
              <button
                type='submit'
                onClick={googleSignUp}
                className='signin-button'
              >
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
