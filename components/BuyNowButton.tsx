import React from 'react';
import { Product } from '@/app/[locale]/dashboard/shop/page';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import toast from 'react-hot-toast';

const BuyNowButton = (userData: any) => {
  const t = useTranslations('ShopPage');

  const product: Product = {
    // id: 'prod_OcmbeX4AJFkVoF',
    id: 'prod_OAGAukWxQfrOVG',
    name: t('modelTraining'),
    price: '1.99€',
    // priceId: 'price_1NpX2XIsZGNqsWfQEfpNM7lv',
    priceId: 'price_1OM69kIsZGNqsWfQrj6jsAKA',
    features: [t('modelTrainingInfo'), t('generate20Title')]
  };

  const handleBuyNow = async (e: any) => {
    e.preventDefault();
    console.log(userData.userData.id);
    if (userData) {
      const { data } = await axios.post(
        '/api/shop/checkout/',
        {
          productId: product.id,
          priceId: product.priceId,
          userId: userData.userData.id
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
    <div
      key={product.id}
      className="text-left cursor-pointer rounded-lg dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white col-span-2 p-6 transition-all ease-in-out duration-75 hover:scale-[1.03] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
      onClick={handleBuyNow}
    >
      <h3 className="text-2xl xs:text-5xl font-bold m-4">{product.name}</h3>
      <p className="text-xl font-semibold m-4">{product.price}</p>
      <div className="m-4">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </div>
      <div className="p-3 bg-purple-200 text-purple-900 border-purple-900 rounded-full">
        {t('limitedTimeOffer')}
      </div>
    </div>
  );
};

export default BuyNowButton;
