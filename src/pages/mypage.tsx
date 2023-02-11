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
import { useJsApiLoader as UseJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";
import { isNullishCoalesce } from 'typescript'

let mapDatumTest = mapDatum[0]
let spotList = mapDatumTest.spots

/*////////////////////////////
    Type area(移行予定)
/*////////////////////////////
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

/*////////////////////////////
    End Type area(移行予定)
/*////////////////////////////


/*////////////////////////////
    関数定義
/*////////////////////////////


// ページで表示する『GoogleMap コンポーネント』
const GoogleMap = () => {
    const [currentFocusSpot, setCurrentFocusSpot] = useState<google.maps.LatLngLiteral | null>(null);
    const focusSpot = (spot: google.maps.LatLngLiteral) => {
        setCurrentFocusSpot(spot);
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
        if (currentPositionLatLng === null) return false;
        const distance = calcGeoDistance(position, currentPositionLatLng);
        return distance ;
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

    // GoogleMapStyles
    const containerStyle = {
        width: "100vw",
        height: "75vh",
    };


    const [currentPositionLatLng, setCurrentPositionLatLng] = useState<google.maps.LatLngLiteral | null>(null);
    const [isMapTrackCurrentPosition, setIsMapTrackCurrentPosition] = useState<boolean | null>(null);
    const [map, setMap] = useState<Map | null>(null);
    const center: google.maps.LatLngLiteral = useMemo( () => ({ lat: 44, lng: -80 }), [])

    const createBoundsBySpots = (spotList: TypeSpotList): TypeBounds => {
        const result: TypeBounds = {
        north: 0,
        east : 0,
        south: 0,
        west : 0,
        };

        result.north  = Math.max(...spotList.map(spot => spot.position.lat));
        result.east  = Math.max(...spotList.map(spot => spot.position.lng));
        result.south = Math.min(...spotList.map(spot => spot.position.lat));
        result.west  = Math.min(...spotList.map(spot => spot.position.lng));
        return result;
    }

    const setMapFunc = ( defaultPosition : google.maps.LatLngLiteral) => {
        // NEXT_PUBLIC_にしないと、サーバ側での処理となるためクライアントで使用できなくなり不具合が起こります。
        const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? 'NO API_KEY'
        if(googleMapsApiKey == 'NO API_KEY'){
            //Error code
        }
        const zoom: number = 5;
        const { isLoaded } = UseJsApiLoader({
            id: "google-map",
            googleMapsApiKey: googleMapsApiKey,
        });
        // GoogleMapComponentで使用
        const onLoad = (map: Map) => {
            // ここでどの範囲を初期状態で囲むかを１つのポジションで設定する
            map.fitBounds(createBoundsBySpots(spotList), { top: 50, right: 1.0, bottom: 22.1, left: 1.0 });
            // googleMap を読み込んだ時の Map データをセットする
            setMap(map);
        };

        return { zoom, isLoaded, onLoad };
    };
    const { zoom, isLoaded, onLoad } = setMapFunc(defaultPosition);

    const SpotLightCurrentFocusSpot = () => {
        if (currentFocusSpot !== null && map !== null) {
            map.panTo(currentFocusSpot);
            setCurrentPositionLatLng(currentFocusSpot);
            // コンソール上で青森県からの距離を測定(単位:km)
            if(calculateSpotDistance(defaultPosition) !== false){
                console.log('コンソール上で青森県からの距離を測定(単位:km)');
                console.log(calculateSpotDistance(defaultPosition));
            }
        }
    }

    useEffect(() => {
        SpotLightCurrentFocusSpot();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFocusSpot]);


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


export default function Home() {
    // const [map, setMap] = useState<Map | null>(null);

    // const toggleMapTrackCurrentPosition =() => {
    //     isMapTrackCurrentPosition ? disableMapTrackCurrentPostion() : enableMapTrackCurrentPosition();
    // }


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
