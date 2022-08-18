import { Link } from 'react-router-dom';
import '../css/IntroMyFranchisee.css'
import React, { useContext, useEffect, useState } from 'react';
import { instance } from '../template/AxiosConfig/AxiosInterceptor';
import { BusinessContext } from "../pages/Home";

function IntroMyFranchisee() {
    const franchiseeList = useContext(BusinessContext);
    const [list, setList] = useState([]);
    const [franPage, setFranPage] = React.useState(1);
    const [searchCount, setSearchCount] = useState(0);

    useEffect(() => {
        instance({
            method: "get",
            url: `/member/` + localStorage.getItem("userId") + `/franchisee`,
            params: { page: franPage },
        })
            .then(function (res) {
                setSearchCount(res.data.searchCount);
                setList(res.data.franchisees);
                setFranPage(franPage);
            })
            .catch((err) => {
            });
    }, []);

    const checkNameCount = (value) => {
        if (value.length > 8) {
            return value.substr(0, 8) + ' ...';
        } else return value;
    };

    return (
        <>
            {franchiseeList.franchiseeList.length > 0 ? (
                <>
                    <div className="main__area">
                        <div className="main__header">
                            <span className="main__title">내 가맹점</span>
                            <span className="main__num">{searchCount}</span>
                            <Link to='/mypage' className="main__link__title">전체보기</Link>
                        </div>
                        <div className="main__content__list">
                            {
                                franchiseeList.franchiseeList.map((ele, idx) => {
                                    if (idx < 3) {
                                        return (
                                            <div key={ele.name} className='main__content__wrap'>
                                                <Link
                                                    to={"/businessDetail"}
                                                    state={{ businessNumber: `${ele.businessNumber}`, list: { list }, searchCount: { searchCount }, data: { ele }, franPage: { franPage } }}
                                                    className="main__content"
                                                >
                                                    <div className="main__thumbnail">
                                                        <img alt='FranchiseeImg' style={{ width: "100%", height: '60px' }} src={ele.firstImg} />
                                                    </div>
                                                    <div className="main__content__name">
                                                        <span>{checkNameCount(ele.name)}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )

    {
        franchiseeList.franchiseeList.map((ele, idx) => {
            return (
                <div>{ele.name}</div>
            )
        })
    }

}

export default IntroMyFranchisee;