import { Component } from 'inferno';

class DeatailsPage extends Component {

  componentDidMount() {
    const { id } = this.props;

    fetch(`/image/${id}`).then(resp => {
      return resp.status === 200 && resp.json();
    }).then(data => {
      console.log(data);
    });
  }

  render() {

    return <div className="detail-page">
    </div>
  }
};

export default DeatailsPage;
