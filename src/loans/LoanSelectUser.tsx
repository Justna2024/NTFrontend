import {
    Box,
    Chip,
    Divider,
    ListItem,
    ListItemText,
    Typography,
  } from '@mui/material';
  import { Book } from '../entities/book'; 
  import MenuBookIcon from '@mui/icons-material/MenuBook';
  import './LoanList.css';
  import PersonIcon from '@mui/icons-material/Person';
  import BusinessIcon from '@mui/icons-material/Business';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
  import BookIcon from '@mui/icons-material/Book';
import { CheckBox } from '@mui/icons-material';
import { User } from '../entities/user';
  
interface LoanSelectBookProps {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}
  function LoanSelectUser({ user, isSelected, onSelect }: LoanSelectBookProps) {
    
    const { userId, firstName, lastName, dateOfBirth, email, auth, student } = user;
  
    const DoB = dateOfBirth ? new Date(dateOfBirth) : null;
    const date = DoB?.toLocaleDateString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric' });
  
    return (
      <ListItem>
        
        <ListItemText className="Item"
          primary={
            <div className="flex">
              <Box >
          
        </Box>
            <h3 className="Book-title">
              
            {email}
              
            </h3>
            <Box >
          

        </Box>
        <input type="checkbox" checked={isSelected} onChange={onSelect}/>
            </div>
          }
          secondary={
            <> 
                <div className="flex-col">

                <p>{firstName} {lastName}</p>
                

                <p>{date ? date : ''}</p>
             
                
                
             
                
                </div>
            </>
          }
        />
      </ListItem>
    );
  }
  export default LoanSelectUser;
  