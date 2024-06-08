
import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import {  useState } from 'react';

function BookAdd(){

    const apiClient = useApi();

        


    
        const [title, setTitle] = useState('');
        const [isbn, setIsbn] = useState('');
        const [author, setAuthor] = useState('');
        const [publisher, setPublisher] = useState('');
        const [year, setYear] = useState('');
        const [availableCopies, setAvailableCopies] = useState('');

    const handleSave = async () => {
        const data = {
            title,
            isbn,
            author,
            publisher,
            year ,
            availableCopies 
        };
        console.log(data)

        
        const response = await apiClient.addBook(data);

        if (response.success) {
            alert('Book added successfully!');
        } else {
            alert('Failed to add book');
        }
    };

    return(
        <div>


            <NavBar/>


            <div className='Home'>
            
            <h1>Add Book:</h1>

            <h2>Title:</h2>
            <input value={title}  onChange={(e) => setTitle(e.target.value)} />

            <h2>ISBN:</h2>
            <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />

            <h2>Author:</h2>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />

            <h2>Publisher:</h2>
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} />

            <h2>Year:</h2>
            <input value={year} type="number" onChange={(e) => setYear(e.target.value)}/>

            <h2>Availible Copies:</h2>
            <input value={availableCopies} type="number" onChange={(e) => setAvailableCopies(e.target.value)}/>

            <button onClick={handleSave}>Save</button>
            </div>



        </div>
    )
}

export default BookAdd