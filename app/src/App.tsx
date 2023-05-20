import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainContainer from './components/MainContainer';
import SignupForm from './components/SignupForm';


export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainContainer />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
