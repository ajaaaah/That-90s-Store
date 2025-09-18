import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import './ProductCheckoutPage.css'

export default function ProductCheckoutPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err))
  }, [productId])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="product-details-wrapper">
      <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>${product.price}</h3>
        <button>Add to cart</button>
        </div>
      </div>
    </div>
  )
}