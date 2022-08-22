import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { instance } from "../template/AxiosConfig/AxiosInterceptor";
import { useLocation } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {GiPathDistance} from 'react-icons/gi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows } from "@fortawesome/free-solid-svg-icons";

const { naver } = window;

function NaverAPIMap({detailTogOpen, detailTogClose, searchMarkerTogOpen }) {
    let FMIndexMap;
    let cLat, cLng;
    const { state } = useLocation();

    //클릭마커리스트
    // let markerList = [];

    //현위치 버튼 디자인
    var BtngoCurrentLocHtml = `<a href="#" class="btn btn-outline-secondary navermap__btnCurLoc" role='button'><img src="`+process.env.PUBLIC_URL+`/img/currentLocBtnImg3.png"/></a>`;
    
    // 지도 확대 축소 버튼 디자인
    var BtnZoomIn = `<button type="button" class="btn btn-outline-secondary btnZoomOption btnZoomIn">+</button>`;
    var BtnZoomOut = `<button type="button" class="btn btn-outline-secondary btnZoomOption btnZoomOut">-</button>`;

    //카테고리존 area
    var BtnAreaHtml = `<button type="button" class="btn btnCategoryArea"><img src="`+process.env.PUBLIC_URL +`/img/searchImg.png"/>현위치 기반 장소검색</button>`;

    //거리설정 버튼 디자인
    var BtnSetSearchOption = `
    <a href="#" class="btn btn-outline-secondary navermap__btnSetSearchOpt dropdown" type='button'>
        <img src="`+process.env.PUBLIC_URL+`/img/radius.png" type="button" data-bs-toggle="dropdown" aria-expanded="false"/>
        <ul class="dropdown-menu navermap--radiusSettingDropdown">
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault1" value="200" checked onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault1">
                    200미터
                </label
            </li>
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault2" value="500" onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault2">
                    500미터
                </label>
            </li>
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault3" value="1000" onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault3">
                    1키로
                </label>
            </li>
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault4" value="5000" onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault4">
                    5키로
                </label>
            </li>
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault5" value="10000" onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault5">
                    10키로
                </label>
            </li>
            <li>
                <input class="form-check-input" type="radio" name="radiusChk" id="flexRadioDefault6" value="20000" onchange="test.setRadius(value);">
                <label class="form-check-label" for="flexRadioDefault6">
                    20키로
                </label>
            </li>
        </ul>
    </a>`;

    //검색갯수 설정 버튼 디자인
    var BtnSetCountOption = `
    <a href="#" class="btn btn-outline-secondary navermap__btnSetCountOpt dropdown" role='button'>
        <img src="`+process.env.PUBLIC_URL+`/img/settingImg.png" type="button" data-bs-toggle="dropdown" aria-expanded="false"/>
        <ul class="dropdown-menu navermap--countSettingDropdown">
            <li>
                <input class="form-check-input" type="radio" name="countChk" id="flexCountOpt1" value="100" checked onchange="test.setCount(value);">
                <label class="form-check-label" for="flexCountOpt1">
                    100개
                </label
            </li>
            <li>
                <input class="form-check-input" type="radio" name="countChk" id="flexCountOpt2" value="300" onchange="test.setCount(value);">
                <label class="form-check-label" for="flexCountOpt2">
                    300개
                </label>
            </li>
            <li>
                <input class="form-check-input" type="radio" name="countChk" id="flexCountOpt3" value="500" onchange="test.setCount(value);">
                <label class="form-check-label" for="flexCountOpt3">
                    500개
                </label>
            </li>
        </ul>
    </a>`;

    //지도 타입 선택 버튼 디자인
    var BtnTypeNormal = `<button type="button" class="btn btnMapOption btnNormal">일반지도</button>`;
    var BtnTypeSatel = `<button type="button" class="btn btnMapOption btnSatel">위성지도</button>`;
    var BtnTypeTerrain = `<button type="button" class="btn btnMapOption btnTerrain">지형지도</button>`;

    let defaultSearchList=[];
    let defaultArroundMarkerList = [];
    let movedSearchList=[];
    let movedArroundMarkerList = [];
    let movedArroundPlacesMarkerList=[];
    let stateTodata=[];
    let placeMarker;
    let currentMarker;
    let movedCenterMarker = new naver.maps.Marker();

    // 플레이스마커 띄우기
    const setPlaceMarker = (placeinfo,stateTodata) => {
        let placeLatLng =new naver.maps.LatLng(placeinfo.y, placeinfo.x);
        FMIndexMap.setCenter(placeLatLng);
        FMIndexMap.setZoom(16);
        placeMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(placeinfo.y, placeinfo.x),
            map: FMIndexMap,
            icon: {
                content: [
                    '<div class="naverApiMap-mappingMarker">',
                    '<div class="naverApiMap-mappingMarker--imageZone">',
                    '<img src="'+process.env.PUBLIC_URL+'/img/restImg.png">',
                    "</div>",
                    '<div class="naverApiMap-mappingMarker--mainZone">',
                    '<div class="naverApiMap-mappingMarker--titleZone">',
                    "<span>",
                    placeinfo.name,
                    "</span>",
                    "</div>",
                    '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                    "<span>",
                    placeinfo.tel.substring(0,2) === "02" ?
                        placeinfo.tel.replace(
                            /(\d{2})(\d{3,4})(\d{4})/,
                            "$1-$2-$3"
                        )
                        : placeinfo.tel.replace(
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
            title: placeinfo.businessNumber
        })
        naver.maps.Event.addListener(placeMarker, "click", function(e){
            searchMarkerTogOpen(stateTodata);
            detailTogClose();
            detailTogOpen(e.overlay.title);
        })
        //여기
        test.placeMarker.push(placeMarker);
    }
    

    useEffect(() => {
        //위치권한 허용
        if (navigator.geolocation) {
            //현재위치 받아오기
            navigator.geolocation.getCurrentPosition((position) => {
                cLat = position.coords.latitude;
                cLng = position.coords.longitude;
                // cLat = 35.3382;
                // cLng = 129.0305;

                if(state == null){
                // 현재위치 기반 거리 200m 내의 모든 장소 파싱
                    instance({
                        method: "get",
                        url:
                            `/franchisee?latitude=`+ cLat +
                            `&longitude=` + cLng +`&radius=200`,
                    }).then(function (res) {
                        for (let idx = 0; idx < res.data.length; idx++) {
                            defaultArroundMarkerList.push(res.data[idx]);
                            defaultSearchList.push(res.data[idx]);
                        }
                        
                        //디폴트 마커 출력 기능
                        for (
                            let idx = 0;
                            idx < defaultArroundMarkerList.length;
                            idx++
                            ) {
                                defaultArroundMarkerList[idx] = new naver.maps.Marker({
                                    position: new naver.maps.LatLng(
                                        defaultArroundMarkerList[idx].y,
                                        defaultArroundMarkerList[idx].x
                                        ),
                                        map: FMIndexMap,
                                        icon: {
                                            content: [
                                                '<div class="naverApiMap-mappingMarker">',
                                                '<div class="naverApiMap-mappingMarker--imageZone">',
                                                '<img src="'+process.env.PUBLIC_URL+'/img/restImg.png">',
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--mainZone">',
                                                '<div class="naverApiMap-mappingMarker--titleZone">',
                                                "<span>",
                                                defaultArroundMarkerList[idx].name,
                                                "</span>",
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                                                "<span>",
                                                defaultArroundMarkerList[idx].tel.substring(0,2) === "02" ?
                                                    defaultArroundMarkerList[idx].tel.replace(
                                                        /(\d{2})(\d{3,4})(\d{4})/,
                                                        "$1-$2-$3"
                                                    )
                                                    : defaultArroundMarkerList[idx].tel.replace(
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
                                        title: defaultArroundMarkerList[idx].businessNumber
                            });
                            
                            //디폴트 마커(기본 200미터 내의 장소 마커) 클릭 이벤트
                            naver.maps.Event.addListener(defaultArroundMarkerList[idx], "click", function(e){
                                searchMarkerTogOpen(defaultSearchList);
                                detailTogClose();
                                detailTogOpen(e.overlay.title);
                            })
                        }

                        //들어가자말자 디폴트 마커 리스트 왼쪽에 서치리스트로 뜨도록
                        searchMarkerTogOpen(defaultSearchList);

                        test.markers.push(defaultArroundMarkerList);
                        test.searchData.push(defaultSearchList);
                        test.doCluster();
                        
                        document.querySelector('#btnSearchListOpen').addEventListener('click',function(){searchMarkerTogOpen(defaultSearchList)});
                    }).catch(()=>{
                        toast.error('현위치 주변에 등록된 장소가 없습니다.', toast.toastdefaultOption);
                    });
                }

                //지도 센터 설정 및 축적도 수준 설정
                FMIndexMap = new naver.maps.Map("FMIndexMapDom", {
                    center: new naver.maps.LatLng(cLat, cLng),
                    zoom : 18
                });
                test.map=FMIndexMap;

                if(state != null){
                    stateTodata=[];
                    // 내플레이스 보기를 통한 이동
                    if(state.length<2){
                        instance({
                            method: "get",
                            url: "/member/" + localStorage.getItem("userId") + "/franchisee/all",
                        })
                        .then(function (res) {
                            for(let idx=0; idx<res.data.length; idx++){
                                stateTodata.push(res.data[idx]);
                            }
                            searchMarkerTogOpen(stateTodata);
                            document.querySelector('#btnSearchListOpen').addEventListener('click',function(){searchMarkerTogOpen(stateTodata)});
                        })
                        .catch((err) => {
                        });
                        setPlaceMarker(state[0],stateTodata);
                    }else{
                        //인트로 페이지 옵션설정을 통한 검색 장소 이동
                        const tempObj={
                            name:state[1].name,
                            businessNum:state[1].businessNum,
                            tel:state[1].tel,
                            rowNums:state[2]
                        }
                        instance({
                            method: "get",
                            url: "/franchisee/search",
                            params: tempObj
                        }).then(function (res) {
                            for(let idx=0; idx<res.data.franchisees.length; idx++){
                                stateTodata.push(res.data.franchisees[idx]);
                            }
                            searchMarkerTogOpen(stateTodata);
                            document.querySelector('#btnSearchListOpen').addEventListener('click',function(){searchMarkerTogOpen(stateTodata)});
                        }).catch(function(err) {
                            // failCallback(err)
                        })
                        setPlaceMarker(state[0],stateTodata);
                    }
                }

                //현재위치 마커 출력
                currentMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(cLat, cLng),
                    map: FMIndexMap,
                    icon: {
                        url: process.env.PUBLIC_URL+"/img/marker2.png",
                        size: new naver.maps.Size(40, 44),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(25, 26),
                    },
                });

                //지도 컨트롤러 설정
                naver.maps.Event.once(FMIndexMap, "init", function () {
                    //현위치 버튼
                    var BtngoCurrentLoc = new naver.maps.CustomControl(
                        BtngoCurrentLocHtml,
                        {
                            position: naver.maps.Position.RIGHT_BOTTOM,
                        }
                    );

                    //카테고리 검색 버튼존
                    var BtnArea = new naver.maps.CustomControl(BtnAreaHtml, {
                        position: naver.maps.Position.TOP_LEFT,
                    });

                    //거리검색 설정 버튼
                    var BtnSetSearchOpt = new naver.maps.CustomControl(
                        BtnSetSearchOption,
                        {
                            position: naver.maps.Position.TOP_LEFT,
                        }
                    );
                    //갯수 설정 버튼
                    var BtnSetCountOpt = new naver.maps.CustomControl(
                        BtnSetCountOption,
                        {
                            position: naver.maps.Position.TOP_LEFT,
                        }
                    );
                    //노말 지도 설정 버튼
                    var BtnSetNormal = new naver.maps.CustomControl(
                        BtnTypeNormal,
                        {
                            position: naver.maps.Position.RIGHT_TOP,
                        }
                    )
                    //위성 지도 설정 버튼
                    var BtnSetSatel = new naver.maps.CustomControl(
                        BtnTypeSatel,
                        {
                            position: naver.maps.Position.RIGHT_TOP,
                        }
                    )
                    //지형 지도 설정 버튼
                    var BtnSetTerrain = new naver.maps.CustomControl(
                        BtnTypeTerrain,
                        {
                            position: naver.maps.Position.RIGHT_TOP,
                        }
                    )
                    
                    // 지도 확대 버튼
                    var BtnSetZoomIn = new naver.maps.CustomControl(
                        BtnZoomIn,{
                            position: naver.maps.Position.RIGHT_BOTTOM,
                        }
                    )
                    // 지도 축소 버튼
                    var BtnSetZoomOut = new naver.maps.CustomControl(
                        BtnZoomOut,{
                            position: naver.maps.Position.RIGHT_BOTTOM,
                        }
                    )

                    BtnSetSearchOpt.setMap(FMIndexMap);
                    BtnSetCountOpt.setMap(FMIndexMap);
                    BtngoCurrentLoc.setMap(FMIndexMap);
                    BtnSetNormal.setMap(FMIndexMap);
                    BtnSetSatel.setMap(FMIndexMap);
                    BtnSetTerrain.setMap(FMIndexMap);
                    BtnArea.setMap(FMIndexMap);
                    BtnSetZoomIn.setMap(FMIndexMap);
                    BtnSetZoomOut.setMap(FMIndexMap);

                    //현위치 버튼 누를시 현위치 이동 기능
                    naver.maps.Event.addDOMListener(
                        BtngoCurrentLoc.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setCenter( new naver.maps.LatLng(cLat, cLng) );
                            toast.success('현위치로 이동되었습니다.', toast.toastdefaultOption);
                        }
                    );

                    //지도 확대 버튼 누를시
                    naver.maps.Event.addDOMListener(
                        BtnSetZoomIn.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setZoom(FMIndexMap.getZoom()+1);
                        }
                    );
                    //지도 확대 버튼 누를시
                    naver.maps.Event.addDOMListener(
                        BtnSetZoomOut.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setZoom(FMIndexMap.getZoom()-1);
                        }
                    );

                    //카테고리 버튼존 장소검색 눌렀을 때 이벤트 리스너
                    naver.maps.Event.addDOMListener(
                        BtnArea.getElement(),
                        "click",
                        function (e) {
                            //버튼 중복 클릭 못하도록 클릭못하도록 설정 
                            e.target.setAttribute('disabled','disabled');
                            if(e.target.getAttribute('disabled')){
                                e.target.innerHTML=`<div class="spinner-border text-primary btnhtml--spinnerzone" role="status"></div><div class="btnhtml--spinnertextzone">주변 장소 검색 중</div>`;
                            }
                            
                            //여기 부터 복사해서 마우스 다운에 넣으면 됨
                            test.removeCluster();
                            //디폴트 마커 숨기기
                            if(defaultArroundMarkerList.length>0){
                                for(let idx=0; idx<defaultArroundMarkerList.length; idx++){
                                    defaultArroundMarkerList[idx].setVisible(false);
                                }
                            }
                            //이동으로 인한 새롭게 파싱된 마커 숨기기
                            if(movedArroundPlacesMarkerList.length>0){
                                for(let idx=0; idx<movedArroundPlacesMarkerList.length; idx++){
                                    movedArroundPlacesMarkerList[idx].setVisible(false);
                                }
                            }
                            //플레이스 마커 숨기기
                            // if(placeMarker != null){
                            //     placeMarker.setVisible(false);
                            // }
                            test.removePlaceMarker();
                            
                            movedCenterMarker.setVisible(false);
                            test.movedCenterCircle.setVisible(false);

                            //이동 후 장소검색 통신
                            instance({
                                method: "get",
                                url:
                                    `/franchisee?latitude=` + FMIndexMap.getCenter()._lat +
                                    `&longitude=` + FMIndexMap.getCenter()._lng + `&radius=`+test.radius + `&rowNumMax=`+test.count,
                            }).then(function (res) { 
                                toast.success('현위치기반 장소를 검색합니다.', toast.toastdefaultOption);
                                movedArroundMarkerList=[];
                                movedSearchList=[];
                                for (let idx = 0; idx < res.data.length; idx++) {
                                    movedArroundMarkerList.push(res.data[idx]);
                                    movedSearchList.push(res.data[idx]);
                                }
                                defaultArroundMarkerList=[];
                                defaultSearchList=[];
                                movedArroundPlacesMarkerList=[];
                                for (
                                    let idx = 0;
                                    idx < movedArroundMarkerList.length;
                                    idx++
                                ) {
                                    movedArroundPlacesMarkerList[idx] = new naver.maps.Marker({
                                        position: new naver.maps.LatLng(
                                            movedArroundMarkerList[idx].y,
                                            movedArroundMarkerList[idx].x
                                        ),
                                        map: FMIndexMap,
                                        icon: {
                                            content: [
                                                '<div class="naverApiMap-mappingMarker">',
                                                '<div class="naverApiMap-mappingMarker--imageZone">',
                                                '<img src="'+process.env.PUBLIC_URL+'/img/restImg.png">',
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--mainZone">',
                                                '<div class="naverApiMap-mappingMarker--titleZone">',
                                                "<span>",
                                                movedArroundMarkerList[idx].name,
                                                "</span>",
                                                "</div>",
                                                '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                                                "<span>",
                                                movedArroundMarkerList[idx].tel.substring(0,2) === "02" ?
                                                    movedArroundMarkerList[idx].tel.replace(
                                                        /(\d{2})(\d{3,4})(\d{4})/,
                                                        "$1-$2-$3"
                                                    )
                                                    : movedArroundMarkerList[idx].tel.replace(
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
                                        title: movedArroundMarkerList[idx].businessNumber
                                    });

                                    //이동 후 파싱된 마커에 대한 클릭 이벤트
                                    naver.maps.Event.addListener(movedArroundPlacesMarkerList[idx], "click", function(e){
                                        searchMarkerTogOpen(movedSearchList);
                                        detailTogClose();
                                        detailTogOpen(e.overlay.title);
                                    });
                                }

                                //장소 검색 버튼 누름과 동시에 왼쪽 서치리스트 뜨도록
                                searchMarkerTogOpen(movedSearchList);

                                test.markers.push(movedArroundPlacesMarkerList);
                                test.searchData.push(movedSearchList);
                                test.doCluster();

                                // 장소검색 후 버튼 클릭가능하도록
                                e.target.removeAttribute('disabled');
                                e.target.innerHTML=`<img src="`+process.env.PUBLIC_URL +`/img/searchImg.png">현위치 기반 장소검색`;

                                document.querySelector('#btnSearchListOpen').addEventListener('click',function(){searchMarkerTogOpen(movedSearchList)});
                                
                            //파싱하는 범위 내에 등록된 장소가 없을 때
                            }).catch(function (error) {
                                if(error.response.status===404){
                                    toast.error('주변에 등록된 가맹점이 없습니다.', toast.toastdefaultOption);
                                    movedArroundMarkerList=[];

                                    // 장소검색 후 버튼 클릭가능하도록
                                    e.target.removeAttribute('disabled');
                                    e.target.innerHTML=`<img src="`+process.env.PUBLIC_URL +`/img/searchImg.png">현위치 기반 장소검색`;
                                }
                            });

                            // 이동에 따른 반지름 200 의 원
                            test.movedCenterCircle=new naver.maps.Circle({
                                map : FMIndexMap,
                                center : new naver.maps.LatLng(FMIndexMap.getCenter()._lat, FMIndexMap.getCenter()._lng),
                                radius : test.radius,
                                strokeColor: '#56d8f5',
                                strokeOpacity: 0.1,
                                strokeWeight: 2,
                                fillColor: '#d2f2fa',
                                fillOpacity: 0.3
                            })

                            //까지
                        }
                    );

                    //일반지도 버튼 누를시
                    naver.maps.Event.addDOMListener(
                        BtnSetNormal.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setMapTypeId(naver.maps.MapTypeId.NORMAL);
                        }
                    );

                    //위성지도 버튼 누를시
                    naver.maps.Event.addDOMListener(
                        BtnSetSatel.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setMapTypeId( naver.maps.MapTypeId.SATELLITE);
                        }
                    );

                    //지형지도 버튼 누를시
                    naver.maps.Event.addDOMListener(
                        BtnSetTerrain.getElement(),
                        "click",
                        function () {
                            FMIndexMap.setMapTypeId( naver.maps.MapTypeId.TERRAIN);
                        }
                    );
                });

                //마우스 다운 이벤트 - 지도 드래그시 지도에 존재하는 클릭마커 숨기기 //나중을 위해 냅두기
                naver.maps.Event.addListener(FMIndexMap, "mousedown", (e) => {
                    // console.log('마우스 다운');
                    //클릭마커 리스트 비우기
                    // for (var i = 0, ii = markerList.length; i < ii; i++) {
                    //     markerList[i].setMap(null);
                    // }

                    // markerList = [];
                    
                    //추가 끝
                });


                //마우스 업 이벤트 //나중을 위해 냅두기
                naver.maps.Event.addListener(FMIndexMap, "mouseup", (e) =>{
                    // console.log('마우스 업');

                    // 이동에 따른 센터 마커 생성 코드
                    // movedCenterMarker = new naver.maps.Marker({
                    //     position: new naver.maps.LatLng(FMIndexMap.getCenter()._lat, FMIndexMap.getCenter()._lng),
                    //     map: FMIndexMap,
                    //     icon: {
                    //         url: "./img/marker3.png",
                    //         size: new naver.maps.Size(43, 50),
                    //         origin: new naver.maps.Point(0, 0),
                    //         anchor: new naver.maps.Point(25, 26),
                    //     },
                    // });
                })
            });
        } else {
            // 위치권한 허용 x
        }
    }, []);

    return (
        <>
        <div id="FMIndexMapDom" className="FMIndexMapDom"></div>
        </>
    );
}

export default NaverAPIMap;

