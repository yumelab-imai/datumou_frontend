// type Memo = {
//   title: string;
//   body: string;
// };

// export const tempMemos: Memo{} = {
//   {
//     title: '仮のタイトル1',
//     body: '仮のメモの内容1',
//   },
//   {
//     title: '仮のタイトル2',
//     body: '仮のメモの内容2',
//   },
//   {
//     title: '仮のタイトル3',
//     body: '仮のメモの内容3',
//   },
//   {
//     title: '仮のタイトル4',
//     body: '仮のメモの内容4',
//   },
//   {
//     title: '仮のタイトル5',
//     body: '仮のメモの内容5',
//   },
// };
type mapData = {
    id: string;
    name: string;
    imageUrl: string;
    eggsMode: boolean;
    disableIndex: boolean;
    myFavoriteClinic: boolean;
    myHatelinic: boolean;
    check: number[];
    spots: {
        s001: {
            id: string;
            name: string;
            imageUrl: string;
            eggsMode: string;
            disableIndex: string;
            myHatelinic: string;
            myFavoriteClinic: string;
            check: number[];
            spots: {
                s001:{
                    id : string,
                    name : string,
                    position : { lat : number, lng : number },
                    Distance : number,
                    externalLinkUrl : string,
                    someString : string,
                }
            };
        };
    };
}

// fetch clinic datum from clinic table
let mapDatum  = [
    {
            'id' : '56', // 'm_master'.'cd=6(example)'
            'kindName' : 'アサヒガワ動物園 × 園内スタンプラリー', // kind of clinic
            'imageUrl' : '/imageUrl1', // imageUrl
            'clinicStars' : 50, // clinic Stars
            'myFavoriteClinic' : true, // user Favorite Clinic
            'myHatelinic' : false, // user hate Clinic
            'fooMode' : true, // sample text
            // 'disableIndex' : true, // DB側で必要の可能性有り
            'spots' : [ // related clinic data list
                {'id' : '26', // 't_clinic'.'id'
                'name' : 'メンズエミナル 大宮院', // shop name
                'position' : { 'lat' : 35.908748 , 'lng' : 139.628093 }, // latitude, longitude
                'shopStars' : 50, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 高松院', // shop name
                'position' : { 'lat' : 34.342127, 'lng' : 134.050029 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },//
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 岡山院', // shop name
                'position' : { 'lat' : 34.666034, 'lng' : 133.9207662 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 姫路院', // shop name
                'position' : { 'lat' : 34.828249 , 'lng' : 134.691263 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 神戸呉服通院', // shop name
                'position' : { 'lat' : 34.691963, 'lng' : 135.196863 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },//
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 和歌山院', // shop name
                'position' : { 'lat' : 34.231606 , 'lng' :135.190218 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 梅田院', // shop name
                'position' : { 'lat' : 34.700613, 'lng' : 135.498495 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },//
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 高松院', // shop name
                'position' : { 'lat' : 34.342127 , 'lng' : 134.050029 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },//
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 広島院', // shop name
                'position' : { 'lat' : 34.393356 , 'lng' : 132.456632 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 心斎橋２号院', // shop name
                'position' : { 'lat' : 34.671691, 'lng' : 135.499701
             }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },//
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 松山院', // shop name
                'position' : { 'lat' : 33.836471 , 'lng' : 132.762912 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 天王寺院', // shop name
                'position' : { 'lat' : 34.646179, 'lng' : 135.512166 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 奈良院', // shop name
                'position' : { 'lat' : 34.684059 , 'lng' : 135.825675 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 京都院', // shop name
                'position' : { 'lat' : 35.004003, 'lng' : 135.765372 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 名古屋院', // shop name
                'position' : { 'lat' : 35.172699 , 'lng' : 136.889386 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 姫路院', // shop name
                'position' : { 'lat' : 34.828249, 'lng' : 134.691263 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 大分院', // shop name
                'position' : { 'lat' : 33.235536 , 'lng' : 131.607074 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 小倉院', // shop name
                'position' : { 'lat' : 33.883342 , 'lng' : 130.879881 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 福岡天神院', // shop name
                'position' : { 'lat' : 33.589854 , 'lng' : 130.396343 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 大分院', // shop name
                'position' : { 'lat' : 33.235536 , 'lng' : 131.607074 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 熊本院', // shop name
                'position' : { 'lat' : 32.802826 , 'lng' : 130.709104 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 長崎院', // shop name
                'position' : { 'lat' : 32.744453 , 'lng' :129.878194 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 宮崎院', // shop name
                'position' : { 'lat' : 31.915585 , 'lng' :131.422591 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 鹿児島院', // shop name
                'position' : { 'lat' : 31.590928 , 'lng' :130.555096 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 久留米院', // shop name
                'position' : { 'lat' : 33.305951 , 'lng' :130.515181 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 岐阜院', // shop name
                'position' : { 'lat' : 35.417031, 'lng' :136.759676 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 福井院', // shop name
                'position' : { 'lat' : 36.062913 , 'lng' :136.219824 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 豊橋院', // shop name
                'position' : { 'lat' : 34.764135 , 'lng' :137.383469 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 四日市院', // shop name
                'position' : { 'lat' : 34.967512, 'lng' :136.620127 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 静岡院', // shop name
                'position' : { 'lat' : 34.973905 , 'lng' :138.38383 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 浜松院', // shop name
                'position' : { 'lat' : 34.704631, 'lng' :137.730548 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 金沢院', // shop name
                'position' : { 'lat' : 36.57552 , 'lng' :136.651914 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 新宿院', // shop name
                'position' : { 'lat' : 35.693234, 'lng' :139.698836 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 銀座院', // shop name
                'position' : { 'lat' : 35.672317 , 'lng' :139.765008  }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 渋谷駅前院', // shop name
                'position' : { 'lat' : 35.658285, 'lng' :139.6998 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 上野院', // shop name
                'position' : { 'lat' : 35.71244 , 'lng' :139.777729 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 富山院', // shop name
                'position' : { 'lat' : 36.698159 , 'lng' :137.211257 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 横浜院', // shop name
                'position' : { 'lat' : 35.467624 , 'lng' :139.621382 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 池袋東口院', // shop name
                'position' : { 'lat' : 35.728657 , 'lng' :139.713883 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 姫路院', // shop name
                'position' : { 'lat' : 34.828249 , 'lng' :134.691263 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 新潟院', // shop name
                'position' : { 'lat' : 37.916746, 'lng' :139.057748 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 那覇院', // shop name
                'position' : { 'lat' : 26.212575, 'lng' :127.675239 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 船橋院', // shop name
                'position' : { 'lat' : 35.701072, 'lng' :139.986812 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 立川院', // shop name
                'position' : { 'lat' :  35.698491, 'lng' : 139.410746 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル千葉院', // shop name
                'position' : { 'lat' : 35.611497, 'lng' :140.118718 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 宇都宮院', // shop name
                'position' : { 'lat' : 36.56058, 'lng' :139.880076 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 長野院', // shop name
                'position' : { 'lat' : 36.643925 , 'lng' : 138.186702 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 町田院', // shop name
                'position' : { 'lat' : 35.542568, 'lng' : 139.447742 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 川崎院', // shop name
                'position' : { 'lat' : 35.53012, 'lng' :139.70075 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 高崎院', // shop name
                'position' : { 'lat' : 36.324121, 'lng' :139.005315 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 郡山院', // shop name
                'position' : { 'lat' : 37.397129 , 'lng' :140.383784 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 宮崎院', // shop name
                'position' : { 'lat' : 31.915585, 'lng' :131.422591 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 仙台院', // shop name
                'position' : { 'lat' : 38.26129, 'lng' :140.871481 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 水戸院', // shop name
                'position' : { 'lat' : 36.369684, 'lng' :140.477232 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 札幌院', // shop name
                'position' : { 'lat' : 43.062771, 'lng' :141.351856 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
                {'id' : '27', // 't_clinic'.'id'
                'name' : 'メンズエミナル 青森院', // shop name
                'position' : { 'lat' : 40.8223, 'lng' :140.75005 }, // latitude, longitude
                'shopStars' : 34, // shop Stars
                'watchCount' :125, // watch Count
                'externalLinkUrl' : 'https://www.laravelvueport.link', // shop URL
                'foo' : '', // sample text
                },
            ],
    },
];

export {mapDatum};