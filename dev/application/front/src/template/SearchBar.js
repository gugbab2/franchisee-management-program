import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup } from "react-bootstrap";
import { TbSearch } from "react-icons/tb";
import "../css/SearchBar.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar({ searchResultTogOpen, detailTogClose,keyword }) {

    const toastDefaultOption = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }

    return (
        <>
            <div className="searchArea">
                <div className="searchArea--Input">
                    <InputGroup className="mb-4" id="searchArea--InputForm">
                        <input
                            type="text"
                            id="searchArea__searchInput"
                            placeholder="검색내용"
                            onKeyDown={(e)=>{
                                if(e.key==='Enter') {
                                    keyword=document.getElementById('searchArea__searchInput').value;
                                    detailTogClose();
                                    if(document.getElementById('searchArea__searchInput').value.startsWith(' ') || document.getElementById('searchArea__searchInput').value===''){
                                        toast.error('공백으로 시작되는 문자열은 검색할 수 없습니다',toastDefaultOption);
                                    }else{
                                        searchResultTogOpen(keyword);
                                    }
                                };
                            }}
                        />
                        <button
                            id="searchArea--Input__searchBtn"
                            onClick={()=>{
                                keyword=document.getElementById('searchArea__searchInput').value;
                                detailTogClose();
                                if(document.getElementById('searchArea__searchInput').value.startsWith(' ') || document.getElementById('searchArea__searchInput').value===''){
                                    toast.error('공백으로 시작되는 문자열은 검색할 수 없습니다',toastDefaultOption);
                                }else{
                                    searchResultTogOpen(keyword);
                                }
                            }}
                        >
                            <TbSearch
                                id="searchArea--Input__searchIcon"
                                size="24"
                            />
                        </button>
                    </InputGroup>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
