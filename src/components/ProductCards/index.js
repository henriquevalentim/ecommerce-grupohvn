import { useEffect, useState } from 'react'
import api from '../../utils/api'
import ProductCard from '../ProductCard'

export default function ProductCards() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/product')
      setProducts(response.data)
    }
    getProducts()
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            code={product.code}
            name={product.name}
            price={product.price}
            urlImage={product.urlImage}
          />
        ))}
      </div>
    </>
  )
}
