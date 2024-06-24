import { Link, Navigate } from 'react-router-dom';
import './NavBar.css';
import { useTranslation } from 'react-i18next';
import { ArrowDropDown } from '@mui/icons-material';
import { Menu } from '@mui/material';
import DropDownMenu from '../DropDownMenu';
import LinkDropDown from '../LinkDropDown';

function NavBar(){
  const {t} = useTranslation();

  const linksLoan = [
    { path: '/LoansAdmin', label: t('loans') },
    { path: '/AddLoan', label: t('add loan') },
    { path: '/LoanRequests', label: t('loan requests') },
    
  ];

  const linksUsers = [
    { path: '/Users', label: t('users') },
    { path: '/AddUser', label: t('add user') },

  ]
  const linksBooks = [
    { path: '/BooksAdmin', label: t('books') },
    { path: '/AddBook', label: t('add book') },
  
  ]


    return(
      <nav className="navBar">
        <div className="title">
        <Link className="home_link" to="/HomeAdmin" > {t('library')}</Link>
        <DropDownMenu/>
        </div>
        
        <div className='linksSection'>
            
            
            
            
            <LinkDropDown links={linksBooks} title={t('books')}/>
            <LinkDropDown links={linksLoan} title={t('loans')}/>
            <LinkDropDown links={linksUsers} title={t('users')}/>
            {/* <Link className='links' to="/AddBook">Add Book</Link>
            <Link className='links' to="/AddLoan">Add Loan</Link>
            <Link className='links' to="/AddUser">Add User</Link> */}
            
        </div>
      </nav>
    )
}
export default NavBar

