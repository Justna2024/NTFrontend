
import { t } from 'i18next';
import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import './MainPage.css';
import { useTranslation } from 'react-i18next';
function MainPageAdmin(){

    const apiClient = useApi();
    const {t} = useTranslation();

    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    return(
        <div>
            <NavBar/>
            <div className='Home'>
            <h1>Admin</h1>
            <h2>{t('navigation bar')}</h2>
            </div>
        </div>
    )
}

export default MainPageAdmin