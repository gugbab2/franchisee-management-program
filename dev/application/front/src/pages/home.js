import React from "react";
import NaverApiMap from "../apis/NaverAPIMap";
import MapOffCanvase from "../pages/MapOffCanvase";

function Home(){
  // offcanvase 옵션 배경 스크롤 허용 클릭 허용
  const options = [
    {
      name: 'Enable body scrolling',
      scroll: true,
      backdrop: false,
    }
  ];

  return (
    <div className={"outline"}>
      <div className={"container"}>
        <NaverApiMap></NaverApiMap>
        {options.map((props, idx) => (
        <MapOffCanvase key={idx} {...props} />
      ))}
      </div>
    </div>
  );
}

export default Home;
