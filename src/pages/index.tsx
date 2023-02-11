import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import axios from "../libs/axios";
import React, { useEffect } from 'react';

// import { useHandleLogout } from '../components/shared/function/Auth/AuthLisnter'

// const handleLogout = useHandleLogout()


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
//   useEffect(() => {
//     axios.get("/api/books").then((res) => {
//     const data = res.data;
//     console.log(data);
//    });
//   }, []);
  return (
    <>
    <h1>Home</h1>
    </>
  )
}
