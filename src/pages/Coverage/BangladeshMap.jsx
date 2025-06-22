import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Search } from 'lucide-react'; // You can use Heroicons or FontAwesome if preferred

const position = [23.6850, 90.3563]; // Center of Bangladesh

// Optional custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to move map
function FlyToDistrict({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }
  return null;
}

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const district = serviceCenters.find(d =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    }
  };

return (
  <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg relative bg-white">

    {/* Title */}
    <div className=" px-4">
      <h2 className=" md:text-3xl font-bold text-green-700">We are available in 64 districts</h2>
    </div>

    {/* Search form under title */}
<form
  onSubmit={handleSearch}
  className="mt-4 z-[1000] w-full px-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:max-w-md "
>
  <input
    type="text"
    placeholder="Search district..."
    className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none outline-none"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <button
    type="submit"
    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-green-700 flex justify-center items-center gap-1"
  >
    <Search className="w-6 h-6" />
    <span className="text-sm font-medium">Search</span>
  </button>
</form>


    {/* Map container */}
    <div className="absolute top-[150px] left-0 right-0 bottom-0 z-0">
      <MapContainer center={position} zoom={8} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToDistrict coords={activeCoords} />

        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
          >
            <Popup autoOpen={center.district === activeDistrict}>
              <div className="text-sm">
                <span className="text-lg">📍</span>
                <strong className="ml-1">{center.district}</strong>
                <br />
                {center.covered_area.join(', ')}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </div>
);

};

export default BangladeshMap;
