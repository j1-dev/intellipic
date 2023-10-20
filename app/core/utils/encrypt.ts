import CryptoJS from 'crypto-js';

const encryptData = (name: string, data: any) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.SECRET_KEY! as string
  ).toString();
  localStorage.setItem(name, encrypted);
};

const decryptData = (name: string) => {
  const encrypted = localStorage.getItem(name) || '';
  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    process.env.SECRET_KEY! as string
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};
