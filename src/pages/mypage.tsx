import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import axios from "../libs/axios";
import React, { useEffect, useMemo } from 'react';

// import { useHandleLogout } from '../components/shared/function/Auth/AuthLisnter'
import { mapDatum } from '../components/atomic/Atoms/mapData'

import { GoogleMap as GoogleMapComponent, LoadScript } from '@react-google-maps/api';
import { FC } from "react";
import { useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";

// import  "../../.env";

// When  you try to change Google Map Styles
//  import { InterfaceMap } from "./GoogleMapStyles";
//  const googleMapOptions = {
//   styles: InterfaceMap,
// };
let mapDatumTest = mapDatum[0]
let spotList = mapDatumTest.spots
// console.log(mapDatumTest) // Datum
// console.log(spotList) // Datum

// console.log('spotList') // Datum
// console.log(Object.keys(spotList).map(e => spotList[e].name)) // Datum
// console.log(spotList.map(e => console.log(e.name))) // Datum
// console.log({mapDatum.spots}) // Datum
// const handleLogout = useHandleLogout()
// let MyPosition =1
// const [MyPosition, setMyPosition] = useState<LatLngProps | null>(null);
// const [currentFocusSpot, setCurrentFocusSpot] = useState(null);

type TypeSpotList = {
    id: string;
    name: string;
    position: {
        lat: number;
        lng: number;
    };
    shopStars: number;
    watchCount: number;
    externalLinkUrl: string;
    foo: string;
}[]

type Map = google.maps.Map;

type LatLngProps = {
defaultPosition: google.maps.LatLngLiteral;
};
type LatLngProps2 = {
    lat: number;
    lng: number;
};
type TypeBounds = {
    north : number;
    east  : number;
    south : number;
    west  : number;
};

const markerLabel: google.maps.MarkerLabel = {
    text: "エミナル",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
};

// 型定義サンプル
// type FooProps = ({
//     id: number
//     name?: string
//     infoList: Array<string>
// });
// const foo: React.FC<FooProps> = ({id, name, infoList}) => {

// const toggleFocusSpot = (spot: LatLngProps) => {
//     if (currentFocusSpot !== null && currentFocusSpot === spot) {
//     unFocusSpot();
//     } else {
//     focusSpot(spot);
//     }
// }

const displayConsole = (e) => {
    console.log(e);
}

// ページで表示する『GoogleMap コンポーネント』
const GoogleMap: FC = () => {
    const focusSpot = (spot: LatLngProps) => {
          setCurrentFocusSpot(spot);
          console.log(currentFocusSpot);
    }
    const unFocusSpot = () => {
          setCurrentFocusSpot(null);
    }

// km算出
const calcGeoDistance = (position1: google.maps.LatLngLiteral, position2: google.maps.LatLngLiteral) => {
    var R = 6371.0710; // Radius of the Earth in kilometers
    var rlat1 = position1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = position2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (position2.lng - position1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R
            * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2)
            + Math.cos(rlat1) * Math.cos(rlat2)
            * Math.sin(difflon / 2) * Math.sin(difflon / 2)));

    return d;
}

const calculateSpotDistance = (position: google.maps.LatLngLiteral) => {
    // return course.spots.filter((spot) => {
    if (currentPositionLatLng === null) return false;

    const distance = calcGeoDistance(position, currentPositionLatLng);
    const userInfo = null;
    // ユーザー設定によって、km算出かm算出かを決定する
    if (userInfo?.distantSetting){
        // Default value
        return distance ;//キロメートル法
    }else{
        return distance * 1000 ;//メートル法
    }
}

// const toggleMapTrackCurrentPosition =() => {
//     isMapTrackCurrentPosition ? disableMapTrackCurrentPostion() : enableMapTrackCurrentPosition();
// }

const enableMapTrackCurrentPosition = () => {
    setIsMapTrackCurrentPosition(true);
}

const disableMapTrackCurrentPostion = () => {
    setIsMapTrackCurrentPosition(false);
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
    const SpotLightcurrentFocusSpot = () => {
    //     if (marker === activeMarker) {
    //   return;
    // }
    // setActiveMarker(marker);
        if (currentFocusSpot !== null) {
            console.log("選択箇所にスポットを当てる");
        //     disableMapTrackCurrentPostion();
            map.panTo(currentFocusSpot);
            // displayConsole(currentFocusSpot);
            setCurrentPositionLatLng(currentFocusSpot);
            displayConsole("北海道からの距離");
            displayConsole(calculateSpotDistance(defaultPosition));
            // displayConsole(currentPositionLatLng);
            // setActiveMarker(marker);

        //     _.invokeMap(spotMarkers, 'setZIndex', undefined);
                // Markersの 'setZIndex'を全て undefined にするメゾット

        //     findSpotMarkerBySpot(this.currentFocusSpot)?.setZIndex(100);
        //     openSpotInfoWindow(currentFocusSpot);
        } else {
            console.log("選択箇所にスポットを当てる(null)");
        //     _.invokeMap(spotMarkers, 'setZIndex', undefined);
        //     closeSpotInfoWindow();
        }
    }
    const [currentFocusSpot, setCurrentFocusSpot] = useState<LatLngProps | null>(null);
    const [currentPositionLatLng, setCurrentPositionLatLng] = useState<google.maps.LatLngLiteral | null>(null);
    const [nowCurrentPositionLatLng, setNowCurrentPositionLatLng] = useState<google.maps.LatLngLiteral>(defaultPosition2);
    const [isMapTrackCurrentPosition, setIsMapTrackCurrentPosition] = useState<boolean | null>(null);
    // const [activeMarker, setActiveMarker] = useState(null);
    useEffect(() => {
        SpotLightcurrentFocusSpot();
        console.log('useEffectで変化したよ！');
    }, [currentFocusSpot]);
    useEffect(() => {
        console.log('useEffect_222222222');
      if (isMapTrackCurrentPosition) {
        if (currentPositionLatLng !== null) map.panTo(nowCurrentPositionLatLng);
      }
    }, [isMapTrackCurrentPosition]);
    // setMyPosition(defaultPosition);
    const { map, zoom, isLoaded, onLoad } = setMapFunc({
        defaultPosition: defaultPosition,
    });

    const containerStyle = {
        width: "100vw",
        height: "75vh",
    };

    const center: google.maps.LatLngLiteral = useMemo( () => ({ lat: 44, lng: -80 }), [])
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
                <MarkerF position={defaultPosition}  />
            {spotList.map(e => (
                <>
                <MarkerF position={e.position}  onClick={() => focusSpot(e.position)}/>
                {/* 今まで */}
                {/* <MarkerF position={e.position} label={markerLabel} onClick={() => focusSpot(e.position)}/> */}
                {/* <MarkerF position={e.position} label={markerLabel} onClick={(e) => displayConsole(e)}/> */}
                {/* HTMLでの吹き出しを設置 */}
                {currentFocusSpot === e.position ? (
                    <InfoWindowF position={e.position}  onCloseClick={() => unFocusSpot()}>
                        <div>{e.name}</div>
                    </InfoWindowF>
                ) : null}
                </>
            ))}
            </GoogleMapComponent>
        ) : (
            "Now loading.."
        )}
        </>
    );
};

const createBoundsBySpots = (spotList: TypeSpotList): TypeBounds => {
    const result: TypeBounds = {
    north: 0,
    east : 0,
    south: 0,
    west : 0,
    };
    //   result.north = Math.max(spotList.map(e.position => e.position.lat));
    //   result.north = Math.max(...spotList.map(true => true) );
    result.north  = Math.max(...spotList.map(spot => spot.position.lat));
    result.east  = Math.max(...spotList.map(spot => spot.position.lng));
    result.south = Math.min(...spotList.map(spot => spot.position.lat));
    result.west  = Math.min(...spotList.map(spot => spot.position.lng));
    return result;
}



const setMapFunc = ({ defaultPosition }: LatLngProps) => {
    // NEXT_PUBLIC_にしないと、サーバ側での処理となるためクライアントで使用できなくなり不具合が起こります。
    const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? 'NO API_KEY'
    if(googleMapsApiKey == 'NO API_KEY'){
        //Error code
    }
    const zoom: number = 5;
    const [map, setMap] = useState<Map | null>(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: googleMapsApiKey,
    });
    const onLoad = (map: Map) => {
        // ここでどの範囲を初期状態で囲むかを１つのポジションで設定する
        const bounds = new window.google.maps.LatLngBounds(defaultPosition);
        map.fitBounds(createBoundsBySpots(spotList), { top: 50, right: 1.0, bottom: 22.1, left: 1.0 });
        // map.fitBounds(bounds);
        setMap(map);
    };

    return { zoom, map, isLoaded, onLoad };
};




export default function Home() {
    useEffect(() => {
        //   axios.get("/api/books").then((res) => {
        //   const data = res.data;
        //   console.log(data);
        //  });
}, []);

const toggleMapTrackCurrentPosition =() => {
    isMapTrackCurrentPosition ? disableMapTrackCurrentPostion() : enableMapTrackCurrentPosition();
}

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
                <GoogleMap>
                    {/*  */}
                </GoogleMap>

                <div className="area area-sub_controllers">
                    <div className="sub_controllers">
                    <div
                        className="button current_position_button"
                        onClick={toggleMapTrackCurrentPosition}
                    >
                        現在地
                    </div>
                    <div
                        className="button watch_position_restart_button"
                    >
                        GPS更新
                    </div>
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
                                <div className="map" 
                                ></div>
                            </div>
                    {/* <Map/> */}
                </div>
            </div>
        </div>
    </>
)

}
