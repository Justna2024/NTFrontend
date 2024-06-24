import React, { useEffect, useState } from 'react';
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
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import { LoanPresented } from './jsonTransform';
import { useApi } from '../api/ApiProvider';
import { Book } from '../entities/book';
import { User } from '../entities/user';
import { t } from 'i18next';

interface LoanItemProps {
  loan: LoanPresented;
  onReturn: () => void; // Function used to tell loanlist to refresh
}

function LoanItemAdmin({ loan, onReturn }: LoanItemProps) {
  const { bookId, userId, dueDate, loanDate, returnDate } = loan;

  const apiClient = useApi();

  const [book, setBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [alreadyReturnedDialogOpen, setAlreadyReturnedDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiClient.getBookById(loan.bookId);
        if (response.success) {
          setBook(response.data);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await apiClient.getUserById(loan.userId);
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBook();
    fetchUser();
  }, [apiClient, loan.bookId, loan.userId]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAlreadyReturnedDialogClose = () => {
    setAlreadyReturnedDialogOpen(false);
  };

  const handleReturnItem = async () => {
    const data = {
      loanId: parseInt(loan.loanId),
      returnDate: new Date().getTime(),
    };

    if (loan.returnDate === null) {
      try {
        const response = await apiClient.returnLoan(data);
        if (response.success) {
          console.log('Item returned successfully!');
          handleCloseDialog();
          onReturn(); // send to loan list info to refetch loans
        }
      } catch (error) {
        console.error('Error returning item:', error);
        handleCloseDialog();
      }
    } else {
      console.log('Item already returned');
      setAlreadyReturnedDialogOpen(true);
      handleCloseDialog();
    }
  };

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
                  <Chip label={t('reader')} size="small" avatar={<PersonIcon />} />
                </Divider>
                {user?.email}
                <div></div>
                {user?.firstName} {user?.lastName}
              </Typography>
              <br />
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
            Are you sure you want to mark this item as returned?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleReturnItem} variant="contained" color="primary">
            Return Item
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={alreadyReturnedDialogOpen} onClose={handleAlreadyReturnedDialogClose}>
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
      </Dialog>
    </div>
  );
}

export default LoanItemAdmin;
