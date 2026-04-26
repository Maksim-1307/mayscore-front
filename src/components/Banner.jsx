import banner from '../images/new-banner.jpeg'
import cross from '../images/icons/cross.svg';

import React, { useEffect, useRef } from 'react';

const BANNER_URL = 'https://mayscor.ru/admin/get_banners.php';
const BANNER_BASE_URL = 'https://mayscor.ru/admin/';

function Banner ({className}) {

    const bannerRef = useRef(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [bannerLink, setBannerLink] = React.useState(null);
    const [bannerImageUrl, setBannerImageUrl] = React.useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(BANNER_URL);
                const textData = await response.text();
                const jsonData = JSON.parse(textData)[0];
                setBannerLink(jsonData?.link);
                setBannerImageUrl(jsonData?.image_url);
            } catch (error) {
                console.error('Ошибка загрузки баннера:', error);
                setBannerImageUrl(null);
                setBannerLink(null);
                setTimeout(fetchBanner, 1500);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanner();
    }, []);

    function closeSelf(){
        if (bannerRef.current) {
            bannerRef.current.style.display = 'none';
        }
    }

    if (bannerImageUrl && bannerLink) {
        return (
            <div ref={bannerRef} className={`${className ? className : ''} banner`}>
                <a href={bannerLink} >
                    <img src={`${BANNER_BASE_URL}/${bannerImageUrl}`} alt="" />
                </a>
                <button className='banner__close-button' onClick={() => closeSelf()}>
                    <img src={cross} alt="" />
                </button>
            </div>
        );
    } else {
        return null;
    }
}

export default Banner;