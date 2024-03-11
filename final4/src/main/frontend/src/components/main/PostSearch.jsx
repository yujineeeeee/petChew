import React, {useState} from "react";
import searchIcon from "../../images/search.png";
import axios from "axios";

function PostSearch(props) {
    const setPostList = props.setData;
    const dbLogTags = props.tagData;

    const [searchTagText, setSearchTagText] = useState('');
    const [searchTag, setSearchTag] = useState('');


    const interestsTag = '강아지';


    const onInputTextChange = (e) => {
        setSearchTagText(e.target.value);
        console.log(`onInputTextChange : ${searchTag}`);
    }

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            onClickSearchBtn();
        }
    }

    const onClickSearchBtn = (e) => {
        setSearchTag(prevState => searchTagText);
        console.log(`바뀐값 : ${searchTag}`);

        if (searchTag === '' || searchTag === null) {
            axios.get('/selectPostList', {
                params: {interestsTag: interestsTag}
            })
                .then(res => {
                    const {result, data} = res.data;

                    if (result === 'success') {
                        setPostList(data);

                    } else {
                        console.log('리스트 불러오는 중 오류 발생')
                    }

                })
                .catch(err => {
                    console.log('에러발생');
                    console.log(err);
                })

        } else {
            axios.get('/selectPostByTag', {
                params: {searchTag: searchTag}
            })
                .then(res => {
                    const {result, data} = res.data;
                    console.log(res.data.data)
                    if (result === 'success') {
                        setPostList(data);

                        //     setGlobalState 관련해서 코드 넣어야됨 (성재씨꺼 참고)

                    } else {
                        console.log('리스트 불러오는 중 오류 발생')
                    }

                })
                .catch(err => {
                    console.log('에러발생');
                    console.log(err);
                });
        }
    }

    const onClickTagBtn = (e) => {
        setSearchTagText(e.target.value);
    }

    const onClickTagDeleteBtn = (e) => {
        const logTagIdx = e.target.value;
        // console.log(logTagIdx);

        axios.get('/deleteCurrentLog', {
            params: {logTagIdx: logTagIdx}
        })
            .then(res => {
                const {result} = res.data;

                if (result === 'success') {
                    console.log('로그삭제 완');
                    window.location.reload();
                }


            })
            .catch(err => {
                console.log('에러발생');
                console.log(err);
            })
    }


    return (
        <div>
            <div className={'row mt-2'}>
                <div className={'col'}>
                    <div className={'input-group mb-3'}>
                        <input type={'text'} className={'form-control'} placeholder={'검색할 태그 입력'}
                               onChange={onInputTextChange} onKeyDown={onKeyPress} value={searchTagText}></input>
                        <button className={'btn btn-outline-secondary'} type={'button'} onClick={onClickSearchBtn}>
                            <img src={searchIcon} alt={'searchIcon'} style={{width: '30px'}}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={'row '}>
                <div className={'col'}>
                    {
                        dbLogTags.map((item, i) => (
                            <button className={'btn m-1 shadow-sm'} key={i} style={{background: '#FFDA6A'}}
                                    value={item.logTag} onClick={onClickTagBtn}>
                                {item.logTag}
                                <button className={'btn'} value={item.logTagIdx} onClick={onClickTagDeleteBtn}>
                                    x
                                </button>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PostSearch;