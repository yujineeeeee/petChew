import React from 'react';
import './css/shop.css';
import shopping from "../../images/shopping.png";

function Shop() {
    return (
        <div className="shop-container">
            <div className='shopbanner' style={{display: 'flex', alignItems: 'center'}}>
                {/*<h1 className={'hosptittle'} style={{textAlign: 'center', flex: '1'}}>*/}
                {/*    petChew에서 알려주는 <br/>*/}
                {/*    부산 동물병원 목록*/}
                {/*</h1>*/}
                <img className={'mx-auto'} src={shopping} alt={"쇼핑"} style={{float: 'center', marginLeft: '20px', width: '80%'}}/>
            </div>
            <div className="image-grid">
                {/* 이미지를 링크로 감싸고 href 속성에 링크 주소를 지정합니다. */}
                <a href="https://allzpet.co.kr/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/all.png" alt="올즈펫" />
                        <div className="image-description">
                            <p>반려동물용품 종합 도매 쇼핑몰</p>
                        </div>
                    </div>
                </a>
                <a href="https://www.aquapage.co.kr/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/aqua.png" alt="아쿠아페이지" />
                        <div className="image-description">
                            <p>수족관 물품 전문 쇼핑몰</p>
                        </div>
                    </div>
                </a>
                <a href="https://bighorn.co.kr/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/bighorn.jpg" alt="빅혼" />
                        <div className="image-description">
                            <p>이색 반려동물 전문 쇼핑몰</p>
                        </div>
                    </div>
                </a>

                <a href="http://www.dochiqueen.com/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/queen.png" alt="도치퀸" />
                        <div className="image-description">
                            <p>고슴도치 햄스터 전문 쇼핑몰</p>
                        </div>
                    </div>
                </a>
                <a href="https://puppydog.co.kr/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/puppydog.png" alt="퍼피독" />
                        <div className="image-description">
                            <p>강아지 전문 쇼핑물</p>
                        </div>
                    </div>
                </a>
                <a href="https://www.gegomall.com/" target="_blank" rel="noopener noreferrer">
                    <div className="image-wrapper">
                        <img src="/img/gegomall.png" alt="개고몰" />
                        <div className="image-description">
                            <p>강아지 고양이 전문 쇼핑몰</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    );
}

export default Shop;
