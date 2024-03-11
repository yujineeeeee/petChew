import React, { useEffect, useRef, useState } from 'react';

const Maps = ({ location }) => {
    const mapElement = useRef(null);
    const [naverMap, setNaverMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (!mapElement.current || !window.naver || !location) return;

        const { lat, lon } = location;
        const locationLatLng = new window.naver.maps.LatLng(lat, lon);

        const mapOptions = {
            center: locationLatLng,
            zoom: 17,
            zoomControl: true,
        };

        const map = new window.naver.maps.Map(mapElement.current, mapOptions);
        setNaverMap(map);

        const marker = new window.naver.maps.Marker({
            position: locationLatLng,
            map: map,
        });
        setMarker(marker);

        return () => {
            if (map) {
                map.destroy();
            }
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [location]);

    useEffect(() => {
        if (naverMap && location) {
            const { lat, lon } = location;
            const locationLatLng = new window.naver.maps.LatLng(lat, lon);
            naverMap.setCenter(locationLatLng);
            if (marker) {
                marker.setPosition(locationLatLng);
            }
        }
    }, [naverMap, location]);

    if (!window.naver) {
        return <div>Error: Naver Map API가 로드 실패</div>;
    }

    return (
        <div>
            {/*<h1>Naver Map - Default</h1>*/}
            {/*<h3>별점 : </h3>*/}
            <div ref={mapElement} style={{ minHeight: '400px' }} />
        </div>
    );
};

export default Maps;