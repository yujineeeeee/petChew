import React, { useState } from 'react';
import "../../App.css"

function Button(props) {
    const currentPage = props.currentPageData;
    const setCurrentPage = props.setCurrentPageData;

    const [isExpanded, setIsExpanded] = useState(false);

    const onPageChangeBtn = (e) => {
        const value = e.target.value;

        if (value === '메인'){
            setCurrentPage(0);
        }
        else if (value === '동물병원') {
            setCurrentPage(1);
        }
        else if (value === '쇼핑몰'){
            setCurrentPage(2);
        }
        else if (value === '프로필'){
            setCurrentPage(3);
        }
    }

    function openNewWindow() {
        // 작은 팝업 창을 엽니다.
        const newWindow = window.open('', '_blank', 'width=480,height=750,top=2000,left=2000');

        // 팝업 창에 버튼을 추가합니다.
        if (newWindow) {
            newWindow.document.write(`
                <html>
                <head>
                    <title>Chatbot</title>
                    <style>
                        body {
                            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
                            font-weight: bold;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            box-sizing: border-box;
                            /* 배경 이미지 추가 */
                            background-image: url('/img/phone.png'), url("https://cdn.pet-friends.co.kr/resources/pc/img/background.png");
                            background-size: cover;
                            background-position: center;
                        }
                        
                        .buttonWrapper {
                            margin-bottom: 10px; /* 각 버튼 사이의 간격을 설정합니다 */
                            align-items: center;
                            justify-content: center;
                            display: flex;
                        }
                        .button {
                            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
                            font-weight: bold;
                            padding: 10px 20px; /* 버튼 내부 여백 조절 */
                            font-size: 16px;
                            border: none;
                            border-radius: 15px;
                            cursor: pointer;
                            background-color: lightcoral;
                            color: white;
                            /* 버튼 내부 텍스트가 버튼 영역을 벗어나지 않도록 설정 */
                        }
                    </style>
                </head>
                <body>
                    <div class="buttonContainer">
                        <div class="buttonWrapper">
                            <button class="button" onClick="window.location.href = '/chatbot'">Chatbot 열기</button>
                        </div>
                        <div class="buttonWrapper">
                            <button class="button" onClick="window.location.href = '/qna'">Qna 열기</button>
                        </div>
                    </div>
                </body>
                </html>
            `);

            // 팝업 창 크기를 변경할 수 없도록 설정합니다.
            newWindow.resizable = false;
        }
    }

    function toggleExpansion() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="buttonContainer">
            {isExpanded ? (
                <>
                    <div className="buttonWrapper">
                        <button className="button" onClick={toggleExpansion}>-</button>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" onClick={openNewWindow}>챗봇</button>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" onClick={onPageChangeBtn} value={'프로필'}>프로필</button>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" onClick={onPageChangeBtn} value={'동물병원'}>동물병원</button>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" onClick={onPageChangeBtn} value={'쇼핑몰'}>쇼핑</button>
                    </div>
                    <div className="buttonWrapper">
                        <button className="button" onClick={onPageChangeBtn} value={'메인'}>메인</button>
                    </div>
                </>
            ) : (
                <div className="buttonWrapper">
                    <button className="button" onClick={toggleExpansion}>+</button>
                </div>
            )}
        </div>
    );
}

export default Button;
