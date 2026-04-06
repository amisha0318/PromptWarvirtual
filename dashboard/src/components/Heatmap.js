import React, { useEffect, useRef } from 'react';

const Heatmap = ({ locations }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.google) return;
        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 17,
            center: { lat: 34.0522, lng: -118.2437 },
            mapTypeId: 'satellite'
        });

        const heatmapData = locations.map(loc => ({
            location: new window.google.maps.LatLng(loc.lat, loc.lng),
            weight: loc.intensity
        }));

        const heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map
        });

        return () => heatmap.setMap(null);
    }, [locations]);

    return (
        <div style={{ height: '600px', width: '100%', borderRadius: '12px' }} ref={mapRef}>
             {!window.google && <p>Google Maps API Loading...</p>}
        </div>
    );
};

export default Heatmap;
