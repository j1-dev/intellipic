'use client';
import CryptoJS, { AES } from 'crypto-js';

export const encryptData = (name: string, data: any) => {
  const encrypted = AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_SECRET_KEY! || ''
  ).toString();
  localStorage.setItem(name, encrypted);
};

export const decryptData = (name: any) => {
  const encrypted = localStorage.getItem(name) || '';
  const decrypted = AES.decrypt(
    encrypted,
    process.env.NEXT_PUBLIC_SECRET_KEY! || ''
  ).toString(CryptoJS.enc.Utf8);
  if (decrypted == '') {
    return null;
  }
  return decrypted;
};
