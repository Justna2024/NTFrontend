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
import LoanAdd from './loans/LoanAdd';
import MainPageAdmin from './MainPage/MainPageAdmin';
import UserAdd from './users/UserAdd';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import BookListAdmin from './books/BookListAdmin';
import LoanListAdmin from './loans/LoanListAdmin';
import UserList from './users/UserList';
import LoanRequestList from './loans/LoanRequestList';

function App() {
  
  return (
    <BrowserRouter>{}
    <I18nextProvider i18n={i18n}>
    <ApiProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />}/>
      <Route path="/Login" element={<LoginForm/>}/>
      <Route path="/Books" element={<BookList/>}/>
      <Route path="/Loans" element={<LoanList/>}/>
      <Route path="/BooksAdmin" element={<BookListAdmin/>}/>
      <Route path="/LoansAdmin" element={<LoanListAdmin/>}/>
      <Route path="/Users" element={<UserList/>}/>

      <Route path="/Home" element={<MainPage/>}/>

      <Route path="/LoanRequests" element={<LoanRequestList/>}/>
      <Route path="/HomeAdmin" element={<MainPageAdmin/>}/>
      
      <Route path="/AddBook" element={<BookAdd/>}/>
      <Route path="/AddLoan" element={<LoanAdd/>}/>
      <Route path="/AddUser" element={<UserAdd/>}/>
    </Routes>
    </ApiProvider>
    </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
