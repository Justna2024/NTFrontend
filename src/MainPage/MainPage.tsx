
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';
import NavBarUser from '../NavBar/NavBarUser';
import { useApi } from '../api/ApiProvider';
import './MainPage.css';
function MainPage(){

    const apiClient = useApi();
    const {t} = useTranslation();
    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    return(
        <div>
            <NavBarUser/>
            <div className='Home'>
            <h1>{t('welcome')}</h1>
            <h2>{t('navigation bar')}</h2>
            </div>
        </div>
    )
}

export default MainPage