import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';

import { Book } from '../entities/book';
import NavBar from '../NavBar/NavBar';

import { useApi } from '../api/ApiProvider';
import LoanSelectBook from './LoanSelectBook';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface LoanBookListProps {
    selectedBookId: string | null;
    setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
  }
//using useeffect to fetch loans from api -  https://legacy.reactjs.org/docs/hooks-effect.html
function LoanBookList({ selectedBookId, setSelectedBookId }: LoanBookListProps) {
  const apiClient = useApi();
  const {t} = useTranslation();
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
      <h1 className="">{t('Available books')}</h1> 
      <div className="BookList">
        <List>
          
          {books.map((book) => (
            <LoanSelectBook key={book.bookId} book={book} isSelected={book.bookId.toString() === selectedBookId}
            onSelect={() => setSelectedBookId(book.bookId.toString())} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default LoanBookList;
