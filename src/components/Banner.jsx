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
            <a href="https://af-bk6bba.com/click?offer_id=692&partner_id=3257&landing_id=2323&utm_medium=Affiliate" >
                <img src={banner} alt="" />
            </a>
            <button className='banner__close-button' onClick={() => closeSelf()}>
                <img src={cross} alt="" />
            </button>
        </div>
    );
}

export default Banner;