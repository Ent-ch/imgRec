import { Component } from 'inferno';
import { Link } from 'inferno-router';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    fetch(`/latest`).then(resp => {
      return resp.status === 200 && resp.json();
    }).then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    return <div className="detail-page">
      <table className="m--1 g--10 card">
      <tr className="table-header">
          <td>Foto</td>
          <td>Time</td>
      </tr>
      {data.map(el => 
        <tr>
          <Link to={`/detail/${el.id}`}>
          <td><img src={el.url} className="list-img" /></td>
          <td>{el.created_at}</td>
          </Link>
        </tr>
      )}
      </table>
    </div>
  }
};

export default ListPage;
