import Head from 'next/head'
import axios from '../libs/axios'
import React, { useEffect, useMemo } from 'react'
// import { mapDatum } from '../components/mapData'

import { GoogleMap as GoogleMapComponent, LoadScript } from '@react-google-maps/api'
import { FC } from 'react'
import { useJsApiLoader as UseJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { useState } from 'react'
import { Map, TypeBounds, markerLabel, TypeSpotList } from '../type/client/Map'


import {
  ChakraProvider,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure, //utility hooks の一つ
} from '@chakra-ui/react'
import { SelectForm } from '../components/clinics/selectForm'

const GoogleMapPanel = ({ children, isScreenState, onOpen, setIsScreenState }) => {
  // const [isActive, setIsActive] = useState(false)
  const OverlayTwo = () => (
    <ModalOverlay bgColor="white" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />
  )
  const [overlay, setOverlay] = React.useState(<OverlayTwo />)
  return (
    <div style={{ display: isScreenState ? 'block' : 'none' }}>
      <div className="page page-course">
        <div className="area_wrapper">
          <div className="area area-course_header">
            <div className="course_header">
              <h1 className="title">{'メンズエミナル'}</h1>
            </div>
          </div>

          <div className="area area-sub_controllers">
            <div className="sub_controllers">
              <div
                className="button current_position_button"
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
          {/* GoogleMapを配置する箇所 */}
          {children}

          <div className="area area-spot_list">
            <div className="area area-stamp_button">
              <div
                className="stamp_button active"
                onClick={() => {
                  setOverlay(<OverlayTwo />)
                  onOpen()
                  setIsScreenState(false)
                }}
              >
                <span className="text">指定のクリニック検索</span>
              </div>
              <div className="stamp_button">
                <span className="text">半径〇〇キロ内検索</span>
              </div>
              <div className="stamp_button active">
                <span className="text">サンプルテキスト</span>
              </div>
            </div>
            <div className="area area-map">
              <div className="map"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



/*////////////////////////////
    関数定義
/*/ ///////////////////////////

// ページで表示する『GoogleMap コンポーネント』
const GoogleMap = ({ spots }) => {
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

  const openInfoWindow = ($object) => {
    console.log('object')
    console.log($object)
    console.log('currentFocusSpot')
    console.log(currentFocusSpot)
    console.log(JSON.stringify($object) == JSON.stringify(currentFocusSpot))
    return JSON.stringify($object) == JSON.stringify(currentFocusSpot)
  }

  useEffect(() => {
    SpotLightCurrentFocusSpot()
    console.log(currentFocusSpot)
    // 不具合対策
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFocusSpot])

  useEffect(() => {
    console.log('spots 参照箇所33')
    console.log(spots)
  }, [spots])

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
          {spots.map((spot) => (
            <>
              <MarkerF
                position={{ lat: spot.latitude, lng: spot.longitude }}
                onClick={() => focusSpot({ lat: spot.latitude, lng: spot.longitude })}
              />
              {/* HTMLでの吹き出しを設置 */}
              {openInfoWindow({ lat: spot.latitude, lng: spot.longitude }) ? (
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
  const [spots, setSpots] = useState<object>([])
const _setSpot =  (spotData)=>{
  console.log('Execute _setSpot')
  console.log(spotData)
  setSpots(spotData)
}

  const getSpot = async () => {
    return await axios
      .post('/api/clinic/list')
      .then((response) => {
        console.log(response)
        if (response?.data?.result == true) {
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
      })
      .catch((error) => {
        console.error(error)
        alert('クリニックの所得において、エラーが発生いたしました。もう一度お確かめください')
      })
  }
  useEffect(() => {
    getSpot()
  }, [])
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isScreenState, setIsScreenState] = React.useState(true)
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      {/* //このプロバイダーがないとうまく機能しない場合がある(真ん中にモーダルが出ない等) */}
      <ChakraProvider>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose()
            setIsScreenState(true)
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>クリニック検索</ModalHeader>
            <ModalBody>
              {/* <Form prefecturesTest={prefecturesTest} /> */}
              <SelectForm _setSpot={_setSpot} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      <GoogleMapPanel isScreenState={isScreenState} onOpen={onOpen} setIsScreenState={setIsScreenState}>
        <GoogleMap spots={spots} />
      </GoogleMapPanel>
    </>
  )
}
