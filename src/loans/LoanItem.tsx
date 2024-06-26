
import {
  Box,
  Button,
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
} from '@mui/material';

import './LoanList.css';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import { Loan } from '../entities/loan';
import { Book } from '../entities/book';
import { LoanPresented } from './jsonTransform';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface LoanItemProps {
  loan: LoanPresented;
  
}

function LoanItem({ loan}: LoanItemProps) {
  const { bookId, dueDate, loanDate, returnDate } = loan;
  const {t} = useTranslation();

  const apiClient = useApi();

  const [book, setBooks] = useState<Book>();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    if(returnDate === null){
    setOpenDialog(true)};
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.getBookById(loan.bookId);
        if (response.success) {
          setBooks(response.data);
        } 
      } catch (error) {
        console.error('Error fetching books:', error);
      } 
    };

    fetchBooks();
  }, [apiClient]);

  const handleReturnItem = async () => {
    
      try {
        const response = await apiClient.addReturnRequest(loan.loanId, loan.bookId);
        if (response.success) {
          
          handleCloseDialog();
          
        }
      } catch (error) {
        console.error('Error returning item:', error);
        handleCloseDialog();
      }
     }
  ;

  return (
    <div>
      <ListItem onClick={handleOpenDialog} className="typography" style={{ cursor: 'pointer' }}>
        <ListItemText
          className="list"
          primary={
            <div className="flex">
              <h3 className="Book-title">{book?.title}</h3>
            </div>
          }
          secondary={
            <>
              
          
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('loan date')} size="small" avatar={<EditCalendarIcon />} />
                </Divider>
                {new Date(loanDate).toLocaleDateString()}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('due date')} size="small" avatar={<EventIcon />} />
                </Divider>
                {new Date(dueDate).toLocaleDateString()}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('return date')} size="small" avatar={<EventAvailableIcon />} />
                </Divider>
                {returnDate
                  ? new Date(returnDate).toLocaleDateString()
                  : 'Not returned yet'}
              </Typography>
              <br />
            </>
          }
        />
      </ListItem>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Return</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to return this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleReturnItem} variant="contained" color="primary">
            Return Book
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog open={alreadyReturnedDialogOpen} onClose={handleAlreadyReturnedDialogClose}>
        <DialogTitle>Item Already Returned</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This item has already been returned.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlreadyReturnedDialogClose} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default LoanItem;
