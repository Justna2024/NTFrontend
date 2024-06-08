
import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import './MainPage.css';
function MainPage(){

    const apiClient = useApi();

    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    return(
        <div>
            <NavBar/>
            <div className='Home'>
            <h1>Welcome to the Library</h1>
            <h2>View books and loans using the navigation bar</h2>
            </div>
        </div>
    )
}

export default MainPage