'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';

const Footer = () => {
  const locale = useLocale();
  return (
    <footer className="pt-8 text-center bg-white dark:bg-black text-black dark:text-white transition-all relative h-24">
      <hr className="-translate-y-7 border border-black dark:border-white transition-all" />
      <div className="max-w-screen-lg mx-auto px-5 flex justify-start ">
        <ul className="flex justify-start space-x-4 absolute top-8 xs:top-5">
          <li>
            <Link href="/faq">FAQs</Link>
          </li>
          <li>
            <Link href="/tos">{locale === 'es' ? 'Términos' : 'Terms'}</Link>
          </li>
          <li>
            <Link href="mailto:support@intellipic.es">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </Link>
          </li>
        </ul>
        <ul className="flex justify-start lg:justify-end absolute bottom-0 xs:bottom-5 translate-y-2 xs:translate-y-0">
          <li>
            <Link href="https://www.instagram.com/intelli_pic/">
              <FaInstagram size={24} className="mr-3" />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/channel/UCkx5FG7isiM1GntBhF5QzMQ">
              <FaYoutube size={24} className="mx-3" />
            </Link>
          </li>
          <li>
            <Link href="https://discord.gg/kyccV6hD">
              <FaDiscord size={24} className="mx-3" />
            </Link>
          </li>
          <li>
            <Link href="https://www.tiktok.com/@intellipic">
              <FaTiktok size={24} className="mx-3" />
            </Link>
          </li>
        </ul>
        <div className="absolute right-2">
          <div className="flex flex-col-reverse xs:flex-row">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
