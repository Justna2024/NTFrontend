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

interface BookItem {
  book: Book;
  onUpdate: () => void; 
}

function BookItem({ book, onUpdate }: BookItem) {
  const apiClient = useApi();
  const { bookId, title, author, publisher, year, availableCopies, isbn } = book;
  const {t} = useTranslation();

  const [openDialog, setOpenDialog] = useState(false);
  const [editBook, setEditBook] = useState<Book>(book);

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

  
  const handleRequest = async () => {
    
    try {

      const response = await apiClient.addRequest(bookId);
      if (response.success) {
        
        onUpdate(); 
        handleCloseDialog();
        setSnackbarMessage('Loan Requested successfully');
        setOpen(true);
      }else{
        setSnackbarMessage('Failed to request loan');
        setOpen(true);}
    } catch (error) {
      console.error('Error requesting loan:', error);
      
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
        <DialogTitle>Request Loan</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleRequest} variant="contained" color="primary">
              Request
            </Button>
          </DialogActions>
        </DialogContent>
        
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

export default BookItem;
