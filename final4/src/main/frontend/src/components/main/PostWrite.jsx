import React, {useState} from "react";
import leftIcon from "../../images/left_icon.png";
import rightIcon from "../../images/right_icon.png";
import axios from "axios";

function PostWrite(props) {

    const showImages = props.showImageData;
    const setShowImages = props.setShowImageData;

    const edit = props.editData;
    const setEdit = props.setEditData;

    const currentImageIndex = props.currentImageIndexData;
    const setCurrentImageIndex = props.setCurrentImageIndexData;

    const currentIndex = props.currentIndexData;

    const [files, setFiles] = useState(null);

    const [inputs, setInputs] = useState({
        postId: "",
        postContent: "",
        postTag: ""
    });

    const {postId, postContent, postTag} = inputs;


    const onChangeInput = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onSubmit = () => {


        if (!postId || postId.trim() === '' || !postContent || postContent.trim() === '' || !postTag || postTag.trim() === '') {
            alert('아이디, 내용, 태그는 필수 입력 항목입니다.');
            return;
        }

        if (!files || files.length === 0) {
            alert('이미지업로드는 필수 항목입니다.');
            return;
        }
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("multipartFile", files[i]);
        }

        const postDto = {
            postId: postId,
            postContent: postContent,
            postTag: postTag
        }


        const postData = JSON.stringify(postDto);
        formData.append('postDto', new Blob([postData], {type: 'application/json'}));



        axios.post('/insertPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', charset: 'utf-8'
            },
        })
            .then((res) => {
                const {result} = res.data

                if (result === 'success') {
                    setEdit(false);
                    alert('등록되었습니다.');
                    window.location.reload();
                    // navigate('/');
                } else {
                    console.log('게시물 등록 중 오류 발생')
                }

            })
            .catch((err) => {
                console.log('에러발생');
                console.log(err);
            })
    }

    const handleEdit = () => {
        if (edit === false) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }

    const handleAddImages = (event) => {
        setFiles(event.target.files);

        const imageList = event.target.files;
        const imageUrlList = [];

        for (let i = 0; i < imageList.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageList[i]);
            imageUrlList.push(currentImageUrl);
        }

        setShowImages(imageUrlList);
        setCurrentImageIndex(0);
    }

    const btnNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % showImages.length);
    }

    const btnPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + showImages.length) % showImages.length);
    }

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));

        if (currentIndex >= showImages.length - 1) {
            setCurrentImageIndex(Math.max(showImages.length - 2, 0));
        }
    }


    return (
        <div>
            <div className={'row'}>
                <div className={'col-sm d-flex'}>
                    <button type={'button'} onClick={onSubmit} className={'btn me-2 circleBtn'}><b>↑</b></button>
                    <button type={'button'} onClick={handleEdit} className={'btn circleBtn'}><b>X</b></button>
                </div>
            </div>

            <div className={'main-container no-scroll p-1'}>
                <div className={'row mt-2'}>
                    <label htmlFor={'input-file'}>
                        <span className={'me-2'}>이미지 선택</span>
                        <input type={'file'} name={'file'} multiple={true} id={'input-file'}
                               onChange={handleAddImages}/>
                    </label>
                </div>

                {
                    showImages.length > 0 && (
                        <div className={'row align-items-center mt-2 post-image-container'}>
                            <div className={'col-1'}>
                                <button className={`btn ${showImages.length === 1 ? 'd-none' : ''}`}
                                        onClick={btnPrevImage}>
                                    <img src={leftIcon} alt={'prev'} style={{width: 20}}/>
                                </button>
                            </div>
                            {
                                showImages.map((item, i) => (
                                    <div key={i}
                                         className={`col ${i === currentImageIndex ? 'active' : ''} post-image`} style={{
                                        display: i === currentImageIndex ? 'block' : 'none'
                                    }}>
                                        <div className={'row justify-content-center'}>
                                            <img src={item} alt={`Preview ${i}`} style={{height:'600px', objectFit: 'contain'}}/>
                                        </div>
                                        <div className={'row'}>
                                            <div className={'col d-flex justify-content-center'}>
                                                <button className={'mt-2 btn btn-primary'}
                                                        onClick={() => handleDeleteImage(i)}>삭제
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                            <div className={'col-1'}>
                                <button className={`btn ${showImages.length === 1 ? 'd-none' : ''}`}
                                        onClick={btnNextImage}>
                                    <img src={rightIcon} alt={'next'} style={{width: 20}}/>
                                </button>
                            </div>
                        </div>
                    )
                }

                <div className={'mt-2'}>
                    <div className={'row g-2'}>
                        <div className={'col-md'}>
                            <div className={'form-floating'}>
                                <input className={'form-control'} name={'postId'} id={'post-id'}
                                       placeholder={'아이디'} onChange={onChangeInput}/>
                                <label htmlFor={'post-id'}>아이디</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row g-2 mt-2'}>
                        <div className={'col-md'}>
                            <div className={'form-floating'}>
                                        <textarea className={'form-control'} name={'postContent'} id={'post-content'}
                                                  style={{height: '200px'}}
                                                  placeholder={'내용 입력'} onChange={onChangeInput}/>
                                <label htmlFor={'post-content'}>내용</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row g-2 mt-2'}>
                        <div className={'col-md'}>
                            <div className={'form-floating'}>
                                <input className={'form-control'} name={'postTag'} id={'post-tag'}
                                       placeholder={'태그 입력'} onChange={onChangeInput}/>
                                <label htmlFor={'post-tag'}>태그</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PostWrite;