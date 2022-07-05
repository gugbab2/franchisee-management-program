import React, { useEffect } from "react";

const {naver} = window;

function NaverAPIMap({callback}) {
  let FMIndexMap;
  let cLat,cLng;

  let markerList = [];
  // let menuLayer = ['<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>'];
  
  //지도 클릭시 마커 생성에 대한 infowindow 설정
  let contentString = '<h1>장소</h1>';
  let infowindow = new naver.maps.InfoWindow({
    content: contentString
  });

  useEffect(() => {
    //위치권한 허용
    if(navigator.geolocation){
    //현재위치 받아오기
      navigator.geolocation.getCurrentPosition((position)=>{
        cLat= position.coords.latitude;
        cLng = position.coords.longitude;
        FMIndexMap= new naver.maps.Map('FMIndexMapDom',{
          center: new naver.maps.LatLng(cLat, cLng),
        });

        //현재위치 마커 출력
        let currentMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(cLat, cLng),
          map: FMIndexMap,
          icon: {
            url: 'markerPng',
            size: new naver.maps.Size(50, 52),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 26),
          },
        });

        // 인포윈도우 클릭 -> 오프캔퍼스 출력
        // infowindow.addListener(FMIndexMap,'click', (e) => {
          
        // });

        //클릭시 마커 생성 및 마커 옆에 위경도 출력(개발을 위해서 냅둠)
        
        naver.maps.Event.addListener(FMIndexMap, 'click', (e) => {
          currentMarker = new naver.maps.Marker({
            position: e.coord,
            map: FMIndexMap,
          });
          
          infowindow.open(FMIndexMap, currentMarker, callback());

          let coordHtml =
          'lat: ' + e.coord._lat + '<br />' +
          'lng: ' + e.coord._lng;

          markerList.push(currentMarker);

          naver.maps.Event.addListener(FMIndexMap, 'mousedown', (e) => {
            infowindow.close();
          });
        });

        //지도 드래그시 지도에 존재하는 기존의 마커 숨기기
        naver.maps.Event.addListener(FMIndexMap, 'mousedown', (e) => {
          for (var i=0, ii=markerList.length; i<ii; i++) {
              markerList[i].setMap(null);
          }

          markerList = [];
          infowindow.close();
        });
      })
    }else{
      // 위치권한 허용 x
    }
  },[]);

  const currentLoc = ()=>{
    //setCenter를 통해서 현위치의 정보로 센터를 맞춤
    FMIndexMap.setCenter(new naver.maps.LatLng(cLat, cLng));
  }

  return (
    <>
      <div id='FMIndexMapDom' className="FMIndexMapDom" style={{ width : '100%', height:'550px'}}></div>
      <button onClick={currentLoc}>현 위치</button>

    </>
  )
}

export default NaverAPIMap;