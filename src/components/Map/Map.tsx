// Import component from Pigeon-maps
import { Map, Marker } from 'pigeon-maps';
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
  const allLinks = links.map((link) => {
    return (
      <Marker
        key={link.id}
        width={40}
        anchor={[link.lat, link.lon]} // Latitude and longitude coordinates
        color={vars.colorPrimary}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
        hover // Enable hover effect
      />
    );
  });

  return (
    <Map height={300} center={[lat, lon]} defaultZoom={4}>
      <Marker
        width={50}
        anchor={[lat, lon]}
        color={vars.colorPrimary}
        aria-label={`Votre position, Latitude: ${lat}, Longitude: ${lon}`}
      />
      {allLinks}
    </Map>
  );
}
export default MapDisplay;
