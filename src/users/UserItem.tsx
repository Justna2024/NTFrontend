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

import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';
import { useApi } from '../api/ApiProvider';
import './Users.css';
import { updateBookDto } from '../api/dto/updateBook.dto';
import { User } from '../entities/user';
import { updateUserDto } from '../api/dto/updateUser.dto';
import SchoolIcon from '@mui/icons-material/School';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useTranslation } from 'react-i18next';

interface UserItemAdminProps {
  user: User;
  onUpdate: () => void; 
}

function UserItem({ user, onUpdate }: UserItemAdminProps) {
  const apiClient = useApi();
  const { userId, firstName, lastName, email, student, dateOfBirth } = user;
  const {t} = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState<User>(user);

  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  

  const date = dateOfBirth ? new Date(dateOfBirth) : null;
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpen(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleUpdateUser = async () => {
    const data: updateUserDto = {
      firstName: editUser.firstName,
      lastName: editUser.lastName,
      email: editUser.email,
      student: editUser.student,
      dateOfBirth: editUser.dateOfBirth,
    };
    try {

      const response = await apiClient.updateUser(data, userId);
      if (response.success) {
        
        onUpdate(); 
        handleCloseDialog();
        setSnackbarMessage('User updated successfully');
        setOpen(true);
      }else{
        setSnackbarMessage('Failed to update user');
        setOpen(true);}
    } catch (error) {
      console.error('Error updating user:', error);
      
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await apiClient.deleteUser(userId);
      if (response.success) {
        
        onUpdate(); 
        handleCloseDialog();
        setSnackbarMessage('User deleted successfully');
        setOpen(true);
        
      } else {
        setSnackbarMessage('Failed to delete user');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
                <PersonIcon />
              </Box>
              <h3 className="User-title">{user.firstName} {user.lastName}</h3>
              <Box>
                <PersonIcon />
              </Box>
            </div>
          }
          secondary={
            <>
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label="email" size="small" avatar={<AlternateEmailIcon />} />
                </Divider>
                {user.email}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label={t('date of birth')} size="small" avatar={<CalendarMonthIcon />} />
                </Divider>
                {date?.toLocaleDateString()}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                <Divider>
                  <Chip label="Student" size="small" avatar={<SchoolIcon />} />
                </Divider>
                {user.student?.toString()}
              </Typography>
              
            </>
          }
        />
      </ListItem>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={editUser.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editUser.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Student"
            name="student"
            value={editUser.student}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={editUser.dateOfBirth ||""}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type="date"
            
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateUser} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleDeleteUser} variant="contained" color="secondary">
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

export default UserItem;
