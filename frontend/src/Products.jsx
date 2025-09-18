import './Products.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="all-items-row">
      {products.map(product => (
        <div className="all-items" key={product._id}>
          <Link to={`/checkout/${product._id}`}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
          </Link>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}