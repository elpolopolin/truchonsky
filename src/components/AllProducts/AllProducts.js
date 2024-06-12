import React from 'react'
import './allproducts.css'
import ProductCard from '../Product/ProductCard';

const AllProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
      oldPrice: 150,
      image1: 'https://acdn.mitiendanube.com/stores/001/490/877/products/trapstar-cyan-atras-fp-1-376f21a478c098065217024143772360-1024-1024.webp',
      image2: 'https://acdn.mitiendanube.com/stores/001/490/877/products/img_0777-99b1309c1cac607ac916981007619856-640-0-d1a8d6435bf760f7fd17007609153890-640-0.webp',
      stock: 20,
    },{
      id: 2,
      name: 'Producto 2',
      price: 1212,
      oldPrice: 1500,
      image1: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif?2254a',
      image2: 'https://i.pinimg.com/736x/61/a3/f7/61a3f7f2d6b126a6920f070756b2b147.jpg',
      stock: 20,
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 1212,
      oldPrice: 1500,
      image1: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif?2254a',
      image2: 'https://i.pinimg.com/736x/61/a3/f7/61a3f7f2d6b126a6920f070756b2b147.jpg',
      stock: 20,
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 1212,
      oldPrice: 1500,
      image1: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif?2254a',
      image2: 'https://i.pinimg.com/736x/61/a3/f7/61a3f7f2d6b126a6920f070756b2b147.jpg',
      stock: 20,
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 1212,
      oldPrice: 1500,
      image1: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif?2254a',
      image2: 'https://i.pinimg.com/736x/61/a3/f7/61a3f7f2d6b126a6920f070756b2b147.jpg',
      stock: 20,
    },
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
      oldPrice: 150,
      image1: 'https://acdn.mitiendanube.com/stores/001/490/877/products/trapstar-cyan-atras-fp-1-376f21a478c098065217024143772360-1024-1024.webp',
      image2: 'https://acdn.mitiendanube.com/stores/001/490/877/products/img_0777-99b1309c1cac607ac916981007619856-640-0-d1a8d6435bf760f7fd17007609153890-640-0.webp',
      stock: 20,
    }
    ,
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
      oldPrice: 150,
      image1: 'https://acdn.mitiendanube.com/stores/001/490/877/products/trapstar-cyan-atras-fp-1-376f21a478c098065217024143772360-1024-1024.webp',
      image2: 'https://acdn.mitiendanube.com/stores/001/490/877/products/img_0777-99b1309c1cac607ac916981007619856-640-0-d1a8d6435bf760f7fd17007609153890-640-0.webp',
      stock: 20,
    },
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
      oldPrice: 150,
      image1: 'https://acdn.mitiendanube.com/stores/001/490/877/products/trapstar-cyan-atras-fp-1-376f21a478c098065217024143772360-1024-1024.webp',
      image2: 'https://acdn.mitiendanube.com/stores/001/490/877/products/img_0777-99b1309c1cac607ac916981007619856-640-0-d1a8d6435bf760f7fd17007609153890-640-0.webp',
      stock: 20,
    }
    // Agrega más productos aquí...
  ];
  return (
  
      <div className="products-container">
      <div className="products-header">
        <span className="category">Categoría</span>
        <span className="filter">Filtrar</span>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
      
  )
}

export default AllProducts