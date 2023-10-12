import { useState } from 'react';
import { Link } from 'react-router-dom';
// Import component from Pigeon-maps
import { Map, Marker, Overlay } from 'pigeon-maps';
// Import Interface
import { Proposition } from '../../@types';
// Import Styles
import './Map.scss';

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
        color="#ff7d5c"
        onMouseOver={() => setHandlingHover(link)}
      />
    );
  });
  return (
    <Map height={300} center={[lat, lon]} defaultZoom={12}>
      <Marker
        width={50}
        anchor={[lat, lon]}
        color="#ff7d5c"
        className="marker"
        onMouseOver={() => setHandlingHover(undefined)}
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
