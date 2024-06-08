
import {
  Box,
  Chip,
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

interface LoanItemProps {
  loan: Loan;
  book: Book;
}

function LoanItem({ loan, book }: LoanItemProps) {
  const { bookId, dueDate, loanDate, returnDate } = loan;

  const {title} = book;


  return (
    <ListItem>
      
      <ListItemText className="list"
        primary={
          <div className="flex">
            <Box >
        
      </Box>
          <h3 className="Book-title">
            
            {title}
            
          </h3>
          <Box >
        
      </Box>
          </div>
        }
        secondary={
          <> 
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="Loan Date" size="small" avatar={<EditCalendarIcon/>} /></Divider>
              {loanDate.toLocaleDateString()}
            </Typography>
            <br/>
            <Typography variant="subtitle1" component="span">
            <Divider><Chip label="Due Date" size="small" avatar={<EventIcon/>} /></Divider>
              {dueDate.toLocaleDateString()}
              
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="Return Date" size="small" avatar={<EventAvailableIcon/>} /></Divider>
              {returnDate.toLocaleDateString()}
            </Typography>
            <br />
            
          </>
        }
      />
    </ListItem>
  );
}

export default LoanItem;
