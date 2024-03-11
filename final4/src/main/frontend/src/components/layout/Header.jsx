import React, { useState, useEffect } from 'react';

function Header(props) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // 스크롤을 얼마나 내려야 작아지는지를 결정하는 값
            setIsScrolled(scrollTop > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header style={{
            backgroundColor: '#efa6aa',
            padding: isScrolled ? '10px' : '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            transition: 'background-color 0.3s, padding 0.3s'
        }}>
            <img src={isScrolled ? "/images/cat.png" : "/images/mainlogo.png"} alt="Logo" style={{margin: '0 auto', width: isScrolled ? '50px' : '200px', height: isScrolled ? '40px' : '200px', transition: 'width 0.3s, height 0.3s'}}/>
            <nav>
                <ul style={{listStyleType: 'none', margin: 0, padding: 0, display: 'flex', fontFamily:'"abogle",happynewyear'}}>
                    <li style={{marginRight: '10px'}}>메뉴1</li>
                    <li style={{marginRight: '10px'}}>메뉴2</li>
                    <li style={{marginRight: '10px'}}>동물병원</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
