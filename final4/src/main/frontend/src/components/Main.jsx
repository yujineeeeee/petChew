import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "./chatbot/Button";
import PostSearch from "./main/PostSearch";
import PostRead from "./main/PostRead";
import PostWrite from "./main/PostWrite";
import AnimalHosp from "./hospital/AnimalHosp";
import Shop from "./shop/Shop";
import LogoArea from "./main/LogoArea";
import "../App.css"
import "./styles/global.css";
import searchIcon from "../images/search.png";
import {useNavigate} from "react-router-dom";
import Footer from "./layout/Footer";
import Profile from "./profile/Profile";


function Main(props) {

    const [postList, setPostList] = useState([{
        postIdx: '',
        postId: '',
        postDate: '',
        postContent: '',
        postTag: '',
        postHitCnt: '',
        fileList: []
    }]);

    const [edit, setEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // // 검색한 태그 보여주기 관련
    const [dbLogTags, setDBLogTags] = useState([]);

    // // 글쓰기 시 사진 미리보기 관련
    const [showImages, setShowImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
        // Axios를 사용하여 서버에서 사용자 정보 가져오기
        axios.get("/api/user/getuserprofile", {params:{id:'test1'}})
            .then(response => {
                const userData = response.data;
                // console.log(userData)
                axios.get('/selectPostList', {
                    params: {interestsTag: userData.interestsTag}
                })
                    .then(res => {
                        // console.log(userData.interestsTag)
                        // console.log(res.data)
                        const {result, data} = res.data;

                        if (result === 'success') {
                            setPostList(data);
                            // console.log(data)
                        } else {
                            console.log('리스트 불러오는 중 오류 발생')
                        }
                    })
                    .catch(err => {
                        console.log('리스트 불러오는 중 에러발생');
                        console.log(err);
                    })
            })
            .catch(error => console.error("에러:", error));
    },[]);

    useEffect(() => {
        //   log_tag 데이터 가져오기
        axios.get("/getLogList")
            .then(res => {

                const {result, data} = res.data;

                if (result === 'success') {
                    setDBLogTags(data);

                } else {
                    console.log('logList 불러오는 중 오류 발생');
                }

            })
            .catch(err => {
                console.log('오류 발생');
                console.log(err);
            })

    }, [postList]);



    const [currentPage, setCurrentPage] = useState(0);
    // 0: 메인(검색), 1: 글쓰기, 2: 동물병원, 3:쇼핑몰





    return (
        <div className={'container row'}>
            <div>
                <Button currentPageData={currentPage} setCurrentPageData={setCurrentPage} />
            </div>

            {/*검색 관련 */}
            <div className={'col-4'}>
                <LogoArea setCurrentPageData={setCurrentPage} />
                {
                    currentPage===0 ?
                        edit ?
                            '' :<PostSearch setData={setPostList} tagData={dbLogTags} />
                        :
                        ''
                }
            </div>



            {/* 메인 피드*/}
            <div className={'col mt-2'}>
                {
                    currentPage===0 ?
                        edit ? <PostWrite showImageData={showImages} setShowImageData={setShowImages} editData={edit} setEditData={setEdit}
                                          currentImageIndexData={currentImageIndex} setCurrentImageIndexData={setCurrentImageIndex}
                                          currentIndexData={currentIndex}/>
                            :
                            <PostRead postListData={postList} editData={edit} setEditData={setEdit}/>
                        :
                        ''
                }

                {
                    currentPage===1 ?
                        <div>
                            <AnimalHosp />

                        </div>
                        :
                        ''
                }

                {
                    currentPage===2 ?
                        <div className={'main-container no-scroll'}>
                            <Shop />
                        </div>
                        :
                        ''
                }

                {
                  currentPage===3 ?
                    <div className={'main-container no-scroll'}>
                      <Profile/>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
}

export default Main;