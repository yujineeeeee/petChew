import React, {useEffect, useState} from "react";
import axios from "axios";
import ic_comment from '../../images/icon/ic_comment.png';
import ic_delete from '../../images/icon/ic_delete.png';
import ic_kakao from '../../images/icon/ic_kakao.png';
import searchIcon from "../../images/search.png";



function PostRead(props) {
  const postList = props.postListData;

  const edit = props.editData;
  const setEdit = props.setEditData;
  const [isCmtActive, setIsCmtActive] = useState(false);
//댓글 출력매개변수용
  const [cmtpostidx, setcmtpostidx] = useState("");
  // 댓글 입력폼용
  const [cmtinput, setcmtinput] = useState("");


  useEffect(() => {
    // 카카오링크 SDK 로드
    const kakaoScript = document.createElement('script');
    kakaoScript.src = '//developers.kakao.com/sdk/js/kakao.min.js';
    kakaoScript.async = true;
    document.body.appendChild(kakaoScript);
  }, []);

  useEffect(() => {
  // console.log(postList)
  }, []);


  // // 댓글 입력 버튼
  const CmtSubmit = (e, postIdx) => {
    e.preventDefault();

    // 검증: cmtinput이 빈 문자열인지 확인
    if (cmtinput.trim() === '') {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    console.log(cmtinput);
    console.log(postIdx);

    axios.post("/insertComment", null, {
      params: {
        postIdx: postIdx,
        postCmtId: 'test1',
        postCmtContent: cmtinput
      }
    })
        .then(response => {
          // console.log(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error("에러:", error);
        });

    // 댓글 입력 후 입력값 초기화
    setcmtinput('');
  }

  //댓글 삭제 버튼
  const deletecmt = (e) => {
    e.preventDefault();

    const postIdx = e.target.dataset.postIdx;
    const cmtIdx = e.target.dataset.cmtIdx;
    console.log(cmtIdx)

    axios.post("/deleteCmt",null, {
      params: {
        postIdx: postIdx,
        postCmtIdx: cmtIdx
      }
    })
        .then(response => {
          // console.log(response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error("에러:", error);
        });
  }

  const handleCmtSection = (postIdx) => {
    // Do something with postIdx
    // console.log('Post Index:', postIdx);
    setcmtpostidx(postIdx);
  }
  //댓글창 닫기버튼
  const closeModal = () => {
    setIsCmtActive(false);
  };

  const handleEdit = () => {
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

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


  return (
    <div>
      <div className={'row mb-2'}>
        <div className={'col-sm'}>
          <button type={'button'} onClick={handleEdit} className={'btn circleBtn shadow-sm'}>
            <b style={{fontSize: '25px'}}>+</b>
          </button>
        </div>
      </div>

      <div className={'feed-container no-scroll p-1'} style={{background: '#FAF8F8'}}>
        {
          postList.map((item, i) => {
            return (
              <div className={' p-3 border-bottom mb-4'} key={i}>
                <div className={'h70'}>
                  <div id={item.postIdx} className={'carousel slide'}>
                    <div className="carousel-indicators">
                      {
                        item.fileList.map((file, index, array) => {
                          return (
                            <button type={'button'}
                                    data-bs-target={`#${item.postIdx}`}
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
                        item.fileList.map((file, index) => {
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
                      className={`carousel-control-prev ${item.fileList.length === 1 ? 'd-none' : ''}`}
                      type={'button'}
                      data-bs-target={`#${item.postIdx}`} data-bs-slide={'prev'}>
                                                <span className={'carousel-control-prev-icon'}
                                                      aria-hidden={'true'}></span>
                      <span className={'visually-hidden'}>Previous</span>
                    </button>
                    <button
                      className={`carousel-control-next ${item.fileList.length === 1 ? 'd-none' : ''}`}
                      type={'button'}
                      data-bs-target={`#${item.postIdx}`} data-bs-slide={'next'}>
                                                <span className={'carousel-control-next-icon'}
                                                      aria-hidden={'true'}></span>
                      <span className={'visually-hidden'}>Next</span>
                    </button>
                  </div>

                </div>
                <div className={'h20'}>
                  <div className={'row mt-2 mx-auto'} style={{width: '100%'}}>
                    <div className={'col-auto me-auto my-auto p-0'}>
                      <div>
                        {/*댓글버튼 UI*/}
                        <button
                          onClick={() => handleCmtSection(item.postIdx)}
                          className={'btn d-flex justify-content-start p-0 ms-2'} data-bs-toggle="modal"
                          data-bs-target={"#staticBackdrop" + item.postIdx}>
                          <img src={ic_comment} alt={'icon'} className={'icon-size'}/>
                        </button>
                        <div className={'container'}>
                          {/*모달영역*/}
                          <div className={`modal  fade ${isCmtActive ? 'show' : ''}`}
                               id={"staticBackdrop" + item.postIdx} tabIndex="-1"
                               aria-labelledby="staticBackdropLabel" aria-hidden={!isCmtActive}>
                            <div className="modal-dialog modal-dialog-scrollable ">
                              <div className="modal-content">
                                {/* 모달 헤더 */}
                                <div className="modal-header">
                                  <h5 className="modal-title"
                                      id="staticBackdropLabel">댓글</h5>
                                  <button type="button" className="btn-close"
                                          aria-label="Close"
                                          data-bs-dismiss="modal"></button>
                                </div>

                                {/* 모달 본문 */}
                                <div className="modal-body no-scroll">
                                  {/*게시물내용*/}

                                  <div className={'border-bottom mb-4 mt-2 p-2'}>
                                    <div className={'h70'}>
                                      <div id={`modalCarousel-${item.postIdx}`} className="carousel slide">
                                        <div className="carousel-indicators">
                                          <button type="button" data-bs-target="#carouselExampleIndicators"
                                                  data-bs-slide-to="0" className="active" aria-current="true"
                                                  aria-label="Slide 1"></button>
                                          <button type="button" data-bs-target="#carouselExampleIndicators"
                                                  data-bs-slide-to="1" aria-label="Slide 2"></button>
                                          <button type="button" data-bs-target="#carouselExampleIndicators"
                                                  data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                          {
                                            item.fileList.map((file, i) => {
                                              return (
                                                <div className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                                  <img src={file.fileAddress} className={'d-block w-100'}
                                                       alt={'postImage'}/>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                        <button className="carousel-control-prev" type="button"
                                                data-bs-target={`#modalCarousel-${item.postIdx}`} data-bs-slide="prev">
                                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                          <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button"
                                                data-bs-target={`#modalCarousel-${item.postIdx}`} data-bs-slide="next">
                                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                          <span className="visually-hidden">Next</span>
                                        </button>
                                      </div>
                                    </div>
                                    <div className={'h20'}>
                                      <div className={'row mt-3'}>
                                        <div className={'col me-auto'}>

                                        </div>
                                        <div className={'col-auto'}>
                                          <button className={'btn mx-auto '} onClick={onClickShareButton}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                              <img src={ic_kakao} alt="Share" className={'icon-size'}/>
                                              {/*<p style={{marginLeft: '5px', marginBottom: '0'}}></p>*/}
                                            </div>
                                          </button>
                                          <button onClick={onClickDeleteBtn}
                                                  className={'btn me-2 justify-content-end'}
                                                  value={item.postIdx} data-post-idx={item.postIdx}>
                                            <img src={ic_delete} alt={item.postIdx} className={'icon-size'}/>
                                          </button>
                                        </div>
                                      </div>

                                      <div className={'row align-items-center justify-content-center'}>
                                        <div className={'col-2 fw-bold font_fluid_s'}>
                                          {item.postId}
                                        </div>
                                        <div className={'col'}>
                                          {item.postContent}
                                        </div>
                                      </div>

                                      <div className={'row align-items-center justify-content-center'}>
                                        <div className={'col-2 fw-bold font_fluid_s'}>
                                          태그
                                        </div>
                                        <div className={'col'}>
                                          {item.postTag}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={'row mb-2'}>
                                    <div className={'col d-flex justify-content-center fw-bold fs-4 '}>
                                      [댓글]
                                    </div>
                                  </div>
                                  {/* 댓글 내용 */}
                                  {
                                    item.cmtList && Array.isArray(item.cmtList) && item.cmtList
                                      .map((cmt, i) => {
                                        return (
                                          <div className={'row'}>
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
                                                <div className={'col-1 me-3'}>
                                                  <button
                                                    className="btn bg-secondary-subtle justify-content-end"
                                                    onClick={deletecmt}
                                                    data-post-idx={cmt.postIdx} data-cmt-idx={cmt.postCmtIdx}>
                                                    x
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })
                                  }
                                  {/* 댓글 입력 폼 */}
                                  <div className="col">
                                    <form onSubmit={(e) => CmtSubmit(e, cmtpostidx)}>
                                      <div className={'row'}>
                                        <div className={'col'}>
                                          <div className={'input-group mb-3'}>
                                            <input type={'text'} className={'form-control'} placeholder={'댓글을 입력하세요'}  value={cmtinput} onChange={(e) => setcmtinput(e.target.value)}></input>
                                            <button className={'btn btn-outline-secondary'} type={'button'}>
                                              작성
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={'col-1'}></div>
                    <div className={'col-auto'}>
                      <button className={'btn'} onClick={onClickShareButton}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <img src={ic_kakao} alt="Share" className={'icon-size'}/>
                        </div>
                      </button>
                      <button onClick={onClickDeleteBtn}
                              className={'btn justify-content-end'}
                              value={item.postIdx}>
                        {/*{item.postIdx}*/}
                        <img src={ic_delete} alt={'icon'} className={'icon-size'}/>
                      </button>
                    </div>
                  </div>

                  <div className={'mx-2 mt-3'}>
                    <div className={'row align-items-center justify-content-center'}>
                      <div className={'col-2 fw-bold font_fluid_s-5'}>
                        {item.postId}
                      </div>
                      <div className={'col'}>
                        {item.postContent}
                      </div>
                    </div>

                    <div className={'row align-items-center justify-content-center'}>
                      <div className={'col-2 fw-bold font_fluid_s'}>
                        태그
                      </div>
                      <div className={'col'}>
                        {item.postTag}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default PostRead;