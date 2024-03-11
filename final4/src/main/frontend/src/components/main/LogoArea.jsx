import React from "react";

function LogoArea(props) {

    const setCurrentPage = props.setCurrentPageData;

    return (
        <div className={'row'}>
          <div className={'col justify-content-center logo-image-container'} style={{width: '400px', marginTop: '15%'}} onClick={() => setCurrentPage(0)}>
            <img src={'/img/logo2.png'} className={'logo-image'} alt={'logo'}/>
          </div>
        </div>
    );
}

export default LogoArea;