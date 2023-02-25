// import React, { useEffect } from 'react';

// import * as React from 'react'
import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import axios from '../../libs/axios'
import {
  ChakraProvider,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, //utility hooks の一つ
} from '@chakra-ui/react'
import { Form } from '../../components/clinics/registerForm'

interface HomeProps {
  prefectures: Record<string, any>
}

// export default function Home({ prefecturesTest }: HomeProps) {
export default function Home() {
  // console.log(prefectures)
  const { isOpen, onClose, onOpen } = useDisclosure()
  // const prefectures: {} = {}
  // useEffect(() => {
  // axios.get('/api/books').then((res) => {
  //   // const data = res.data
  //   // console.log(data)
  //   const data = res.data
  //   console.log(data)
  // })
  // axios
  //   .get('/api/prefectures')
  //   .then((response) => {
  //     const data1 = response.data
  //     console.log(data1)
  //     return JSON.parse(JSON.stringify(data1))
  //     // const data = res.data
  //   })
  //   .catch((error) => {
  //     const data2 = error
  //     console.log(data2)
  //     return JSON.parse(JSON.stringify(data2))
  //   })
  // }, [])

  return (
    <ChakraProvider>
      <Button onClick={onOpen}>クリニックを登録する</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>クリニック登録フォーム</ModalHeader>
          <ModalBody>
            {/* <Form prefecturesTest={prefecturesTest} /> */}
            <Form />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

// export const getStaticProps: GetStaticProps = async () => {

// const apiSubmit = async () => {
//   return await axios
//     .get('/api/books')
//     .then((response) => {
//       const data = response.data
//       return JSON.parse(JSON.stringify(data))
//     })
//     .catch((error) => {
//       const data = error
//       return JSON.parse(JSON.stringify(data))
//     })
// }
// axios.get('/api/books').then((res) => {
//   // const data = res.data
//   // console.log(data)
//   const data = res.data
//   console.log(data)
// })
// const prefecturesTest: HomeProps = await apiSubmit()

// if (!prefecturesTest) {
//   return {
//     notFound: true,
//   }
// }

// return {
//   props: {
//     prefecturesTest,
//   },
// }

// }
