// import { TextInput, Spacer } from 'components/atomic/Atoms'
import { useHandleLogin } from 'components/shared/function/Auth/AuthLisnter'
// import BasicButton from 'components/atomic/Atoms/Button/BasicButton'
// import BasicContainer from 'components/atomic/Atoms/Container/BasicContainer'
import React, { useCallback, useState } from 'react'
// import BasicHeadingThree from 'components/atomic/Atoms/Heading/BasicHeadingThree'
// import BasicLink from 'components/atomic/Atoms/Link/BasicLink'
import Link from 'next/link'
import { mapDatum} from 'components/atomic/Atoms/mapData'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin } = useHandleLogin()
  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  )

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [password]
  )
  console.log({mapDatum})
//   const arr = ["a","b","c"];
// let json_text = JSON.stringify(arr, undefined, 1);
// console.log({mapDatum})
// alert({json_text})
 

  return (
    <div className={'flex flex-col h-1/2 space-y-6 w-1/2 mx-auto mt-32 max-w-sm'}>
      <h1>ログイン画面</h1>
      <input
        onChange={inputEmail}
        placeholder="メールアドレス"
        required={true}
        type={'email'}
        value={email}
      />
      <input
        onChange={inputPassword}
        placeholder="パスワード"
        required={true}
        type={'password'}
        value={password}
      />
      {/* <Spacer className="h-20" /> */}
      <button
        className=""
        onClick={() => handleLogin(email, password)}
      >ログイン
      </button>
      {/* <Spacer className="h-20" /> */}
      <Link
        className=" text-blue-400 text-xs text-center"
        href={{
          pathname: '/register',
          query: null
        }}
      />
    </div>
  )
}

export default LoginPage