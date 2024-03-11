import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";

function ProfileModal(props) {

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

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalIsOpen(false);

    document.body.style.overflow = 'unset';
  };



  const userInfo = props.userInfo;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const guList = [
    '강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'
  ]

  const [profile, setProfile] = useState({
    id: '',
    gu: '',
    interestsTag: '',
    profileImg: '',
  });

  const [animal, setAnimal] = useState({
    aniKind: '',
    aniKindDetail: '',
    aniName: '',
    aniAge: '',
    aniInfo: ''
  })

  const {id, gu, interestsTag, profileImg} = profile;
  const {aniKind, aniKindDetail, aniName, aniAge, aniInfo} = animal;

  const [files, setFiles] = useState(null);

  useEffect(() => {
    setProfile(userInfo);
    setAnimal(userInfo.animalList);
  }, [userInfo]);


  const onChangeUserInput = (e) => {
    const {value, name} = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  }

  const onChangeAnimalInput = (e) => {
    const {value, name} = e.target;
    setAnimal({
      ...animal,
      [name]: value
    });
  }

  const handleImageChange = (event) => {
    setFiles(event.target.files);

  }


  const onClickUpdateBtn = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFile", files[i]);
    }

    const animalInfo = {
      userId: id,
      aniKind: aniKind,
      aniKindDetail: aniKindDetail,
      aniName: aniName,
      aniAge: aniAge,
      aniInfo: aniInfo
    }

    const userInfo = {
      id: id,
      gu: gu,
      interestsTag: interestsTag,
      profileImg: profileImg,
      animalList: animalInfo
    }

    const postData = JSON.stringify(userInfo);
    formData.append('userInfo', new Blob([postData], {type: 'application/json'}));

    axios.post('/updateUserInfo', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data', charset: 'utf-8'
      },
    })
      .then(res => {
        const {result} = res.data

        if (result === 'success') {
          alert('수정되었습니다.');
          window.location.reload();

        } else {
          console.log('게시물 수정 중 오류 발생')
        }


      })
      .catch(err => {
        console.log('에러발생');
        console.log(err);
      })
  }


  return (
    <div>
      <button onClick={openModal} className={'btn'} style={{background: '#F08080'}}>프로필 수정</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyle} className={'modalwidth mx-auto'}>
        <div className={'row'}>
          <div className={'col d-flex justify-content-center'}>
            <div className={'profile-image-square'} style={{width: '50%'}}>
              <img src={profile.profileImg} alt={'pofileImage'} className={'profile-image-image'}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col'}>
            <label htmlFor={'input-file'}>
              <span className={'me-2'} >프로필 이미지 변경</span>
              <input type={'file'} name={'file'} id={'input-file'} multiple={true} onChange={handleImageChange}/>
            </label>
          </div>
        </div>

        <div className={'row'}>
          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'id'} id={'user-id'} placeholder={'아이디'} disabled={true}
                       value={profile.id}/>
                <label htmlFor={'user-id'}>아이디</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'createDate'} id={'createDate'} placeholder={'계정 생성일'}
                       disabled={true}
                       value={profile.createDate} readOnly={true}/>
                <label htmlFor={'createDate'}>계정 생성일</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'form-floating'}>
              <select className={'form-control'} id={'gu'} name={'gu'} aria-label={'Floating label'}
                      onChange={onChangeUserInput}>
                {
                  guList.map((item, i) => {
                    return (
                      item === profile.gu ?
                        <option selected={true} value={profile.gu}>{profile.gu}</option> :
                        <option value={item}>{item}</option>
                    )
                  })
                }
              </select>
              <label htmlFor={'gu'}>지역구</label>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'interestsTag'} id={'interestsTag'} placeholder={'계정 생성일'}
                       onChange={onChangeUserInput}
                       value={profile.interestsTag}/>
                <label htmlFor={'interestsTag'}>관심태그</label>
              </div>
            </div>
          </div>
        </div>

        <div className={'row'}>
          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'aniKind'} id={'aniKind'} placeholder={'계정 생성일'}
                       onChange={onChangeAnimalInput}
                       value={animal.aniKind}/>
                <label htmlFor={'aniKind'}>반려동물 대분류</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'aniKindDetail'} id={'aniKindDetail'}
                       placeholder={'계정 생성일'} onChange={onChangeAnimalInput}
                       value={animal.aniKindDetail}/>
                <label htmlFor={'aniKindDetail'}>반려동물 소분류</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'aniName'} id={'aniName'} placeholder={'계정 생성일'}
                       onChange={onChangeAnimalInput}
                       value={animal.aniName}/>
                <label htmlFor={'aniName'}>반려동물 이름</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'aniAge'} id={'aniAge'} placeholder={'계정 생성일'}
                       onChange={onChangeAnimalInput}
                       value={animal.aniAge}/>
                <label htmlFor={'aniAge'}>반려동물 나이</label>
              </div>
            </div>
          </div>

          <div className={'row g-2'}>
            <div className={'col-md'}>
              <div className={'form-floating'}>
                <input className={'form-control'} name={'aniInfo'} id={'aniInfo'} placeholder={'계정 생성일'}
                       onChange={onChangeAnimalInput}
                       value={animal.aniInfo}/>
                <label htmlFor={'aniInfo'}>반려동물 정보</label>
              </div>
            </div>
          </div>
        </div>

        <div className={'row mt-3'}>
          <div className={'col d-flex justify-content-center'}>
            <button type={'button'} className={'btn me-2'} onClick={onClickUpdateBtn} style={{background: '#F08080'}}>수정</button>
            <button type={'button'} className={'btn'} onClick={closeModal} style={{background: '#F08080'}}>취소</button>
          </div>

        </div>


      </Modal>
    </div>
  );
}

export default ProfileModal;