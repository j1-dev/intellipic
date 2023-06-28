'use client';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface Product {
  id: number;
  name: string;
  price: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Entrenamiento de un modelo',
    price: '€3 por modelo',
    features: ['Característica 1', 'Característica 2', 'Característica 3']
  },
  {
    id: 2,
    name: 'Generación de 10 imágenes',
    price: '€1',
    features: ['Característica 1', 'Característica 2', 'Característica 3']
  },
  {
    id: 3,
    name: 'Generación de 25 imágenes',
    price: '€2',
    features: ['Característica 1', 'Característica 2', 'Característica 3']
  },
  {
    id: 4,
    name: 'Generación de 50 imágenes',
    price: '€3',
    features: ['Característica 1', 'Característica 2', 'Característica 3']
  },
  {
    id: 5,
    name: 'Generación de 100 imágenes',
    price: '€7.5',
    features: ['Característica 1', 'Característica 2', 'Característica 3']
  }
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Tienda 💰</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Entrenamiento de un modelo (2x2) */}
          <div
            key={products[0].id}
            className="cursor-pointer rounded-lg dark:shadow-slate-300 hover:shadow-xl border border-black dark:border-white col-span-2 row-span-2 p-6 transition-all ease-in-out duration-75 hover:scale-[1.03] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            onClick={() => handleProductClick(products[0])}
          >
            <h3 className="text-xl font-bold mb-2">{products[0].name}</h3>
            <p>{products[0].price}</p>
          </div>

          {/* Generación de X imágenes (1x1) */}
          {products.slice(1).map((product) => (
            <div
              key={product.id}
              className="cursor-pointer rounded-lg dark:shadow-slate-300 hover:shadow-xl border border-black dark:border-white col-span-1 row-span-1 p-6 transition-all ease-in-out duration-75 hover:scale-[1.03] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <Dialog
          open={true}
          onClose={closeModal}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-black border border-black dark:border-white z-50 w-full max-w-lg p-6 rounded-lg transition-all">
              <Dialog.Title className="text-2xl font-bold mb-4">
                {selectedProduct.name}
              </Dialog.Title>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Precio:</h3>
                <p>{selectedProduct.price}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Características:</h3>
                <ul>
                  {selectedProduct.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Agregar al Carrito
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
