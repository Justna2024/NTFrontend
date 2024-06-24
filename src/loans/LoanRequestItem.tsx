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
  Snackbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import { LoanPresented } from './jsonTransform';
import { useApi } from '../api/ApiProvider';
import { Book } from '../entities/book';
import { User } from '../entities/user';
import { useTranslation } from 'react-i18next';


interface Request {
    type: string | undefined;
    userId: number | undefined;
    bookId: number | undefined;
    requestId: number | undefined;
    loanId: number | undefined;
}
interface RequestItemProps {
  request: Request;
  onReturn: () => void; // Function used to tell loanlist to refresh
}

function LoanRequestItem({ request, onReturn }: RequestItemProps) {
  const { type, userId, bookId, requestId, loanId } = request;

  const apiClient = useApi();

  const [book, setBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [alreadyReturnedDialogOpen, setAlreadyReturnedDialogOpen] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiClient.getBookById(request.bookId);
        if (response.success) {
          setBook(response.data);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await apiClient.getUserById(request.userId);
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBook();
    fetchUser();
  }, [apiClient, request.bookId, request.userId]);

  const handleOpenDialog = () => {
    
  if(type === "Loan") {
    setDialogMessage("Accept this loan request?");
  } else {
    setDialogMessage("Accept this return?");
  }

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAlreadyReturnedDialogClose = () => {
    setAlreadyReturnedDialogOpen(false);
  };

  const deleteRequest = async () => {
    const response = await apiClient.deleteRequest(requestId);
    if (response.success) {
      onReturn();
    }
  }
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleType = () => {
    if (type === "Loan") {
      handleLoanRequest()
    } else {
      handleReturnRequest()
    }
  }

  const handleLoanRequest = async () => {
     
    
    const bookInt = request.bookId
    const userInt = request.userId
    const data = {
        bookId: bookInt,
        userId: userInt,
        borrowDate: new Date().getTime()
        
      };
  
    console.log('data', data);
    
    
    
    const response = await apiClient.addLoan(data);
  
    if (response.success) {
        deleteRequest();
        setSnackbarMessage('Loan added successfully!');
        setOpen(true);
        setOpenDialog(false);

    } else {
        setSnackbarMessage('Failed to add loan');
        setOpen(true);
        setOpenDialog(false);
    }
  };

  const handleReturnRequest = async () => {
     

    const data = {
        loanId: loanId,
        returnDate: new Date().getTime()
        
      };
  
    console.log('data', data);
    
    
    const response = await apiClient.returnLoan(data);
  
    if (response.success) {
        deleteRequest();
        setSnackbarMessage('Loan returned successfully!');
        setOpen(true);
        setOpenDialog(false);

    } else {
        setSnackbarMessage('Failed to add loan');
        setOpen(true);
        setOpenDialog(false);
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
                <div></div>
                {user?.userId.toString()}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('request type')} size="small" avatar={<EditCalendarIcon />} />
                </Divider>
                {request.type}
              </Typography>
              <br />
            
              
            </>
          }
        />
      </ListItem>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleType} variant="contained" color="primary">
            Accept
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

export default LoanRequestItem;
