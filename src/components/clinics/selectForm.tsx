import { Input, Box, Button, VStack, Select } from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormErrorIcon } from '@chakra-ui/form-control'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../libs/axios'

import { GetStaticProps } from 'next'
export const SelectForm = (props) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const { handleSubmit, register } = useForm()

  async function searchClinic(formData: object) {
    let category_type = formData?.category_type
    return await axios
      .post('/api/clinic/list/' + category_type, {
        requestData: formData,
      })
      .then((response) => {
        if (response?.data?.result == true) {
          alert('クリニックを検索しました。')
        } else if (response?.data?.result == false) {
          console.log(response?.data?.message)
          console.log(response?.data?.errors)
          alert('クリニックを検索できませんでした。')
        } else {
          alert('通信エラーが発生いたしました。もう一度お確かめください')
        }
        alert('検索結果')
        console.log(response?.data?.response_data)
        props._setSpot(response?.data?.response_data)
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
      console.log(formData)
      setIsDisabled(true)
      searchClinic(formData)
  }

  const test: boolean | undefined = true

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        {/* クリニックの種類 */}
        {/* <FormControl isInvalid={errors.category_type}> */}
        <FormControl>
          {/* <Button colorScheme="blue" mr={3} onClick={()=>{
            props.onClose()
            props._setIsScreenState(true)
            }}>
            Close
          </Button> */}
          <FormLabel htmlFor="category_type">クリニックの種類</FormLabel>
          <Select id="category_type" {...register('category_type')} value={1}>
            <option value="1">メンズエナル</option>
            <option value="2">あおばクリニック</option>
            <option value="3">Dr.COBA</option>
          </Select>
          {/* <FormErrorMessage>{errors.category_type && errors.category_type.message}</FormErrorMessage> */}
          {/* <FormErrorMessage>error</FormErrorMessage> */}
        </FormControl>

        <Button
          isLoading={isDisabled}
          type="submit"
          background="blue.300"
          color="white"
          _hover={{ background: 'blue.400' }}
        >
          検索
        </Button>
      </VStack>
    </form>
  )
}
