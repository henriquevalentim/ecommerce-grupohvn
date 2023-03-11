import { useState } from 'react'
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
            name={product.name}
            description={product.description}
            price={product.price}
            image_url={product.imageUrl}
          />
        ))}
      </div>
    </>
  )
}
