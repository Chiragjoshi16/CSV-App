import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import '../styles/Login.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
        navigate('/csvupload');
      } catch (error) {
        console.error('Login error:', error);
        if (error.message.includes('User not found')) {
          setErrorMessage('User not found. Please check your email or sign up.');
        } else if (error.message.includes('Incorrect password')) {
          setErrorMessage('Incorrect password. Please try again.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      }
    },
  });

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
        
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="signup-redirect">
        <p>Don't have an account?</p>
        <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;