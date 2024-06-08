import { List } from '@mui/material';
import LoanItem from './LoanItem';
import { Loan } from '../entities/loan';

import NavBar from '../NavBar/NavBar';
import './LoanList.css';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { readLoanJson } from './jsonTransform';
import { Book } from '../entities/book';
function LoanList() {
  const apiClient = useApi();
  const [loans, setLoans] = useState<Loan[]>([]);

//using useeffect to fetch loans from api -  https://legacy.reactjs.org/docs/hooks-effect.html
// using it twice here so that we can get the book title
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await apiClient.getLoans();
        if (response.success) {
          const jsonLoans = readLoanJson(response.data);
          setLoans(jsonLoans);
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    }
    fetchLoans();})


    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await apiClient.getBooks();
          if (response.success) {
            setBooks(response.data);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };



      
      fetchBooks();
    }, [apiClient]);



    return (
      <div>
        <NavBar />
        <div className="LoanList" >
          <List>
            <h1 className="Header">Your Loans</h1>
            {/* goes over every loan and book and creates a LoanItem with them */}
            {loans.map((loan) => (
              books.map((book) => <LoanItem key={loan.loanId} loan={loan} book={book} />)

            ))}
          </List>
        </div>
      </div>
    );
  }

export default LoanList;
