// Import React Hooks
import { useState } from 'react';
// Import component from Pigeon-maps
import { Map, Marker, Overlay } from 'pigeon-maps';
// Import Interface
import { Proposition } from '../../@types';
// Import Styles
import './Map.scss';
import vars from '../../styles/_export.module.scss';

interface MapProps {
  lat: number;
  lon: number;
  links: Proposition[];
}
// Function render a map with markers
function MapDisplay({ lat, lon, links }: MapProps) {
  // Declaration State Variables
  const [hoveredMarker, setHoveredMarker] = useState<Proposition | null>(null);

  // EVENT HANDLER for the marker mouse hover
  const handleMarkerHover = (link: Proposition) => {
    setHoveredMarker(link);
  };

  // EVENT HANDLER for the marker mouse out
  const handleMarkerLeave = () => {
    setHoveredMarker(null);
  };

  // Create an array of markers based on the links data
  const allLinks = links.map((link) => {
    return (
      <Marker
        key={link.title}
        width={40}
        anchor={[link.lat, link.lon]} // Latitude and longitude coordinates
        color={vars.colorPrimary}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
        hover // Enable hover effect
        onMouseOver={() => handleMarkerHover(link)}
        onMouseOut={handleMarkerLeave}
      />
    );
  });

  return (
    <Map height={300} center={[lat, lon]} defaultZoom={12}>
      <Marker
        width={50}
        anchor={[lat, lon]}
        color={vars.colorPrimary}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
      />
      {allLinks}
      {hoveredMarker ? (
        <Overlay
          anchor={[hoveredMarker.lat, hoveredMarker.lon]}
          offset={[290, 50]}
          className="marker-title"
        >
          <p
            className="marker-title-p"
            onMouseOut={handleMarkerLeave}
            onBlur={handleMarkerLeave}
          >
            {hoveredMarker.title}
          </p>
        </Overlay>
      ) : null}
    </Map>
  );
}
export default MapDisplay;
