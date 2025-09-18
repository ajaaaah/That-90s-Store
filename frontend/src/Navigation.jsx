import './Navigation.css'
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}