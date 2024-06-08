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
import './BookList.css';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';


function BookItem({ book }: { book: Book }) {
  
  const { title, author, publisher, year, availableCopies, isbn } = book;

  

  return (
    <ListItem>
      
      <ListItemText className="list"
        primary={
          <div className="flex">
            <Box >
        <MenuBookIcon />
      </Box>
          <h3 className="Book-title">
            
            {title}
            
          </h3>
          <Box >
        <MenuBookIcon />
      </Box>
          </div>
        }
        secondary={
          <> 
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="ISBN" size="small" avatar={<BookIcon/>} /></Divider>
              {isbn}
            </Typography>
            <br/>
            <Typography variant="subtitle1" component="span">
            <Divider><Chip label="Author" size="small" avatar={<PersonIcon/>} /></Divider>
              {author}
              
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="Publisher" size="small" avatar={<BusinessIcon/>} /></Divider>
              {publisher}
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="Year Published" size="small" avatar={<CalendarMonthIcon/>} /></Divider>
              {year}
            </Typography>
            <br />
            <Typography variant="subtitle1" component="span">
              <Divider><Chip label="Available Copies" size="small" avatar={<FormatListNumberedIcon/>} /></Divider>
              {availableCopies}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
export default BookItem;
