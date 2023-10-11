import { Map, Marker } from 'pigeon-maps';
import { Proposition } from '../../@types';
import './Map.scss';

interface MapProps {
  lat: number;
  lon: number;
  links: Proposition[];
}
function MapDisplay({ lat, lon, links }: MapProps) {
  const allLinks = links.map((link) => {
    return (
      <Marker
        key={link.id}
        width={40}
        anchor={[link.lat, link.lon]}
        color="#ff7d5cbd"
        hover
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
