'use client';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { supabase } from '@/app/supabaseClient';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: string;
  priceId: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 'prod_OAGAukWxQfrOVG',
    name: 'Entrenamiento de un modelo',
    price: '€3 por modelo',
    priceId: 'price_1NOPqWIsZGNqsWfQQdddYGAx',
    features: ['Entrena un modelo', 'Genera 20 imagenes']
  },
  {
    id: 'prod_OAGCBKSOdimjwS',
    name: 'Generación de 10 imágenes',
    price: '€1',
    priceId: 'price_1NNvgXIsZGNqsWfQVLzT0EOi',
    features: ['Genera 10 imágenes', 'Prompts mejorados por IA']
  },
  {
    id: 'prod_OAGD9THFNk3NAD',
    name: 'Generación de 30 imágenes',
    price: '€2',
    priceId: 'price_1NNvhUIsZGNqsWfQGsXojAbB',
    features: ['Genera 30 imágenes', 'Prompts mejorados por IA']
  },
  {
    id: 'prod_OAGEvgK2m6HATL',
    name: 'Generación de 50 imágenes',
    price: '€3',
    priceId: 'price_1NNviMIsZGNqsWfQayaCdTZ7',
    features: ['Genera 50 imágenes', 'Prompts mejorados por IA']
  },
  {
    id: 'prod_OAGFn5wQimhFvz',
    name: 'Generación de 100 imágenes',
    price: '€7.5',
    priceId: 'price_1NNvjMIsZGNqsWfQvWf6TDl0',
    features: ['Genera 100 imágenes', 'Prompts mejorados por IA']
  }
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sub = async () => {
      supabase.auth.getSession().then((s) => {
        console.log(s?.data?.session?.user.id);
        setUser(s?.data?.session?.user);
      });
    };
    sub();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = async (e: any) => {
    e.preventDefault();
    if (user) {
      const { data } = await axios.post(
        '/api/shop/checkout/',
        {
          priceId: selectedProduct?.priceId,
          userId: user.id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      window.location.assign(data);
    } else {
      toast.error('Wait a second');
    }
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
                  className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all"
                  onClick={handleBuyNow}
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
