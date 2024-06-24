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
import { ChangeEventHandler } from 'react';
  

interface LoanSelectBookProps {
    book: Book;
    isSelected: boolean;
    onSelect: () => void;
  }
  
  function LoanSelectBook({ book, isSelected, onSelect }: LoanSelectBookProps) {
    
    const { title, author, publisher, year, availableCopies, isbn } = book;
  
    
  
    return (
      <ListItem>
        
        <ListItemText className="Item"
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
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
            </div>
          }
          secondary={
            <> 
                <div className="flex-col">
                <p>{isbn}</p>
             
                <p>{author}</p>
                
             
                <p>{publisher}</p>
             
                <p>{year}</p>
              
              
              
                <p> {availableCopies}</p>
                </div>
            </>
          }
        />
      </ListItem>
    );
  }
  export default LoanSelectBook;
  