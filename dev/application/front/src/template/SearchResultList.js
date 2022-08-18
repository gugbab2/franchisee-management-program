import React from "react";
import { Offcanvas, Card } from "react-bootstrap";
import "../css/SearchResultList.css";
import { TbBoxOff } from 'react-icons/tb';
import { instance } from './AxiosConfig/AxiosInterceptor';
import { Pagination, Stack } from "@mui/material";

function SearchResultList({ options, resultTog, searchData, detailSearchTogOpen, detailTogClose, keyword }) {
    const resultClose = () => {
        detailTogClose();
        resultTog.setsearchResultToggle(false);
    }

    const [searchPage, setSearchPage] = React.useState(1);
    const moreSearchAjax = (value) => {
        instance({
            method: "get",
            url:
                `/franchisee/search/keyword?keyword=` + keyword,
            params: { page: value },
        }).then(function (res) {
            searchData.setSearchData(res.data);
            setSearchPage(searchPage);
        });
    };
    const handleChange = (event, value) => {
        setSearchPage(value);
        moreSearchAjax(value);
    };

    return (
        <>
            <Offcanvas
                className={"searchResultlist-offcanvas"}
                show={resultTog.searchResultToggle}
                onHide={resultClose}
                {...options}
            >
                <Offcanvas.Header closeButton className="searchResultlist-offcanvas--headerzone">
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className={"searchResultlist-offcanvasbody--bodyzone"}
                    style={{ marginTop: "20px" }}
                >
                    {(() => {
                        if (searchData.searchData.searchCount > 0) {
                            //키워드검색
                            return searchData.searchData.franchisees.map((ele, idx) => {
                                return (
                                    <div key={idx}>
                                        <Card className="searchResultlist-offcanvasbody--cardzone"
                                            onClick={() => { detailSearchTogOpen(ele.businessNumber, ele); }}
                                        >
                                            <Card.Body>
                                                <Card.Title className="searchResultlist-offcanvasbody--textzone">
                                                    <Card.Text className="searchResultlist-offcanvasbody__title">
                                                        {ele.name}
                                                    </Card.Text>
                                                    <Card.Text className="text-muted searchResultlist-offcanvasbody__tel">
                                                        {ele.tel.substring(0, 2) === "02" ? ele.tel.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3") : ele.tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3")}
                                                    </Card.Text>
                                                    <Card.Text className="text-muted searchResultlist-offcanvasbody__intro">
                                                        {ele.intro}
                                                    </Card.Text>
                                                </Card.Title>
                                                <Card.Img
                                                    className="searchResultlist-offcanvasbody--cardzone__img"
                                                    variant="right"
                                                    src={`${process.env.REACT_APP_SERVER_URL}${ele.firstImg}`}
                                                />
                                            </Card.Body>
                                        </Card>
                                        {(() => {
                                            if (idx === searchData.searchData.franchisees.length - 1) {
                                                return (
                                                    <Stack spacing={2}>
                                                        <Pagination count={Math.ceil(searchData.searchData.searchCount / 10)} color="primary" onChange={handleChange} />
                                                    </Stack>
                                                );
                                            }
                                        })()}
                                    </div>
                                );
                            })
                        } else if (searchData.searchData.length > 0) {
                            //주변장소 검색
                            return searchData.searchData.map((ele, idx) => {
                                return (
                                    <div key={idx} >
                                        <Card className="searchResultlist-offcanvasbody--cardzone"
                                            onClick={() => { detailSearchTogOpen(ele.businessNumber, ele); }}
                                        >
                                            <Card.Body>
                                                <Card.Title className="searchResultlist-offcanvasbody--textzone">
                                                    <Card.Text className="searchResultlist-offcanvasbody__title">
                                                        {ele.name}
                                                    </Card.Text>
                                                    <Card.Text className="text-muted searchResultlist-offcanvasbody__tel">
                                                        {ele.tel.substring(0, 2) === "02" ? ele.tel.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3") : ele.tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3")}
                                                    </Card.Text>
                                                    <Card.Text className="text-muted searchResultlist-offcanvasbody__intro">
                                                        {ele.intro}
                                                    </Card.Text>
                                                </Card.Title>
                                                <Card.Img
                                                    className="searchResultlist-offcanvasbody--cardzone__img"
                                                    variant="right"
                                                    src={`${process.env.REACT_APP_SERVER_URL}${ele.firstImg}`}
                                                />
                                            </Card.Body>
                                        </Card>
                                        {/* {(()=>{
                                            if(idx%10===0 && idx>0){
                                                return (
                                                    <Stack spacing={2}>
                                                        <Pagination count={Math.ceil(searchData.searchData.length / 10)} color="primary" />
                                                    </Stack>
                                                );
                                            }
                                        })()} */}
                                    </div>
                                );
                            })
                        } else {
                            //검색결과 없을 때
                            return (
                                <>
                                    <Card className="searchResultlist-offcanvasbody--defaultzone">
                                        <Card.Body>
                                            <Card.Text>
                                                <TbBoxOff style={{ color: '#4187f5', fontSize: '30pt' }} />
                                            </Card.Text>
                                            <Card.Text>
                                                검색된 결과가 없습니다.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                            );
                        }
                    })()
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SearchResultList;
