import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import axios from "../libs/axios";
import React, { useEffect } from 'react';

import RegisterPage from '../components/atomic/Pages/Auth/RegisterPage'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    axios.get("/api/books").then((res) => {
    const data = res.data;
    console.log(data);
   });
  }, []);
  return (
    <>
      <RegisterPage />
    </>
  )
}
