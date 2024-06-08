import './NavBar.css';

function NavBar(){
    return(
      <nav className="navBar">
        <div>
        <h4>Library System &#128218;</h4>
        </div>
        <div className='linksSection'>
            <a className='links' href="/">Register</a>
            <a className='links' href="/Home">Home</a>
            <a className='links'href="/Books">Books</a>
            <a className='links' href="/Loans">Loans</a>
        </div>
      </nav>
    )
}
export default NavBar

