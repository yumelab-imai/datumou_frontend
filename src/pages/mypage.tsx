import Head from 'next/head'
import axios from '../libs/axios'
import React, { useEffect, useMemo } from 'react'
import { mapDatum } from '../components/mapData'

import { GoogleMap as GoogleMapComponent, LoadScript } from '@react-google-maps/api'
import { FC } from 'react'
import { useJsApiLoader as UseJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { useState } from 'react'
import { Map, TypeBounds, markerLabel, TypeSpotList } from '../type/client/Map'

let mapDatumTest = mapDatum[0]
let spotList = mapDatumTest.spots

// const getPrefectures = async () => {
//   try {
//     const response = await axios.get('/api/prefectures')
//     await setPrefecturesArray(response.data)
//   } catch (error) {
//     console.error(error)
//   }
// }

// const [spots, setSpots] = useState<object>({})


// async function getSpot() {
//   return await axios
//     .post('/api/clinic/list')
//     .then((response) => {
//       console.log(response)
// //       // console.log(response?.data)
//       if (response?.data?.result == true) {
//         // console.log(response)
//         // console.log(response?.data?.message)
//         spots = response?.data?.response_data
//         alert('クリニックの情報を所得しました。')
//       } else if (response?.data?.result == false) {
//         // console.log(response)
//         console.log(response?.data?.message)
//         console.log(response?.data?.errors)
//         alert('クリニックの情報を所得できませんでした。')
//       } else {
// //         // console.log(response)
//         alert('通信エラーが発生いたしました。もう一度お確かめください')
//       }
//       console.log('spots 参照箇所1')
//       console.log(spots)
//       setSpots(spots)
// //       return response?.data
//     })
//     .catch((error) => {
//       console.error(error)
//       alert('クリニックの所得において、エラーが発生いたしました。もう一度お確かめください')
//     })
// }
// getSpot()
// console.log('spots 参照箇所2')
// console.log(spots)

/*////////////////////////////
    関数定義
/*/ ///////////////////////////

// ページで表示する『GoogleMap コンポーネント』
const GoogleMap = () => {
  const [spots, setSpots] = useState<object>({})
  const getSpot = async () => {
    return await axios
      .post('/api/clinic/list')
      .then((response) => {
        console.log(response)
        //       // console.log(response?.data)
        if (response?.data?.result == true) {
          // console.log(response)
          // console.log(response?.data?.message)
          // spots = response?.data?.response_data
          alert('クリニックの情報を所得しました。(2)')
        } else if (response?.data?.result == false) {
          // console.log(response)
          console.log(response?.data?.message)
          console.log(response?.data?.errors)
          alert('クリニックの情報を所得できませんでした。')
        } else {
          //         // console.log(response)
          alert('通信エラーが発生いたしました。もう一度お確かめください')
        }
        console.log('spots 参照箇所1')
        console.log(response)
        setSpots(response.data.response_data)
        //       return response?.data
      })
      .catch((error) => {
        console.error(error)
        alert('クリニックの所得において、エラーが発生いたしました。もう一度お確かめください')
      })
  }

  // getSpot()
  console.log('spots 参照箇所3')
  console.log(spots)
  // console.log(spots[0])
  const [currentFocusSpot, setCurrentFocusSpot] = useState<google.maps.LatLngLiteral | null>(null)
  const focusSpot = (spotLatLngLiteral: google.maps.LatLngLiteral) => {
    setCurrentFocusSpot(spotLatLngLiteral)
  }
  const unFocusSpot = () => {
    setCurrentFocusSpot(null)
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

  const calculateSpotDistance = (position: google.maps.LatLngLiteral) => {
    if (currentPositionLatLng === null) return false
    const distance = calcGeoDistance(position, currentPositionLatLng)
    return distance
    // const userInfo = null;
    // ユーザー設定によって、km算出かm算出かを決定する
    // if (userInfo?.distantSetting){
    // Default value
    // return distance ;//キロメートル法
    // }else{
    // return distance * 1000 ;//メートル法
    // }
  }

  const enableMapTrackCurrentPosition = () => {
    setIsMapTrackCurrentPosition(true)
  }

  const disableMapTrackCurrentPostion = () => {
    setIsMapTrackCurrentPosition(false)
  }

  // 北海道
  const defaultPosition = {
    lat: 43.7324393,
    lng: 142.1273298,
  }
  // アメリカ
  const defaultPosition2 = {
    lat: 47.4496578,
    lng: -102.5451315,
  }

  // GoogleMapStyles
  const containerStyle = {
    width: '100vw',
    height: '75vh',
  }

  const [currentPositionLatLng, setCurrentPositionLatLng] = useState<google.maps.LatLngLiteral | null>(null)
  const [isMapTrackCurrentPosition, setIsMapTrackCurrentPosition] = useState<boolean | null>(null)
  const [map, setMap] = useState<Map | null>(null)
  const center: google.maps.LatLngLiteral = useMemo(() => ({ lat: 44, lng: -80 }), [])

  const createBoundsBySpots = (spots): TypeBounds => {
    // const result: TypeBounds = {
    const result = {
      // north: 0,
      // east: 0,
      // south: 0,
      // west: 0,
      // 日本緯度経度
      // north: 45,
      // east: 153,
      // south: 20,
      // west: 122,
      // 日本緯度経度(コンパクトバージョン)
      north: 35,
      east: 150,
      south: 30,
      west: 120,
    }

    // result.north = Math.max(Object.keys(spots).map((spot) => spot.latitude))
    // result.east = Math.max(Object.keys(spots).map((spot) => spot.longitude))
    // result.south = Math.min(Object.keys(spots).map((spot) => spot.latitude))
    // result.west = Math.min(Object.keys(spots).map((spot) => spot.longitude))
    return result
  }

  const setMapFunc = (defaultPosition: google.maps.LatLngLiteral) => {
    // NEXT_PUBLIC_にしないと、サーバ側での処理となるためクライアントで使用できなくなり不具合が起こります。
    const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? 'NO API_KEY'
    if (googleMapsApiKey == 'NO API_KEY') {
      //Error code
    }
    const zoom: number = 5
    const { isLoaded } = UseJsApiLoader({
      id: 'google-map',
      googleMapsApiKey: googleMapsApiKey,
    })
    // GoogleMapComponentで使用
    const onLoad = (map: Map) => {
      // ここでどの範囲を初期状態で囲むかを１つのポジションで設定する
      map.fitBounds(createBoundsBySpots(spots), { top: 50, right: 1.0, bottom: 22.1, left: 1.0 })
      // googleMap を読み込んだ時の Map データをセットする
      setMap(map)
    }

    return { zoom, isLoaded, onLoad }
  }
  const { zoom, isLoaded, onLoad } = setMapFunc(defaultPosition)

  const SpotLightCurrentFocusSpot = () => {
    if (currentFocusSpot !== null && map !== null) {
      map.panTo(currentFocusSpot)
      setCurrentPositionLatLng(currentFocusSpot)
      // コンソール上で青森県からの距離を測定(単位:km)
      if (calculateSpotDistance(defaultPosition) !== false) {
        console.log('コンソール上で青森県からの距離を測定(単位:km)')
        console.log(calculateSpotDistance(defaultPosition))
      }
    }
  }

  const [spots2, setSpots2] = useState<Array>([])
  const foo = ($object) => {
    console.log('object')
    console.log($object)
    console.log('currentFocusSpot');
    console.log(currentFocusSpot);
    console.log(JSON.stringify($object) == JSON.stringify(currentFocusSpot))
    return JSON.stringify($object) == JSON.stringify(currentFocusSpot)
  }
  const getSpot2 = async () => {
    return await axios
      .post('/api/clinic/list')
      .then((response) => {
        console.log(response)
        //       // console.log(response?.data)
        if (response?.data?.result == true) {
          // console.log(response)
          // console.log(response?.data?.message)
          // spots = response?.data?.response_data
          alert('クリニックの情報を所得しました。(1)')
        } else if (response?.data?.result == false) {
          // console.log(response)
          console.log(response?.data?.message)
          console.log(response?.data?.errors)
          alert('クリニックの情報を所得できませんでした。')
        } else {
          //         // console.log(response)
          alert('通信エラーが発生いたしました。もう一度お確かめください')
        }
        console.log('spots 参照箇所1')
        console.log(response)
        setSpots2(response.data.response_data)
        //       return response?.data
      })
      .catch((error) => {
        console.error(error)
        alert('クリニックの所得において、エラーが発生いたしました。もう一度お確かめください')
      })
  }

  useEffect(() => {
    getSpot2()
  }, [])

  useEffect(() => {
    SpotLightCurrentFocusSpot()
    console.log(currentFocusSpot)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFocusSpot])
  useEffect(() => {
    console.log('useEffect から spots2 を確認')
    console.log(spots2)
  }, [spots2])

  // 北海道
  const defaultPosition3 = {
    lat: 43.7324393,
    lng: 142.1273298,
  }

  return (
    <>
      {isLoaded ? (
        <GoogleMapComponent
          // When  you try to change Google Map Styles
          // options={googleMapOptions}
          zoom={3}
          center={center}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
        >
          {/* <MarkerF position={defaultPosition} /> */}
          {spots2.map((spot) => (
            <>
              {/* {console.log('Google Map 箇所からのコンソールログ')} */}
              {/* {console.log({{e?.latitude, e?.longitude}})} */}
              <MarkerF
                position={{ lat: spot.latitude, lng: spot.longitude }}
                onClick={() => focusSpot({ lat: spot.latitude, lng: spot.longitude })}
              />
              {/* 今まで */}
              {/* <MarkerF position={e.position} label={markerLabel} onClick={() => focusSpot(e.position)}/> */}
              {/* <MarkerF position={e.position} label={markerLabel} onClick={(e) => displayConsole(e)}/> */}
              {/* HTMLでの吹き出しを設置 */}
              {/* {currentFocusSpot == { lat: spot.latitude, lng: spot.longitude } ? ( */}
              {foo({ lat: spot.latitude, lng: spot.longitude }) ? (
                <InfoWindowF position={{ lat: spot.latitude, lng: spot.longitude }} onCloseClick={() => unFocusSpot()}>
                  <div>{spot.clinic_name}</div>
                </InfoWindowF>
              ) : null}
            </>
          ))}
        </GoogleMapComponent>
      ) : (
        'Now loading..'
      )}
    </>
  )
}

// Web画面
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="page page-course">
        <div className="area_wrapper">
          <div className="area area-course_header">
            <div className="course_header">
              <h1 className="title">{'メンズエミナル'}</h1>
            </div>
          </div>
          {/* <Map/> */}
          {/* JSでの処理 */}
          {/* <div className="area area-map"> */}
          {/* <div className="map " style={{width: '400px', height:'100px'}}
                        ></div> */}
          {/* </div> */}
          <GoogleMap />

          <div className="area area-sub_controllers">
            <div className="sub_controllers">
              <div
                className="button current_position_button"
                // onClick={toggleMapTrackCurrentPosition}
              >
                現在地
              </div>
              <div className="button watch_position_restart_button">GPS更新</div>
            </div>
          </div>

          <div className="area area-current_stamp_info">
            <div className="current_stamp_info">
              <span className="text">検索ヒット数：{'51'}店舗</span>
            </div>
          </div>

          <div className="area area-spot_list">
            <div className="area area-stamp_button">
              <div className="stamp_button active">
                <span className="text">指定のクリニック検索</span>
              </div>
              <div className="stamp_button">
                <span className="text">半径〇〇キロ内検索</span>
              </div>
              <div className="stamp_button active">
                <span className="text">サンプルテキスト</span>
              </div>
            </div>
            {/* Google Map */}
            <div className="area area-map">
              <div className="map"></div>
            </div>
            {/* <Map/> */}
          </div>
        </div>
      </div>
    </>
  )
}
