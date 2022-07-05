import React, { useState } from "react";
import NaverApiMap from "../apis/NaverAPIMap";
import MapOffCanvase from './MapOffCanvase';

function Home(){
  // offcanvase 옵션 배경 스크롤 허용 클릭 허용
  const options = 
    {
      name: 'Enable body scrolling',
      scroll: true,
      backdrop: false,
    }
  

  let [toggle, setToggle] = useState(false);

  const callback = () => {
    setToggle(toggle=!toggle);
    // console.log(toggle);
  }

  return (
    <div className={"outline"}>
      <div className={"container"}>
        <NaverApiMap callback={callback}></NaverApiMap>

        <MapOffCanvase options={options} tog={{toggle,setToggle}} />

      </div>
    </div>
  );
}

export default Home;
