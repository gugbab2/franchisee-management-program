import React, { useState } from "react";
import NaverApiMap from "../apis/NaverAPIMap";
import SearchResultList from "../template/SearchResultList";
import SearchBar from "../template/SearchBar";
import "../css/Map.css";
import SearchDetail from "../template/SearchDetail";
import MapNavbar from "../template/MapNavbar";
import { instance } from '../template/AxiosConfig/AxiosInterceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { naver } = window;

function Map() {
    // offcanvase 옵션 배경 스크롤 허용 클릭 허용
    const options1 = {
        scroll: true,
        backdrop: false,
    };

    const [searchData, setSearchData] = useState([{
        name: '',
        tel: '',
        firstImg: ''
    }]);

    let [searchResultToggle, setsearchResultToggle] = useState(false);
    let [detailTog, setDetailTog] = useState(false);
    let [clickMarkerBN, setClickMarkerBN] = useState("");
    const [keyword,setKeyword] = useState('');
    let placeMarker;

    const searchMarkerTogOpen = (e) => {
        setsearchResultToggle((searchResultToggle = true));
        if(e != null){
            setSearchData(e);
        }else{
            setSearchData({});
        }
    }

    const searchAjax = (inputkeyword) =>{
        instance({
            method: "get",
            url:
            `/franchisee/search/keyword?keyword=` + inputkeyword,
        }).then(function (res) {
            setSearchData(res.data);
            setKeyword(inputkeyword);
            let searchPlace = new naver.maps.LatLng(res.data.franchisees[0].y, res.data.franchisees[0].x);
            test.map.setCenter(searchPlace);
            test.removePlaceMarker();
            test.removeCluster();
            test.map.setZoom(16);
            placeMarker = new naver.maps.Marker({
                position: naver.maps.LatLng(searchPlace),
                map: test.map,
                icon: {
                    content: [
                        '<div class="naverApiMap-mappingMarker">',
                        '<div class="naverApiMap-mappingMarker--imageZone">',
                        '<img src="'+process.env.PUBLIC_URL+'/img/restImg.png">',
                        "</div>",
                        '<div class="naverApiMap-mappingMarker--mainZone">',
                        '<div class="naverApiMap-mappingMarker--titleZone">',
                        "<span>",
                        res.data.franchisees[0].name,
                        "</span>",
                        "</div>",
                        '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                        "<span>",
                        res.data.franchisees[0].tel.substring(0,2) === "02" ?
                            res.data.franchisees[0].tel.replace(
                                /(\d{2})(\d{3,4})(\d{4})/,
                                "$1-$2-$3"
                            )
                            : res.data.franchisees[0].tel.replace(
                                /(\d{3})(\d{3,4})(\d{4})/,
                                "$1-$2-$3"
                            ),
                        "</span>",
                        "</div>",
                        "</div>",
                        "</div>",
                    ].join(""),
                    anchor: new naver.maps.Point(25, 60),
                },
                title: res.data.franchisees[0].businessNumber
            })
            naver.maps.Event.addListener(placeMarker, "click", function(e){
                detailTogClose();
                detailTogOpen(e.overlay.title);
            })
            test.placeMarker.push(placeMarker);
            
            test.movedCenterCircle.setVisible(false);
            document.querySelector('#btnSearchListOpen').addEventListener('click',function(){searchMarkerTogOpen(res.data)});
            
        }).catch(function (err) {
            setSearchData({});
            toast.error('검색결과가 없습니다', toast.toastDefaultOption);
        });
    }

    const searchResultTogOpen = (inputkeyword) => {
        setsearchResultToggle((searchResultToggle = true));
        searchAjax(inputkeyword);
    };
    // const searchResultTogClose = () => {
    //     setsearchResultToggle((searchResultToggle = false));
    // };
    const detailTogOpen = (businessNumber) => {
        setDetailTog((detailTog = true));
        setClickMarkerBN(businessNumber);
        setsearchResultToggle((searchResultToggle = true));
    }

    const detailSearchTogOpen = (businessNumber,ele) => {
        let choicePlace = new naver.maps.LatLng(ele.y, ele.x);
        test.map.setCenter(choicePlace);
        // test.removeCluster();
        test.removePlaceMarker();
        test.map.setZoom(17);
        // test.map.setZoom(22);
        if(test.markers.length===0){
            placeMarker = new naver.maps.Marker({
                position: naver.maps.LatLng(choicePlace),
                map: test.map,
                icon: {
                    content: [
                        '<div class="naverApiMap-mappingMarker">',
                        '<div class="naverApiMap-mappingMarker--imageZone">',
                        '<img src="'+process.env.PUBLIC_URL+'/img/restImg.png">',
                        "</div>",
                        '<div class="naverApiMap-mappingMarker--mainZone">',
                        '<div class="naverApiMap-mappingMarker--titleZone">',
                        "<span>",
                        ele.name,
                        "</span>",
                        "</div>",
                        '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                        "<span>",
                        ele.tel.substring(0,2) === "02" ?
                            ele.tel.replace(
                                /(\d{2})(\d{3,4})(\d{4})/,
                                "$1-$2-$3"
                            )
                            : ele.tel.replace(
                                /(\d{3})(\d{3,4})(\d{4})/,
                                "$1-$2-$3"
                            ),
                        "</span>",
                        "</div>",
                        "</div>",
                        "</div>",
                    ].join(""),
                    anchor: new naver.maps.Point(25, 60),
                },
                title: ele.businessNumber
            })
            naver.maps.Event.addListener(placeMarker, "click", function(e){
                detailTogClose();
                detailTogOpen(e.overlay.title);
            })
            test.placeMarker.push(placeMarker);
        }else{
            // for(let idx=0; idx<test.resultMarkers.length; idx++){
            //     console.log(idx,'번째', test.resultMarkers[idx].position);
            //     console.log(test.clusterList[0]);
            //     if(test.resultMarkers[idx].position.y === choicePlace.y & test.resultMarkers[idx].position.x === choicePlace.x){
            //         if(test.clusterList[0].position === test.resultMarkers[idx].position){
            //         //     console.log('존재');
            //         //     test.clusterList[0].setIcon(
            //         //         {
            //         //             content: [
            //         //                 '<div class="naverApiMap-mappingMarker">',
            //         //                 '<div class="naverApiMap-mappingMarker--imageZone">',
            //         //                 '<img src="'+process.env.PUBLIC_URL+'/img/searchImg.png">',
            //         //                 '</div>',
            //         //                 '</div>',
            //         //             ].join(``),
            //         //             anchor: new naver.maps.Point(25, 60),
            //         //         }
            //         //     )
            //             // test.clusterList[0].setAnimation(naver.maps.Animation.BOUNCE);
                        
            //         }else{
            //             // test.resultMarkers[idx].setIcon(
            //             //     {
            //             //         content: [
            //             //             '<div class="naverApiMap-mappingMarker">',
            //             //             '<div class="naverApiMap-mappingMarker--imageZone">',
            //             //             '<img src="'+process.env.PUBLIC_URL+'/img/searchImg.png">',
            //             //             '</div>',
            //             //             '</div>',
            //             //         ].join(``),
            //             //         // anchor: new naver.maps.Point(25, 60),
            //             //     }
            //             // )
            //             // test.resultMarkers[idx].setAnimation(naver.maps.Animation.BOUNCE);

            //         }
            //         // 색상 변경 또는 애니메이션 주기
            //         // console.log('asdf', test.resultMarkers[idx]);
            //         // console.log('존재');
            //         // for(let idx2=0; idx2<markerClustering._clusters.length; idx2++){
            //         //     for(let idx3=0; idx3<markerClustering._clusters[idx2]._clusterMember.length; idx3++){

            //         //     }
            //         // }
                    
            //     }
            // }
            //여기 작업해야함
            // for(let idx=0; idx<test.resultMarkers.length; idx++){
            //     // test.resultMarkers[idx].
            //     if(test.resultMarkers[idx].position.y === choicePlace.y & test.resultMarkers[idx].position.x === choicePlace.x){
            //         // test.resultMarkers[idx].setAnimation(naver.maps.Animation.BOUNCE);
            //     }
            // }
        }
        
        setDetailTog((detailTog = true));
        setClickMarkerBN(businessNumber);
    }
    const detailTogClose = () => {
        setDetailTog((detailTog = false));
    }

    test.togOn = (title,data)=>{detailTogOpen(title); searchMarkerTogOpen(data);};

    return (
        <>
            <div className="outline">
                <MapNavbar detailTogOpen={detailTogOpen} detailTogClose={detailTogClose} searchMarkerTogOpen={searchMarkerTogOpen}/>
                <NaverApiMap detailTogOpen={detailTogOpen} detailTogClose={detailTogClose} searchMarkerTogOpen={searchMarkerTogOpen}></NaverApiMap>
                <SearchDetail options={options1} detailTogOpen={detailTogOpen} detailTogClose={detailTogClose} detailTogObj={{ detailTog, setDetailTog, clickMarkerBN }}></SearchDetail>
                <SearchResultList options={options1} resultTog={{ searchResultToggle, setsearchResultToggle }} searchData={{searchData,setSearchData}} detailSearchTogOpen={detailSearchTogOpen} detailTogClose={detailTogClose} keyword={keyword} detailTog={detailTog}/>
                <div className="searchBarContainer">
                    <SearchBar searchResultTogOpen={searchResultTogOpen} detailTogClose={detailTogClose} keyword={keyword}></SearchBar>
                </div>
                <div className="container"></div>
            </div>
        </>
    );
}

export default Map;
