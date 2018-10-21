import { render, Component } from 'inferno';

import ImageUpload from './components/ImageUpload.jsx';
import Map from './components/Map.jsx';

import 'surface/src/scss/surface_styles.scss';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      url: null,
      gps: {
        lt: 42,
        ln: 38,
      },
      timeFoto: null,
    };

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(url, gps, timeFoto) {
    this.setState({sent: true, url, gps, timeFoto});
  }

  render() {
    const { sent, url, gps, timeFoto } = this.state;

    return (
      <div className="g--12 no-margin-vertical appMain">
        {!sent && <div>
        <div className="sendBlock">
          <ImageUpload onSend={this.handleSend} />
        </div>
        </div>}

        {sent && <Map imgFire={url} gps={gps} timeFoto={timeFoto} />}

        <footer className="g--12">
          <div className="text-center">
            Help us to prevent fire
          </div>
        </footer>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById("app")
);