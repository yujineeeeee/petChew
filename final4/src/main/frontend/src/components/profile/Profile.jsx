import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import ProfilePost from "./ProfilePost";


function Profile() {

  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
    createDate: '',
    gu: '',
    interestsTag: '',
    profileImg: '',
    animalList: '',
    postList: []
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    axios.get('/selectUser', {
      params: {userId: "test1"}
    })
      .then(res => {
        const {result, data} = res.data;

        if (result === 'success') {
          setUserInfo(data);

        } else {
          console.log('리스트 불러오는 중 오류 발생')
        }

      })
      .catch(err => {
        console.log('리스트 불러오는 중 에러발생');
        console.log(err);
      })

  }, []);


  return (
    <div className={'main-container no-scroll'}>
      <div className={'row mt-3 align-items-center'}>
        <div className={'col-5'}>
          {/*  프로필 사진*/}
          <div className={'profile-image-square'}>
            <img
              src={userInfo.profileImg}
              alt={'pofileImage'} className={'profile-image-image'}/>
          </div>
        </div>
        <div className={'col'}>
          <div className={'d-flex justify-content-center'}>
            <div>게시물 개수 {userInfo.postList.length}</div>
          </div>
          <div className={'d-flex justify-content-center'}>


            <ProfileModal userInfo={userInfo}/>


          </div>
        </div>
      </div>
      <div className={'mt-2'}>
        <div className={'row'}>
          <div className={'col'}>
            <div className={'fw-bold fs-4'}>{userInfo.id}</div>
          </div>
        </div>
        <div>
          <div>
            <span
              className={'fw-bold fs-5'}>{userInfo.animalList.aniName}</span> ({userInfo.animalList.aniAge}살, {userInfo.animalList.aniKindDetail})
          </div>
          <div>
            {userInfo.animalList.aniInfo}
          </div>
        </div>
      </div>

      <hr/>

      {/*  게시물 목록*/}
      <div className={'row'}>
        {
          userInfo.postList.map((item, i) => {
            return (
              <ProfilePost fileUrl={item.fileList[0].fileAddress} postIdx={item.postIdx} />
            )
          })
        }
      </div>


    </div>

  );
}

export default Profile