import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import ic_comment from '../../images/icon/ic_comment.png';
import ic_delete from '../../images/icon/ic_delete.png';
import ic_kakao from '../../images/icon/ic_kakao.png';

function ProfilePost(props) {

  const fileUrl = props.fileUrl;
  const postIdx = props.postIdx;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalIsOpen(false);

    document.body.style.overflow = 'unset';
  };

  const ModalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '10%',
      left: '50%', // 수정된 부분
      transform: 'translateX(-50%)', // 수정된 부분
      right: '20%',
      bottom: '10%',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5%',
      outline: 'none',
      padding: '5%',
      scrollbarWidth: 'none'
    }
  }

  const [postInfo, setPostInfo] = useState({
    postIdx: '',
    postId: '',
    postDate: '',
    postContent: '',
    postTag: '',

    fileList: [],
    cmtList: []
  });

  const onClickDeleteBtn = (e) => {
    const postIdx = parseInt(e.target.value);

    console.log(postIdx);

    if (window.confirm('삭제하시겠습니까?')) {
      axios.get('/deletePost', {
        params: {postIdx: postIdx}
      })
        .then(res => {

          const {result} = res.data;

          if (result === 'success') {
            alert('삭제되었습니다.');
            window.location.reload();

          } else {
            alert('삭제실패');
          }

        })
        .catch(err => {
          console.log('데이터 삭제 중 에러발생');
          console.log(err);
        })
    }
  }

  const onClickShareButton = () => {
    // 카카오링크 공유하기
    if (window.Kakao) {
      window.Kakao.init('c11c8ba1be76ff6d2e6355e9bec56148');
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '카카오톡으로 공유하기',
          description: '카카오톡으로 이 링크를 공유합니다.',
          imageUrl: '이미지 URL', // 게시글의 이미지 URL 설정
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '게시글 보러 가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      console.error('Kakao SDK가 로드되지 않았습니다.');
    }
  };


  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = '//developers.kakao.com/sdk/js/kakao.min.js';
    kakaoScript.async = true;
    document.body.appendChild(kakaoScript);

    axios.get('/selectProfilePost', {
      params: {postIdx: postIdx}
    })
      .then(res => {
        const {result, data} = res.data;

        if (result === 'success') {
          setPostInfo(data);


        } else {
          console.log('리스트 불러오는 중 오류 발생')
        }

      })
      .catch(err => {
        console.log('게시물 불러오는 중 에러발생');
        console.log(err);
      })

  }, []);


  return (
    <div className={'profile-post-square'}>
      <div className={''} onClick={openModal}>
        <img src={fileUrl} alt={postIdx} className={'profile-post-image'}/>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyle} className={'modalwidth mx-auto'}>
        <div id={postInfo.postIdx} className={'carousel slide'}>
          <div className="carousel-indicators">
            {
              postInfo.fileList.map((file, index, array) => {
                return (
                  <button type={'button'}
                          data-bs-target={`#${postInfo.postIdx}`}
                          data-bs-slide-to={index}
                          className={`${index === 0 ? 'active' : ''} ${array.length === 1 ? 'd-none' : ''}`}
                          aria-current={'true'}
                          aria-label={`Slide ${index + 1}`}
                          key={index}/>
                )
              })
            }
          </div>
          <div className="carousel-inner">
            {
              postInfo.fileList.map((file, index) => {
                return (
                  <div
                    className={`carousel-item ${index === 0 ? 'active' : ''} post-image-container`}>
                    <img src={file.fileAddress}
                         className={'d-block w-100 post-image'}
                         alt={'postImage'} key={index}/>
                  </div>
                )
              })
            }
          </div>
          <button
            className={`carousel-control-prev ${postInfo.fileList.length === 1 ? 'd-none' : ''}`}
            type={'button'}
            data-bs-target={`#${postInfo.postIdx}`} data-bs-slide={'prev'}>
                                                <span className={'carousel-control-prev-icon'}
                                                      aria-hidden={'true'}></span>
            <span className={'visually-hidden'}>Previous</span>
          </button>
          <button
            className={`carousel-control-next ${postInfo.fileList.length === 1 ? 'd-none' : ''}`}
            type={'button'}
            data-bs-target={`#${postInfo.postIdx}`} data-bs-slide={'next'}>
                                                <span className={'carousel-control-next-icon'}
                                                      aria-hidden={'true'}></span>
            <span className={'visually-hidden'}>Next</span>
          </button>
        </div>

        <div className={'h20'}>
          <div className={'row mt-3'}>
            <div className={'col me-auto'}></div>
            <div className={'col-auto'}>
              <button className={'btn mx-auto '} onClick={onClickShareButton}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={ic_kakao} alt="Share" className={'icon-size'}/>
                  {/*<p style={{marginLeft: '5px', marginBottom: '0'}}></p>*/}
                </div>
              </button>
              <button onClick={onClickDeleteBtn}
                      className={'btn me-2 justify-content-end'}
                      value={postInfo.postIdx}>
                <img src={ic_delete} alt={'icon'} className={'icon-size'}/>
              </button>
            </div>
          </div>

          <div className={'row align-items-center justify-content-center'}>
            <div className={'col-2 fw-bold font_fluid_s'}>
              {postInfo.postId}
            </div>
            <div className={'col'}>
              {postInfo.postContent}
            </div>
          </div>

          <div className={'row align-items-center justify-content-center'}>
            <div className={'col-2 fw-bold font_fluid_s'}>
              태그
            </div>
            <div className={'col'}>
              {postInfo.postTag}
            </div>
          </div>
        </div>

        <hr/>

        <div className={'row'}>
          <div className={'col d-flex justify-content-center fw-bold fs-4 '}>
            [댓글]
          </div>
        </div>

        {
          postInfo.cmtList && Array.isArray(postInfo.cmtList) && postInfo.cmtList
            .map((cmt, i) => {
              return (
                <div className="col mb-3">
                  <div className={'row'}>
                    <div className={'col'}>
                      <div>
                        <span className={'fw-bold'}>{cmt.postCmtId}</span>
                        <span className={'text-secondary'}> {cmt.postCmtDate}</span>
                      </div>
                      <div>
                        {cmt.postCmtContent}
                      </div>
                    </div>
                    <div className={'col-1'}>
                      {/*<button*/}
                      {/*  className="btn bg-secondary-subtle me-2 justify-content-end" onClick={''}*/}
                      {/*  data-post-idx={cmt.postIdx} data-cmt-idx={cmt.postCmtIdx}>*/}
                      {/*  x*/}
                      {/*</button>*/}
                    </div>
                  </div>
                </div>
              )
            })
        }
        {/* 댓글 입력 폼 */}
        {/*<div className="col-auto">*/}
        {/*  <form onSubmit={(e) => CmtSubmit(e, cmtpostidx)}>*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      placeholder="댓글을 입력하세요"*/}
        {/*      value={cmtinput}*/}
        {/*      onChange={(e) => setcmtinput(e.target.value)}*/}
        {/*    />*/}
        {/*    <button type="submit">댓글 작성</button>*/}
        {/*  </form>*/}
        {/*</div>*/}

      </Modal>

    </div>
  );
}

export default ProfilePost;