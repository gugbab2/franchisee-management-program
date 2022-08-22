import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import '../css/IntroMenu.css';

import LoginModal from "./LoginModal";

const Icon = styled.i`
    width: ${(props) => props.width || "47px"};
    height: ${(props) => props.height || "70px"};
    background-position: ${(props) => props.backgruodPosion || "-845px -526px"};
    margin-bottom: ${(props) => props.marginBottom || "20px;"};

    overflow: hidden;
    display: inline-block;
    color: transparent;
    white-space: nowrap;
    vertical-align: top;
    background-image: url(/img/icons.png);
    background-size: 1788px 1080px;
`;

function IntroMenu({menus}) {
    const [showLogin, setLoginShow] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("userName"));

    const closeLoginModal = () => {
        setLoginShow(false);
    };
    const showLoginModal = () => {
        setLoginShow(true);
    };

    return (
        <>
            <LoginModal showLogin={showLogin} closeLoginModal={closeLoginModal} setUsername={setUsername}/>
            <div className="menu">
                <ul className="menu__list">
                    {
                        menus.map( (menu,idx) => {
                            if(localStorage.getItem('accessToken') != null){
                                return(
                                    <li key={menu.text} className="menu__item">
                                        <Link className="menu__link" to={menu.to}>
                                            <Icon 
                                                width={menu.width} 
                                                height={menu.height} 
                                                backgruodPosion={menu.backgruodPosion} 
                                                marginBottom={menu.marginBottom} />
                                            <div className="menu__link__text">{menu.text}</div>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return(
                                    <li key={menu.text} className="menu__item">
                                        <div onClick={showLoginModal} className="menu__link" >
                                            <Icon 
                                                width={menu.width} 
                                                height={menu.height} 
                                                backgruodPosion={menu.backgruodPosion} 
                                                marginBottom={menu.marginBottom} />
                                            <div className="menu__link__text">{menu.text}</div>
                                        </div>
                                    </li>
                                );
                            }
                        })
                    }

                    <li className="menu__item">
                        <Link className="menu__link" to="/franchiseeFind">
                            <Icon 
                                width="61px" 
                                height="61px" 
                                backgruodPosion="-1720px -945px"
                                marginBottom="29px" />
                            <div className="menu__link__text">업체 찾기</div>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link className="menu__link" to="/docs">
                            <Icon 
                                width="59px" 
                                height="57px" 
                                backgruodPosion="-1253px -697px" 
                                marginBottom="33px" />
                            <div className="menu__link__text">API 서비스</div>
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link className="menu__link" to="/map">
                            <Icon 
                                width="59px" 
                                height="78px" 
                                backgruodPosion="-784px -600px" 
                                marginBottom="12px" />
                            <div className="menu__link__text">지도 보기</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default IntroMenu;
