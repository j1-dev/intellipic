'use client';
import { Dialog } from '@headlessui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { userDataType } from '../[userId]/page';

interface Product {
  id: string;
  name: string;
  price: string;
  priceId: string;
  features: string[];
}

export default function ShopPage() {
  const t = useTranslations('ShopPage');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);
  const [models] = useState<any>(() => {
    let data = localStorage.getItem('models') || '';
    let mod = data.split('(sep)');
    let arr = [] as Array<Object>;
    mod.map((m) => {
      if (m) {
        arr.push(JSON.parse(m));
      }
    });
    return arr;
  });
  const supabase = createClientComponentClient();

  const products: Product[] = [
    {
      id: 'prod_OcmbeX4AJFkVoF',
      name: t('modelTraining'),
      price: '€4',
      priceId: 'price_1NpX2XIsZGNqsWfQEfpNM7lv',
      features: [t('modelTrainingInfo'), t('generate20Title')]
    },
    {
      id: 'prod_OcmbMwLY3PSKkd',
      name: t('generate10Title'),
      price: '€1',
      priceId: 'price_1NpX23IsZGNqsWfQwulR8Pie',
      features: [t('generate10Info'), t('extraInfo')]
    },
    {
      id: 'prod_OcmaoJNRfbjwqk',
      name: t('generate25Title'),
      price: '€2',
      priceId: 'price_1NpX1VIsZGNqsWfQ6Pq3YcNa',
      features: [t('generate25Info'), t('extraInfo')]
    },
    {
      id: 'prod_OcmZDNFgWpbV65',
      name: t('generate40Title'),
      price: '€3',
      priceId: 'price_1NpX0oIsZGNqsWfQ6doXHr1o',
      features: [t('generate40Info'), t('extraInfo')]
    },
    {
      id: 'prod_OcmY6zvRL63Zhr',
      name: t('generate100Title'),
      price: '€7',
      priceId: 'price_1NpWzbIsZGNqsWfQb9RLZM8S',
      features: [t('generate100Info'), t('extraInfo')]
    }
  ];

  useEffect(() => {
    const sub = async () => {
      supabase.auth.getSession().then((s) => {
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
        <h2 className="text-4xl font-bold mb-4">{t('shop')}</h2>
        {models.length === 0 ? (
          <div className="max-w-screen-sm w-full h-full m-auto">
            <div
              key={products[0].id}
              className="cursor-pointer rounded-lg dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white py-12 px-6 transition-all ease-in-out duration-75 hover:scale-[1.03] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              onClick={() => handleProductClick(products[0])}
            >
              <h3 className="text-xl font-bold mb-2">{products[0].name}</h3>
              <p>{products[0].price}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer rounded-lg dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white col-span-1 row-span-1 p-6 transition-all ease-in-out duration-75 hover:scale-[1.03] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => handleProductClick(product)}
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        )}
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
                <h3 className="text-lg font-bold mb-2">{t('price')}</h3>
                <p>{selectedProduct.price}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{t('features')}</h3>
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
                  {t('buyNow')}
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
