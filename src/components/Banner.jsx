import banner from '../images/mobile-banner.jpeg'
import cross from '../images/icons/cross.svg';

import React, { useRef } from 'react';

function Banner ({className}) {

    const bannerRef = useRef(null);

    function closeSelf(){
        if (bannerRef.current) {
            bannerRef.current.style.display = 'none';
        }
    }
    return (
        <div ref={bannerRef} className={`${className ? className : ''} banner`}>
            <a href="https://clicks.af-ru2e2e.com/click?offer_id=316&partner_id=3257&landing_id=4378&utm_medium=affiliate&banner_id=4140" >
                <img src={banner} alt="" />
            </a>
            <button className='banner__close-button' onClick={() => closeSelf()}>
                <img src={cross} alt="" />
            </button>
        </div>
    );
}

export default Banner;