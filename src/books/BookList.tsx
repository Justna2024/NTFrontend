import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';
import BookItem from './BookItem';
import { Book } from '../entities/book';
import NavBar from '../NavBar/NavBar';
import './BookList.css';
import { useApi } from '../api/ApiProvider';


//using useeffect to fetch loans from api -  https://legacy.reactjs.org/docs/hooks-effect.html
function BookList() {
  const apiClient = useApi();
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
      <div className="Book-list">
        <List>
          <h1 className="Header">Available books</h1>
          {books.map((book) => (
            <BookItem key={book.bookId} book={book} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default BookList;
