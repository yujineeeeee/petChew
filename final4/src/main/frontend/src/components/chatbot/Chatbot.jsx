import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/chat.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showGuide, setShowGuide] = useState(true); // 추가: 안내 메시지를 표시할지 여부를 추적하는 상태 변수
    const chatDivRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        if (chatDivRef.current) {
            chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const apiKey = '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';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    const addMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    const handleSendMessage = async () => {
        setShowGuide(false); // 사용자가 메시지를 입력하면 안내 메시지를 숨깁니다.

        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage('user', message);
        setUserInput('');
        setLoading(true);

        // 반려동물 관련 질문 확인
        const isPetRelated = checkIfPetRelated(message);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-0125',
                    messages: [{ role: 'user', content: isPetRelated ? message : '' }], // 반려동물 관련 질문만 전달
                    max_tokens: 2048,
                    top_p: 1,
                    temperature: 0.7,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                    stop: ['문장 생성 중단 단어'],
                }),
            });

            const data = await response.json();
            let aiResponse;
            if (isPetRelated) {
                aiResponse = data.choices?.[0]?.message?.content || 'No response';
            } else {
                aiResponse = '반려동물에 관한 질문을 해주세요!\nPlease ask questions about pets!';
            }
            addMessage('bot', aiResponse);
        } catch (error) {
            console.error('오류 발생!', error);
            addMessage('오류 발생!');
        } finally {
            setLoading(false);
        }
    };

    // 반려동물 관련 질문 확인 함수
    const checkIfPetRelated = (input) => {
        // 반려동물 관련 질문인지 확인, 필요한 만큼 추가
        const petKeywords = ['안녕', '애완', '반려', '동물', '강아지', '개', '견', '고양이', '묘', '도치', '쥐', '햄스터', '뱀', '열대어', '새', '조류', '거북', '바다', '거미', '당나귀', '먹이', '간식', '슈가', '수명', '피그', '고기', '달팽이', '토끼', '말', '펫', 'hi', 'hello', 'dog', 'cat', 'puppy', 'kitten', 'pet', 'h'];
        for (const keyword of petKeywords) {
            if (input.includes(keyword)) {
                return true;
            }
        }
        return false;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // QnA 페이지로 이동하는 함수
    const goToQnAPage = () => {
        navigate('/qna'); // QnA 페이지 경로로 이동
    };

    return (
        <div id='Chatbot'>
            <h4>챗봇</h4>
            <div className='chatDiv' ref={chatDivRef}>
                {loading && <span className="messageWait">답변을 기다리고 있습니다</span>}
                {/* 안내 메시지를 표시합니다. */}
                {showGuide && <div className="message guideMessage">안녕하세요! 반려동물에 관심이 있으신가요?<br/><br/>
                    궁금한 것이 있다면 언제든지 물어보세요!</div>}
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message}`}
                    </div>
                ))}
            </div>
            <div className='inputDiv'>
                <button id={'qna'} onClick={goToQnAPage}>QnA</button> {/* QnA 페이지로 이동하는 버튼 */}
                <input
                    type='text' placeholder='메시지를 입력하세요'
                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSendMessage}>전송</button>
            </div>
        </div>
    );
};

export default Chatbot;
