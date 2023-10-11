// Import component from Pigeon-maps
import { Map, Marker } from 'pigeon-maps';
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
  const allLinks = links.map((link) => {
    return (
      <Marker
        key={link.id}
        width={40}
        anchor={[link.lat, link.lon]} // Latitude and longitude coordinates
        hover // Enable hover effect
      />
    );
  });

  return (
    <Map height={300} center={[lat, lon]} defaultZoom={4}>
      <Marker width={50} anchor={[lat, lon]} color="#ff7d5c" />
      {allLinks}
    </Map>
  );
}
export default MapDisplay;
