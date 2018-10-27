import { Component } from 'inferno';
import osm from 'osm';

import InfoTable from './InfoTable.jsx';

import './Map.scss';

class Map extends Component {

  render() {
    const { imgFire, gps:{ lt, ln }, timeFoto, tags = 'Fog, Smoke, Fire' } = this.props;
    
    const map = osm().position(parseFloat(ln, 10), parseFloat(lt, 10)).radius(0.1);
    map.show();
    const mapUrl = map.iframe.src.replace('http', 'https');

    return <div className="map-block">
      <div className="map">
        <iframe src={mapUrl} />
      </div>
      <div className="info container">
        <div className="g--3">
          <img src={imgFire} alt="fire image" className="user-img, map-image" />
        </div>
        <InfoTable data={{timeFoto, tags}} />
      </div>
    </div>
  }
};

export default Map;
