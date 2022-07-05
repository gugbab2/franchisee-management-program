import React, { useState } from 'react';
import MapOffCanvase from './MapOffCanvase';


//테스트로 만든 페이지 입니다
const options = [
  {
    name: 'Enable body scrolling',
    scroll: true,
    backdrop: false,
  }
];

function Example() {
  return (
    <>
      {options.map((props, idx) => (
        <MapOffCanvase key={idx} {...props} />
      ))}
    </>
  );
}

export default Example;