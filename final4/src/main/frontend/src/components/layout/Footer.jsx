import React from 'react';
import bgconvers from '../../images/bgconvers.png'

function Footer() {
    return (
        <footer id="footer" style={{backgroundColor: '#FFAAC7'}}>
            <div className="foot-wrap" style={{textAlign: 'center'}}>
                <div className="foot-inf">
                    <img src={bgconvers} style={{width:'100px'}}/>
                    <address>
                        <p style={{fontFamily: 'abogle'}}>
                            상호 : (주)펫츄 | 팀장 : 신유진 | 팀원 : 김성재 박동혁 이은지
                            펫츄는 바르고 안전한 SNS 활동을 위해 주인님심장지키미에 가입되어 있습니다.
                        </p>

                    </address>

                    <dl className="cs">
                        <dt style={{display: "none"}}>customer center</dt>
                        <dd>
                            <p className="copy">copyright ⓒ <strong>petChew</strong> all rights reserved.</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
