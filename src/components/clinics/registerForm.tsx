import { Input, Box, Button, VStack, Select } from '@chakra-ui/react'
// import { FormLabel } from "@chakra-ui/form-control";
// : React.ChangeEvent<HTMLInputElement>
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormErrorIcon } from '@chakra-ui/form-control'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../libs/axios'

import { GetStaticProps } from 'next'
export const Form = () => {
  const getPrefectures = async () => {
    try {
      const response = await axios.get('/api/prefectures')
      await setPrefecturesArray(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const [prefecturesArray, setPrefecturesArray] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  // console.log(prefectures)
  const {
    handleSubmit,
    register,
    // formState: { isSubmitting },
    // formState: { isSubmitted },
  } = useForm()
  useEffect(() => {
    getPrefectures()
  }, [])

  async function addClinic(formData: object) {
    return await axios
      .post('/api/add/clinic', {
        requestData: formData,
      })
      .then((response) => {
        if (response?.data?.result == true) {
          alert('クリニックを登録しました。')
        } else if (response?.data?.result == false) {
          // console.log(response)
          console.log(response?.data?.message)
          console.log(response?.data?.errors)
          alert('クリニックを登録できませんでした。')
        } else {
          // console.log(response)
          alert('通信エラーが発生いたしました。もう一度お確かめください')
        }
        setIsDisabled(false)
        return response?.data
      })
      .catch((error) => {
        setIsDisabled(false)
        console.error(error)
        alert('エラーが発生いたしました。もう一度お確かめください')
      })
  }

  function onSubmit(formData: object) {
    if (confirm('本当に登録しますか?')) {
      setIsDisabled(true)
      addClinic(formData)
    } else {
      alert('登録しません')
    }
  }

  const test: boolean | undefined = true

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        {/* クリニックの種類 */}
        {/* <FormControl isInvalid={errors.category_type}> */}
        <FormControl>
          <FormLabel htmlFor="category_type">クリニックの種類</FormLabel>
          <Select id="category_type" {...register('category_type')}>
            <option>--</option>
            <option value="1">メンズエナル</option>
            <option value="2">あおばクリニック</option>
            <option value="3">Dr.COBA</option>
          </Select>
          {/* <FormErrorMessage>{errors.category_type && errors.category_type.message}</FormErrorMessage> */}
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        {/* 店舗名 */}
        <FormControl>
          <FormLabel htmlFor="clinic_name">店舗名</FormLabel>
          <Input id="clinic_name" placeholder="クリニック名" {...register('clinic_name')} />
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        {/* 都道府県 */}
        <FormControl>
          <FormLabel htmlFor="prefecture_cd">都道府県</FormLabel>
          <Select id="prefecture_cd" {...register('prefecture_cd')}>
            {/* map Version */}
            <option>--</option>
            {prefecturesArray.map((item, i) => (
              <option value={item.category_key} key={item.id}>
                {item.category_value}
              </option>
            ))}
          </Select>
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        {/* クリニックの住所 */}
        {/* <FormControl isInvalid={errors.clinic_address}> */}
        <FormControl>
          <FormLabel htmlFor="clinic_address">クリニックの住所</FormLabel>
          <Input id="clinic_address" placeholder="クリニックの住所" {...register('clinic_address')} />
          {/* <FormErrorMessage>{errors.clinic_address && errors.clinic_address.message}</FormErrorMessage> */}
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        {/* 緯度 */}
        {/* <FormControl isInvalid={errors.latitude}> */}
        <FormControl>
          <FormLabel htmlFor="latitude">緯度</FormLabel>
          <Input id="latitude" placeholder="緯度" {...register('latitude')} />
          {/* <FormErrorMessage>{errors.latitude && errors.latitude.message}</FormErrorMessage> */}
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        {/* 経度 */}
        {/* <FormControl isInvalid={errors.longitude}> */}
        <FormControl>
          <FormLabel htmlFor="longitude">経度</FormLabel>
          <Input id="longitude" placeholder="経度" {...register('longitude')} />
          {/* <FormErrorMessage>{errors.longitude && errors.longitude.message}</FormErrorMessage> */}
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>
        <Button
          isLoading={isDisabled}
          type="submit"
          background="blue.300"
          color="white"
          _hover={{ background: 'blue.400' }}
        >
          登録
        </Button>
      </VStack>
    </form>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   // export async function getStaticProps() でも同じ
//   // const res = await fetch(`https://.../data`)
//   // const posts = await res.json()
//   // Call an external API endpoint to get posts
//   const res = await fetch('http://localhost:8888/api/prefectures')
//   console.log(res)
//   const prefectures: object = await res.json()
//   console.log(prefectures)

//   if (!prefectures) {
//     return {
//       notFound: true,
//     }
//   }

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       prefectures,
//     },
//   }
// }
