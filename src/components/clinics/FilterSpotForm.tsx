import { Input, Box, Button, VStack, Select, List, ListItem, ListIcon } from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormErrorIcon } from '@chakra-ui/form-control'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../libs/axios'
import { FaPlaceOfWorship } from 'react-icons/fa'

import { GetStaticProps } from 'next'
export const FilterSpotForm = (props) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [isSubmittedData, setIsSubmittedData] = useState(false)
  const [searchRadius, setSearchRadius] = useState(10)
  const confirmDistance = (spot, num) => {
    console.log(spot)
    let targetPlace = { lat: spot.latitude, lng: spot.longitude }
    console.log('execute confirmDistance')
    console.log(props.myLocation)
    console.log(targetPlace)
    let searchRadius2 = num
    console.log(searchRadius2)
    return calcGeoDistance(targetPlace, props.myLocation) <= searchRadius2
  }
  // km算出
  const calcGeoDistance = (position1: google.maps.LatLngLiteral, position2: google.maps.LatLngLiteral) => {
    var R = 6371.071 // Radius of the Earth in kilometers
    var rlat1 = position1.lat * (Math.PI / 180) // Convert degrees to radians
    var rlat2 = position2.lat * (Math.PI / 180) // Convert degrees to radians
    var difflat = rlat2 - rlat1 // Radian difference (latitudes)
    var difflon = (position2.lng - position1.lng) * (Math.PI / 180) // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
        )
      )

    return d
  }
  // 北海道
  // const myPlace = {
  //   lat: 43.7324393,
  //   lng: 142.1273298,
  // }

  // const [searchSpots, setSearchSpots] = useState([])
  const [searchSpots, setSearchSpots] = useState(props.spots)
  const [isFormatError, setIsFormatError] = useState(false)
  const { handleSubmit, register } = useForm()

  function searchClinicByRadius(formData: object) {
    console.log('execute searchClinicByRadius')
    console.log(formData.search_distance)
    console.log(Number(formData.search_distance))
    setSearchRadius(Number(formData.search_distance))
    const num = Number(formData.search_distance)
    const spots2 = (spots) => {
      return spots.filter((spot) => confirmDistance(spot, num))
    }
    setSearchSpots(spots2(searchSpots))
    setIsSubmittedData(true)

    // let category_type = formData?.category_type
    // return await axios
    //   .post('/api/clinic/list/' + category_type, {
    //     requestData: formData,
    //   })
    //   .then((response) => {
    //     if (response?.data?.result == true) {
    //       alert('クリニックを検索しました。')
    //     } else if (response?.data?.result == false) {
    //       console.log(response?.data?.message)
    //       console.log(response?.data?.errors)
    //       alert('クリニックを検索できませんでした。')
    //     } else {
    //       alert('通信エラーが発生いたしました。もう一度お確かめください')
    //     }
    //     alert('検索結果')
    //     console.log(response?.data?.response_data)
    //     props._setSpot(response?.data?.response_data)
    //     setIsDisabled(false)
    //     setIsSubmittedData(true)
    //     return response?.data
    //   })
    //   .catch((error) => {
    //     setIsDisabled(false)
    //     console.error(error)
    //     alert('エラーが発生いたしました。もう一度お確かめください')
    //   })
  }

  function onSubmit(formData: object) {
    console.log('onSubmit')
    console.log(formData)
    const targetRadius = formData?.search_distance
    // 多重送信防止処理
    const searchBotton = document.getElementById('searchBotton')
    searchBotton.disabled = true
    if (Math.sign(targetRadius) != 1) {
      console.log(Math.sign(targetRadius)+'は、正の整数ではありません')
      setIsFormatError(true)
      let timerId = setTimeout(() => setIsFormatError(false), 4000)
      searchBotton.disabled = false
      return
    }
    searchClinicByRadius(formData)
    searchBotton.disabled = false
    // setIsSubmittedData(true)
    // setSearchRadius(formData.search_distance)
    // setIsDisabled(true)
    // searchClinic(formData)
  }

  const test: boolean | undefined = true

  return (
    <>
      {isSubmittedData == false && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            {/* クリニックの種類 */}
            {/* <FormControl isInvalid={errors.category_type}> */}
            <FormControl isInvalid={isFormatError}>
              <FormLabel htmlFor="search_distance">現在地からの距離(km)</FormLabel>
              <Input id="search_distance" placeholder="100" {...register('search_distance')} />
              {/* <FormErrorMessage>{errors.category_type && errors.category_type.message}</FormErrorMessage> */}
              <FormErrorMessage>正しい数値を入力して下さい。</FormErrorMessage>
            </FormControl>

            <Button
              isLoading={isDisabled}
              type="submit"
              background="blue.300"
              color="white"
              id="searchBotton"
              _hover={{ background: 'blue.400' }}
            >
              検索
            </Button>
          </VStack>
        </form>
      )}
      {isSubmittedData == true && (
        <>
          <div> 半径{searchRadius}km での検索結果</div>
          <br />
          {searchSpots.length > 0 && (
            <List spacing={3}>
              {searchSpots.map((spot, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaPlaceOfWorship} color="green.500" />
                  {spot.clinic_name}
                </ListItem>
              ))}
            </List>
          )}
          {searchSpots.length <= 0 && (
            <h1>該当項目がありませんでした。</h1>
          )}
        </>
      )}
    </>
  )
}
