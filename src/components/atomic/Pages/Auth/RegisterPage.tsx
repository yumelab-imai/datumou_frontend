// import BasicLink from 'components/atomic/Atoms/Link/BasicLink'
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { useHandleRegister } from 'components/shared/function/Auth/AuthLisnter'
// import { Spacer, TextInput } from 'components/atomic/Atoms'
// import BasicContainer from 'components/atomic/Atoms/Container/BasicContainer'
// import BasicHeadingThree from 'components/atomic/Atoms/Heading/BasicHeadingThree'
// import BasicButton from 'components/atomic/Atoms/Button/BasicButton'
import Link from 'next/link'

const RegisterPage = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister } = useHandleRegister()

  const inputUserName = useCallback(
    (event: any) => {
      setUserName(event.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userName]
  )

  const inputEmail = useCallback(
    (event: any) => {
      setEmail(event.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  )

  const inputPassword = useCallback(
    (event: any) => {
      setPassword(event.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [password]
  )
  return (
    <div className={'flex flex-col h-1/2 space-y-6 w-1/2 mx-auto mt-32 max-w-sm'}>
      <h1>会員登録画面</h1>
      <input
        name='name'
        type={'text'}
        placeholder="ユーザー名"
        value={userName}
        className={''}
        onChange={inputUserName}
        required={true}
      />
      <input
        name='email'
        onChange={inputEmail}
        placeholder="メールアドレス"
        required={true}
        type={'email'}
        value={email}
      />
      <input
        name='password'
        onChange={inputPassword}
        placeholder="パスワード"
        required={true}
        type={'password'}
        value={password}
      />
      {/* <Spacer className="h-15" /> */}
      <button
        className=""
        onClick={() => handleRegister(userName, email, password)}
      >登録する</button>
      {/* <Spacer className="h-20" /> */}
      <Link
        className=" text-blue-400 text-xs text-center"
        href={{
          pathname: '/login',
          query: null
        }}
      />
    </div>
  )
}

export default RegisterPage