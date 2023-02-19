import { Input, Box, Button, VStack, Select } from '@chakra-ui/react'
// import { FormLabel } from "@chakra-ui/form-control";
// : React.ChangeEvent<HTMLInputElement>
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, FormErrorIcon } from '@chakra-ui/form-control'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }
  // const [input, setInput] = useState("");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setInput(e.target.value);

  // const isError = input === "";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        {/* クリニックの種類 */}
        <FormControl isInvalid={errors.clinicCode}>
          <FormLabel htmlFor="clinicCode">クリニックの種類</FormLabel>
          <Select
            id="clinicCd"
            {...register('clinicCode', {
              required: '必須項目です。',
            })}
          >
            <option>--</option>
            <option value="1">メンズエナル</option>
            <option value="2">あおばクリニック</option>
            <option value="3">Dr.COBA</option>
          </Select>
          <FormErrorMessage>{errors.clinicCode && errors.clinicCode.message}</FormErrorMessage>
        </FormControl>
        {/* 店舗名 */}
        <FormControl isInvalid={errors.storeName}>
          <FormLabel htmlFor="storeName">店舗名</FormLabel>
          <Input
            id="storeName"
            placeholder="クリニック名"
            {...register('storeName', {
              required: '必須項目です。',
              minLength: {
                value: 2,
                message: '2文字以上で登録してください。',
              },
            })}
          />
          <FormErrorMessage>{errors.storeName && errors.storeName.message}</FormErrorMessage>
        </FormControl>
        {/* 都道府県 */}
        <FormControl isInvalid={errors.clinicPrefecture}>
          <FormLabel htmlFor="clinicPrefectureCode">都道府県</FormLabel>
          <Select
            id="clinicPrefecture"
            {...register('clinicPrefecture', {
              required: '必須項目です。',
            })}
          >
            {/* map Version */}
            {/* {gender.map((item, i) => (
                            <option value={item.key} key={item.key}>
                                {item.label}
                            </option>
                        ))} */}
            <option>--</option>
            <option value="1">北海道</option>
            <option value="2">青森県</option>
            <option value="3">岩手県</option>
            <option value="4">宮城県</option>
            <option value="5">秋田県</option>
            <option value="6">山形県</option>
            <option value="7">福島県</option>
            <option value="8">茨城県</option>
            <option value="9">栃木県</option>
            <option value="10">群馬県</option>
            <option value="11">埼玉県</option>
            <option value="12">千葉県</option>
            <option value="13">東京都</option>
            <option value="14">神奈川県</option>
            <option value="15">新潟県</option>
            <option value="16">富山県</option>
            <option value="17">石川県</option>
            <option value="18">福井県</option>
            <option value="19">山梨県</option>
            <option value="20">長野県</option>
            <option value="21">岐阜県</option>
            <option value="22">静岡県</option>
            <option value="23">愛知県</option>
            <option value="24">三重県</option>
            <option value="25">滋賀県</option>
            <option value="26">京都府</option>
            <option value="27">大阪府</option>
            <option value="28">兵庫県</option>
            <option value="29">奈良県</option>
            <option value="30">和歌山県</option>
            <option value="31">鳥取県</option>
            <option value="32">島根県</option>
            <option value="33">岡山県</option>
            <option value="34">広島県</option>
            <option value="35">山口県</option>
            <option value="36">徳島県</option>
            <option value="37">香川県</option>
            <option value="38">愛媛県</option>
            <option value="39">高知県</option>
            <option value="40">福岡県</option>
            <option value="41">佐賀県</option>
            <option value="42">長崎県</option>
            <option value="43">熊本県</option>
            <option value="44">大分県</option>
            <option value="45">宮崎県</option>
            <option value="46">鹿児島県</option>
            <option value="47">沖縄県</option>
          </Select>
          <FormErrorMessage>{errors.clinicPrefecture && errors.clinicPrefecture.message}</FormErrorMessage>
        </FormControl>
        {/* クリニックの住所 */}
        <FormControl isInvalid={errors.clinicAddress}>
          <FormLabel htmlFor="clinicAddress">クリニックの住所</FormLabel>
          <Input
            id="clinicAddress"
            placeholder="クリニックの住所"
            {...register('clinicAddress', {
              required: '必須項目です。',
              minLength: {
                value: 8,
                message: '8文字以上で登録してください。',
              },
            })}
          />
          <FormErrorMessage>{errors.clinicAddress && errors.clinicAddress.message}</FormErrorMessage>
        </FormControl>
        {/* 緯度 */}
        <FormControl isInvalid={errors.latitude}>
          <FormLabel htmlFor="latitude">緯度</FormLabel>
          <Input
            id="latitude"
            placeholder="緯度"
            {...register('latitude', {
              required: '必須項目です。',
              minLength: {
                value: 6,
                message: '6文字以上で登録してください。',
              },
            })}
          />
          <FormErrorMessage>{errors.latitude && errors.latitude.message}</FormErrorMessage>
        </FormControl>
        {/* 経度 */}
        <FormControl isInvalid={errors.longitude}>
          <FormLabel htmlFor="longitude">経度</FormLabel>
          <Input
            id="longitude"
            placeholder="経度"
            {...register('longitude', {
              required: '必須項目です。',
              minLength: {
                value: 6,
                message: '6文字以上で登録してください。',
              },
            })}
          />
          <FormErrorMessage>{errors.longitude && errors.longitude.message}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isSubmitting}
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
