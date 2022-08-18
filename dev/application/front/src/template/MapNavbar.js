import "../css/MapNavbar.css";
import {FaHouseUser} from 'react-icons/fa';
import {GoChecklist} from 'react-icons/go';
import {BiUserCircle} from 'react-icons/bi';
import {Card} from 'react-bootstrap';
import React, { useState } from "react";
import { instance } from "./AxiosConfig/AxiosInterceptor";
import { useNavigate } from "react-router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from "bootstrap";

const { naver } = window;

function MapNavbar({detailTogOpen, detailTogClose, searchMarkerTogOpen}){
    const toastDefaultOption = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };
    const [username, setUsername] = useState(localStorage.getItem("userName"));

    const [showRegister, setRegisterShow] = useState(false);

    const showRegisterModal = () => {
        setRegisterShow(true);
    };

    const closeRegisterModal = () => {
        setRegisterShow(false);
    };

    const [showLogin, setLoginShow] = useState(false);

    const showLoginModal = () => {
        setLoginShow(true);
    };

    const closeLoginModal = () => {
        setLoginShow(false);
    };

    let navigate = useNavigate();
    let placeMarker;
    let placeMarkerList=[];

    const logoutHandler = () => {
        instance({
            method: "post",
            url: "/sign/signout",
            data: {
                email: localStorage.getItem('email'),
                accessToken : localStorage.getItem('accessToken')
            },
        }).then(function (res) {
            localStorage.clear();
            setUsername("");
            toast.success('로그아웃 되었습니다', toastDefaultOption);
            window.location.reload();
            // navigate('./')

        }).catch(function(err){
            localStorage.clear();
            setUsername("");
            toast.error('이미 로그인되어져 있습니다', toastDefaultOption);
            navigate('./')
        });
    };

    const showMyPlace = (e) => {
        if(localStorage.getItem("userId") != null){

            // 버튼 못누르게
            console.log('시작',document.getElementById('showPlacebtn'));
            e.target.setAttribute('disabled','disabled');
            if(e.target.getAttribute('disabled')){
                document.getElementById('showPlacebtn').innerHTML=`<div class="spinner-border text-primary btnhtml--spinnerzone" role="status"></div>`;
            //     e.target=`<div class="spinner-border text-primary btnhtml--spinnerzone" role="status"></div>`;
            }
            


            test.removeCluster();
            test.movedCenterCircle.setVisible(false);
            instance({
                method: "get",
                url: "/member/" + localStorage.getItem("userId") + "/franchisee/all",
            })
            .then(function (res) {
                placeMarkerList=[];
                for(let idx=0; idx<res.data.length; idx++){
                    let placeLatLng =new naver.maps.LatLng(res.data[idx].y, res.data[idx].x);
                    placeMarker = new naver.maps.Marker({
                        position: placeLatLng,
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
                                res.data[idx].name,
                                "</span>",
                                "</div>",
                                '<div class="naverApiMap-mappingMarker--phoneNumberZone">',
                                "<span>",
                                res.data[idx].tel.substring(0,2) === "02" ?
                                    res.data[idx].tel.replace(
                                        /(\d{2})(\d{3,4})(\d{4})/,
                                        "$1-$2-$3"
                                    )
                                    : res.data[idx].tel.replace(
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
                        title: res.data[idx].businessNumber
                    })
                    naver.maps.Event.addListener(placeMarker, "click", function(e){
                        // console.log(res.data);
                        searchMarkerTogOpen(res.data);
                        // console.log(stateTodata);
                        detailTogClose();
                        detailTogOpen(e.overlay.title);
                    })
                    placeMarkerList.push(placeMarker);
                    //여기
                    // test.placeMarker.push(placeMarker);
                }
                test.markers.push(placeMarkerList);
                test.searchData.push(res.data);
                test.doCluster();

                // 버튼 다시 누를수 있도록
                // console.log('끝',e.target.innerHTML);
                e.target.removeAttribute('disabled');
                document.getElementById('showPlacebtn').innerHTML=`<li onClick={{showMyPlace(e)}} id='showPlacebtn'><img src="`+process.env.PUBLIC_URL+`/img/myfrenbtnImg.png" type='button'/></li>`;
            })
            // =`<img src="`+process.env.PUBLIC_URL +`/img/searchImg.png">현위치 기반 장소검색`
            .catch((err) => {
            });
        }else{
            alert('로그인 후 이용 가능합니다');
        }
        
    }

    return(
        <>
            <div className="MapNavbar-navArea">
                <ul className="nav flex-column MapNavbar-navArea--listZone">
                    <li className="nav-item MapNavbar-navArea__title">
                        <a className="nav-link MapNavbar-navArea__img" href="/"><img src={process.env.PUBLIC_URL+"/favicon.ico"}></img></a>
                    </li>
                    <li className="nav-item MapNavbar-navArea--buttonzone">
                        <ul style={{listStyle:'none', padding:'0px'}}>
                            {/* <li><a className="nav-link" href="/mypage" role='button'><FaHouseUser style={{fontSize:'30px'}}/></a></li> */}
                            <li><a className="nav-link" href="/mypage" role='button'><img src={process.env.PUBLIC_URL+"/img/mypagebtnImg.png"} style={{width:'30px'}}/></a></li>
                            {/* <li><button className="nav-link" onClick={(e)=>{showMyPlace(e)}}><GoChecklist style={{fontSize:'30px'}}/></button></li> */}
                            <li onClick={(e)=>{showMyPlace(e)}} id='showPlacebtn'><img src={process.env.PUBLIC_URL+"/img/myfrenbtnImg.png"} type='button'/></li>
                        </ul>
                    </li>
                    <li className="nav-item MapNavbar-navArea__userInfozone btn dropend">
                        {/* <BiUserCircle style={{fontSize:'40px', color:'#4287f5'}} className="dropdown-toggle" type="button" id="userdropdown" data-bs-toggle="dropdown" aria-expanded="false"/> */}
                        <img src={process.env.PUBLIC_URL+'/img/usericonImg.png'} className="dropdown-toggle" type="button" id="userdropdown" data-bs-toggle="dropdown" aria-expanded="false"/>
                        <ul className="dropdown-menu MapNavbar-userdropdownzone" aria-labelledby="userdropdown" data-popper-placement="right-start">
                            {(() => {
                                    if(localStorage.getItem("accessToken")){
                                        return(
                                            <>
                                                <Card.Header className="MapNavbar-userinfoTextzone">
                                                    <img src={process.env.PUBLIC_URL+"/img/usermarker.png"} alt="유저사진"/>
                                                    <div className="MapNavbar-userinfoTextzone__text">
                                                        {username} 님 환영합니다.
                                                        <p>{localStorage.getItem('email')}</p>
                                                    </div>
                                                    <button onClick={logoutHandler}>로그아웃</button>
                                                </Card.Header>
                                                <li role="button" className="dropdown-item">
                                                    <a className="dropdown-item" href="/mypage">
                                                        마이페이지
                                                    </a>
                                                </li>
                                            </>
                                        )
                                    }else{
                                        return(
                                            <>  
                                                <li role="button" className="MapNavbar-defaultButton">
                                                    <p
                                                        className="dropdown-item"
                                                        onClick={showRegisterModal}
                                                    >
                                                        회원가입
                                                    </p>
                                                    <RegisterModal showRegister={showRegister} closeRegisterModal={closeRegisterModal}/>
                                                </li>
                                                <li role="button" className="MapNavbar-defaultButton">
                                                    <p
                                                        className="dropdown-item"
                                                        onClick={showLoginModal}
                                                    >
                                                        로그인
                                                    </p>
                                                    <LoginModal showLogin={showLogin}  closeLoginModal={closeLoginModal} setUsername={setUsername}/>
                                                </li>
                                            </>
                                        )
                                    }
                                })()
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MapNavbar;