import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';
import crypto from 'crypto-js';
import { loginUser } from '../store/userSlice';
import { useAppDispatch } from '../store/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { LoginData } from '../typings';
import { LoadingSpinner } from './LoadingSpinner';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formError, setFormError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onBlur' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegistration = (userData: LoginData) => {
    setFormError('');
    setIsLoading(true);
    const hashedPassword = crypto.SHA256(userData.password).toString();

    UserDataService.login({ ...userData, password: hashedPassword })
      .then((response: AxiosResponse) => {
        dispatch(loginUser({ id: response.data.id }));
        setIsLoading(false);
        navigate('/home');
      })
      .catch((e: AxiosError) => {
        setIsLoading(false);
        setFormError('Invalid email or password!');
      });
  };

  const registerOptions = {
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
    {isLoading && <LoadingSpinner />}
    <div className="form-container">
      <h1 className="title">Welcome to KMoneyLender!</h1>
      {formError !== '' && <p className="error-msg">{formError}</p>}
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', registerOptions.email)}
          />
          {errors.email && (
            <p className="error-msg">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', registerOptions.password)}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Login</button>
        <p className="signup-prompt">
          New user? Sign up <span onClick={goToSignup}>here!</span>
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginForm;
