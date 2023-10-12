import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [handlingHover, setHandlingHover] = useState<Proposition>();
  const allLinks = links.map((link) => {
    return (
      <Marker
        key={link.title}
        width={40}
        anchor={[link.lat, link.lon]} // Latitude and longitude coordinates
        color={vars.colorPrimary}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
        hover // Enable hover effect

        onMouseOver={() => setHandlingHover(link)}

      />
    );
  });
  return (

    <Map height={300} center={[lat, lon]} defaultZoom={12}>
      <Marker
        width={50}
        anchor={[lat, lon]}
        color={vars.colorPrimary}
        className="marker"
        onMouseOver={() => setHandlingHover(undefined)}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
      />
      {allLinks}
      {handlingHover ? (
        <Overlay
          anchor={[handlingHover.lat, handlingHover.lon]}
          offset={[290, 50]}
          className="marker-title"
        >
          <Link to={handlingHover.url} target="_blank">
            <p
              className="marker-title-p"
              onMouseOut={() => setHandlingHover(undefined)}
              onBlur={() => setHandlingHover(undefined)}
            >
              {handlingHover.title}
            </p>
          </Link>
        </Overlay>
      ) : null}
    </Map>
  );
}
export default MapDisplay;
