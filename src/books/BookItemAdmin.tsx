import React, { useState } from 'react';
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import { Book } from '../entities/book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';
import { useApi } from '../api/ApiProvider';
import './BookList.css';
import { updateBookDto } from '../api/dto/updateBook.dto';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface BookItemAdminProps {
  book: Book;
  onUpdate: () => void; 
}

function BookItemAdmin({ book, onUpdate }: BookItemAdminProps) {
  const apiClient = useApi();
  const { bookId, title, author, publisher, year, availableCopies, isbn } = book;
  const {t} = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [editBook, setEditBook] = useState<Book>({ ...book });

  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpen(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleUpdateBook = async () => {
    const data: updateBookDto = {
      title: editBook.title,
      isbn: editBook.isbn,
      author: editBook.author,
      publisher: editBook.publisher,
      year : editBook.year,
      availableCopies: editBook.availableCopies,
    };
    try {

      const response = await apiClient.updateBook(data, bookId);
      if (response.success) {
        
        onUpdate(); 
        handleCloseDialog();
        setSnackbarMessage('Book updated successfully');
        setOpen(true);
      }else{
        setSnackbarMessage('Failed to update book');
        setOpen(true);}
    } catch (error) {
      console.error('Error updating book:', error);
      
    }
  };

  const handleDeleteBook = async () => {
    try {
      const response = await apiClient.deleteBook(bookId);
      if (response.success) {
        
        onUpdate(); 
        handleCloseDialog();
        setSnackbarMessage('Book deleted successfully');
        setOpen(true);
        
      } else {
        setSnackbarMessage('Failed to delete book');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  

  return (
    <div>
      <ListItem onClick={handleOpenDialog} className="typography" style={{ cursor: 'pointer' }}>
        <ListItemText
          className="list"
          primary={
            <div className="flex">
              <Box>
                <MenuBookIcon />
              </Box>
              <h3 className="Book-title">{title}</h3>
              <Box>
                <MenuBookIcon />
              </Box>
            </div>
          }
          secondary={
            <>
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label="ISBN" size="small" avatar={<BookIcon />} />
                </Divider>
                {isbn}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('Author')} size="small" avatar={<PersonIcon />} />
                </Divider>
                {author}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('publisher')} size="small" avatar={<BusinessIcon />} />
                </Divider>
                {publisher}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('year')} size="small" avatar={<CalendarMonthIcon />} />
                </Divider>
                {year}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('available copies')} size="small" avatar={<FormatListNumberedIcon />} />
                </Divider>
                {availableCopies}
              </Typography>
            </>
          }
        />
      </ListItem>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editBook.title}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Author"
            name="author"
            value={editBook.author}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Publisher"
            name="publisher"
            value={editBook.publisher}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Year"
            name="year"
            value={editBook.year}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Available Copies"
            name="availableCopies"
            value={editBook.availableCopies}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type='number'
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={editBook.isbn}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateBook} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleDeleteBook} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} 
      autoHideDuration={6000} 
      onClose={handleCloseDialog}
      message={snackbarMessage}
      ContentProps={{
        sx: {
          display: 'block',
          textAlign: "center",
          backgroundColor: 'lightgreen',
          color: 'black'
        }
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default BookItemAdmin;
