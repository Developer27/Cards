/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {

  return (
    <nav className='navbar'>
      <div className="nav-btns-wparrer">
        <Link to="/" className="nav-link"><button className="nav-btn">Home</button></Link>
        <Link to='/train' className="nav-link"><button onClick={props.setGameHandler} className="nav-btn">Train</button></Link> 
      </div>
    </nav>
  )
}
