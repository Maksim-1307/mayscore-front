import banner from '../images/new-banner.jpeg'
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
            <a href="https://clicks.af-ru2e2e.com/click?offer_id=316&partner_id=3257&landing_id=3990&utm_medium=affiliate&web_master_id={web_master_id}&partner_click_id={partner_click_id}" >
                <img src={banner} alt="" />
            </a>
            <button className='banner__close-button' onClick={() => closeSelf()}>
                <img src={cross} alt="" />
            </button>
        </div>
    );
}

// old link https://clicks.af-ru2e2e.com/click?offer_id=316&partner_id=3257&landing_id=4378&utm_medium=affiliate&banner_id=4140

export default Banner;