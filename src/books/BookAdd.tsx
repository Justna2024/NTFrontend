import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import { useState } from 'react';

function BookAdd() {
  const apiClient = useApi();

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');
  const {t} = useTranslation();
  const handleSave = async () => {
    const data = {
      title,
      isbn,
      author,
      publisher,
      year,
      availableCopies,
    };
    console.log(data);

    const response = await apiClient.addBook(data);

    if (response.success) {
      alert('Book added successfully!');
    } else {
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <NavBar />

      <h1 className="header">{t('add book')}</h1>
      <div className="flex1">
        <div className="flex-col1">
          <h2>{t('title')}:</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <h2>ISBN:</h2>
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />

          <h2>{t('Author')}:</h2>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className="flex-col1">
          <h2>{t('publisher')}:</h2>
          <input
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />

          <h2>{t('year')}:</h2>
          <input
            value={year}
            type="number"
            onChange={(e) => setYear(e.target.value)}
          />

          <h2>{t('available copies')}:</h2>
          <input
            value={availableCopies}
            type="number"
            onChange={(e) => setAvailableCopies(e.target.value)}
          />
        </div>
        
      </div>
      <div className="flex1">
        <button className="button" onClick={handleSave}>
          {t('save')}
        </button>
      </div>
    </div>
  );
}

export default BookAdd;
