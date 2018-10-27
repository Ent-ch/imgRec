import { Component } from 'inferno';
import Map from './Map.jsx';

class DeatailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        imaggaTags: {}
      },
    }
  }

  componentDidMount() {
    const { id } = this.props;

    fetch(`/image/${id}`).then(resp => {
      return resp.status === 200 && resp.json();
    }).then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data: { url, created, imaggaTags: { results }}} = this.state;
    const tagsStr = results && results[0].tags.map(el => el.tag).slice(0, 15).join(', ');

    return <div className="detail-page">
      <Map gps={{lt: 48, ln: 32}} imgFire={url} timeFoto={created} tags={tagsStr} />
    </div>
  }
};

export default DeatailsPage;
