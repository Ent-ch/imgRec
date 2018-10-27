import { Component } from 'inferno';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(el) {
    el.preventDefault();
    const input = document.querySelector('input[type="file"]')

    const data = new FormData()
    data.append('foto', input.files[0])

    fetch('/upload', {
      method: 'POST',
      body: data
    });
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <div>
        <label>Select file with fire 6</label>
        <input type="file" />
      </div>
      <button type="submit">Send</button>
    </form>
  }
}

export default FileUpload;
