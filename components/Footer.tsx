'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';

const Footer = () => {
  const t = useTranslations('Home');
  return (
    <footer className="pt-8 text-center bg-white dark:bg-black text-black dark:text-white transition-all relative h-24">
      <hr className="-translate-y-7 border border-black dark:border-white transition-all" />
      <div className="max-w-screen-lg mx-auto px-8 flex justify-start ">
        <ul className="flex justify-start space-x-4 absolute top-5">
          <li>
            <Link href="/faq">FAQs</Link>
          </li>
          <li>
            <Link href="/tos">Terms</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
        <ul className="flex justify-start lg:justify-end absolute bottom-5">
          <li>
            <Link href="#">
              <FaInstagram size={24} className="mr-3" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FaGithub size={24} className="mx-3" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FaDiscord size={24} className="mx-3" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FaLinkedin size={24} className="mx-3" />
            </Link>
          </li>
        </ul>
        <ThemeToggle />
        <LangToggle />
      </div>
    </footer>
  );
};

export default Footer;
