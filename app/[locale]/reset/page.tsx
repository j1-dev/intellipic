'use client';
import supabase from '@/app/core/clients/supabase';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

type passwordRequirements = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
};

export default function RecoveryPage() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState();
  const [requirements, setRequirements] = useState<passwordRequirements>({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false
  });
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const t = useTranslations('Reset');
  const router = useRouter();

  const handlePasswordChange = (e: any) => {
    let aux: passwordRequirements = {
      length: requirements?.length,
      lowercase: requirements?.lowercase,
      uppercase: requirements?.uppercase,
      number: requirements?.number
    };
    Object.keys(aux).map((key) => {
      switch (key) {
        case 'length':
          aux.length = password.length >= 8;
          break;
        case 'uppercase':
          aux.uppercase = /[A-Z]/.test(password);
          break;
        case 'lowercase':
          aux.lowercase = /[a-z]/.test(password);
          break;
        case 'number':
          aux.number = /\d/.test(password);
          break;
        default:
      }
    });
    setRequirements(aux);
    setPassword(e.target?.value);
  };

  const handleConfirmationChange = (e: any) => {
    setConfirmation(e.target?.value);
  };

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    if (passwordIsValid(password) && password === confirmation) {
      supabase.auth.updateUser({ password: password });
      toast.success(t('passwordRestablished'));
      router.push('login');
    } else if (!passwordIsValid(password)) {
      toast.error(t('InvalidPassword'));
    } else {
      toast.error(t('noMatch'));
    }
  };

  const passwordIsValid = (password: string) => {
    // Verificar cada requisito por separado
    const lengthRequirement = password.length >= 8;
    const uppercaseRequirement = /[A-Z]/.test(password);
    const lowercaseRequirement = /[a-z]/.test(password);
    const numberRequirement = /\d/.test(password);

    return (
      lengthRequirement &&
      uppercaseRequirement &&
      lowercaseRequirement &&
      numberRequirement
    );
  };

  return (
    <div>
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <Link className="inline-flex" href="/login">
            <BsArrowReturnLeft size={40} />
            <h1 className="text-4xl font-bold mx-4 -translate-y-1">
              Intellipic
            </h1>
          </Link>
        </nav>
      </header>
      <div className="flex-col max-w-screen-sm mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
        <div className="max-w-screen-xs border border-black dark:border-white rounded-lg m-auto py-6">
          <form
            onSubmit={handleResetPassword}
            className="text-left flex-col grid px-3 py-2"
          >
            <label className="text-3xl font-bold p-3">{email}</label>
            <label htmlFor="password" className="text-xl font-semibold p-3">
              {t('setPassword')}
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className="m-3 border-b-[1px] border-gray-300 focus:border-gray-500 outline-0 transition-all "
            />
            <div className="m-3" id="password-requirements">
              <p>Requisitos de la contraseña:</p>
              <ul>
                <li className={`${requirements.length ? 'hidden' : 'block'}`}>
                  Al menos 8 caracteres
                </li>
                <li
                  className={`${requirements.uppercase ? 'hidden' : 'block'}`}
                >
                  Una letra mayúscula
                </li>
                <li
                  className={`${requirements.lowercase ? 'hidden' : 'block'}`}
                >
                  Una letra minúscula
                </li>
                <li className={`${requirements.number ? 'hidden' : 'block'}`}>
                  Un número
                </li>
              </ul>
            </div>
            <label htmlFor="confirmation" className="text-xl font-semibold p-3">
              {t('setConfirmation')}
            </label>
            <input
              type="password"
              id="confirmation"
              onChange={handleConfirmationChange}
              className="m-3 border-b-[1px] border-gray-300 focus:border-gray-500 outline-0 transition-all "
            />
            <button
              className="w-max bg-green-600 text-white border-green-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded transition-all p-3 m-3"
              type="submit"
            >
              {t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
