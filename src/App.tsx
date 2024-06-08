import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './books/BookList';
import LoanList from './loans/LoanList';
import { BrowserRouter, Route, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import ApiProvider from './api/ApiProvider';
import BookAdd from './books/BookAdd'

function App() {
  
  return (
    <BrowserRouter>{}
    <ApiProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />}/>
      <Route path="/Login" element={<LoginForm/>}/>
      <Route path="/Books" element={<BookList/>}/>
      <Route path="/Home" element={<MainPage/>}/>
      <Route path="/Loans" element={<LoanList/>}/>
      <Route path="/AddBook" element={<BookAdd/>}/>
    </Routes>
    </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
