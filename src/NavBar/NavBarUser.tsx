import { Link, Navigate } from 'react-router-dom';
import './NavBar.css';
import { t } from 'i18next';
import DropDownMenu from '../DropDownMenu';
import { useTranslation } from 'react-i18next';

function NavBarUser(){
  const {t} = useTranslation();

  
  

    return(
      <nav className="navBar">
        <div className="title">
        <Link className="home_link" to="/Home" > {t('library')}</Link>
        <DropDownMenu/>
        </div>


        <div className='linksSection'>
            <Link className='links' to="/Login">Login</Link>
            <Link className='links' to="/Books">{t('books')}</Link>
            <Link className='links' to="/Loans">{t('loans')}</Link>
            
        </div>
      </nav>
    )
}
export default NavBarUser

