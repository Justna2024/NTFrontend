import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';
import BookItemAdmin from './BookItemAdmin';
import { Book } from '../entities/book';
import NavBar from '../NavBar/NavBar';
import './BookList.css';
import { useApi } from '../api/ApiProvider';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

function BookListAdmin() {
  const apiClient = useApi();
  const [books, setBooks] = useState<Book[]>([]);
  const {t} = useTranslation();
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

  useEffect(() => {
    fetchBooks();
  }, [apiClient]);

  return (
    <div>
      <NavBar />
      <div className="Book-list">
        <List>
          <h1 className="Header">{t('Available books')}</h1>
          {books.map((book) => (
            <BookItemAdmin key={book.bookId} book={book} onUpdate={fetchBooks} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default BookListAdmin;
