import React, { useState, useEffect } from 'react';

function BarHeader(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [width, setWidth] = useState('25%');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // 스크롤을 얼마나 내려야 작아지는지를 결정하는 값
            setIsScrolled(scrollTop > threshold);
            setWidth(isScrolled ? '12.5%' : '25%'); // 스크롤에 따라 가로 너비 변경
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            height: '100%',
            backgroundColor: '#efa6aa',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px', // 로고와 상단 간격 조정
            transition: 'background-color 0.3s, padding 0.3s, width 0.3s', // 가로 너비에도 트랜지션 적용
            left: isScrolled ? '12.5%' : 0, // 스크롤에 따라 왼쪽 위치 조정
            right: isScrolled ? '12.5%' : 0, // 스크롤에 따라 오른쪽 위치 조정
            width: width, // 동적으로 변경된 가로 너비
        }}>
            <header>
                <img src="/images/mainlogo.png" alt="Logo" style={{ width: isScrolled ? '50px' : '200px', height: isScrolled ? '40px' : '200px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', transition: 'width 0.3s, height 0.3s' }} />
            </header>
        </div>
    );
}

export default BarHeader;
