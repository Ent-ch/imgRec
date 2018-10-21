import { render, Component } from 'inferno';
import osm from 'osm';

import InfoTable from './InfoTable.jsx';

import './Map.scss';

class Map extends Component {

  render() {
    const { imgFire } = this.props;
    const map = osm().position(48.5263832, 32.2718125).radius(0.1);
    map.show();
    console.log(map.iframe.src);

    return <div className="map-block">
      <div className="map">
        <iframe src={map.iframe.src} />
      </div>
      <div className="info container">
        <div className="g--3">
          <img src={imgFire} alt="fire image" className="user-img, map-image" />
        </div>
        <InfoTable />
      </div>
    </div>
  }
};

export default Map;
