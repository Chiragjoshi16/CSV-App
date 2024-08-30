import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(signupUser(values));
        navigate('/csvupload'); 
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
  });

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username && <div>{formik.errors.username}</div>}
        
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
        
        <button type="submit">Signup</button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="login-redirect">
        <p>Already have an account?</p>
        <button type="button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Signup;