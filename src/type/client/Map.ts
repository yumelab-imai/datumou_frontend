
/*////////////////////////////
    Type List
/*////////////////////////////
export type TypeSpotList = {
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

export type Map = google.maps.Map;

export type TypeBounds = {
    north : number;
    east  : number;
    south : number;
    west  : number;
};

export const markerLabel: google.maps.MarkerLabel = {
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