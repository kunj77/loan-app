import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/user';
import crypto from 'crypto-js';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '../typings';
import { LoadingSpinner } from './LoadingSpinner';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formError, setFormError] = useState<string>('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: 'onBlur' });

  const handleRegistration = (userData: User) => {
    setFormError('');
    setIsLoading(true);
    const hashedPassword = crypto.SHA256(userData.password).toString();

    UserDataService.create({ ...userData, password: hashedPassword })
      .then((response: AxiosResponse) => {
        navigate('/login');
        setIsLoading(false);
      })
      .catch((e: AxiosError) => {
        const errorMsg = e.message || 'Something went wrong! Please try again later';
        setFormError(errorMsg);
        setIsLoading(false);
      })
  };

  const registerOptions = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
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
            type="text"
            placeholder="Name"
            {...register('name', registerOptions.name)}
          />
          {errors.name && (
            <p className="error-msg">{errors.name.message}</p>
          )}
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignupForm;
