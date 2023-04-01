import { useEffect, useState } from 'react'
import api from '../../utils/api'
import ProductCard from '../ProductCard'

export default function ProductCards() {
  const [products, setProducts] = useState([
    {
      name: 'AAAAAA',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    },
    {
      name: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/400x300'
    }
  ])

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
            name={product.name}
            // description={product.description}
            price={product.price}
            urlImage={product.urlImage}
          />
        ))}
      </div>
    </>
  )
}
