import { Component } from 'inferno';

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
    };

    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  
  handleButton() {
    this.attachment.click();
  }

  handleSelectFile(input2) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({url: e.target.result});
    };
    reader.readAsDataURL(this.attachment.files[0]);
  }

  render() {
    const { url } = this.state;
    const { onSend } = this.props;
    const attachmentEl = <input
      type="file"
      ref={attachment => {this.attachment = attachment;}}
      style="display: none;"
      onchange={this.handleSelectFile}
      accept=".jpg,.jpeg"
    />;

    if (!url) {
      return <div>
          {attachmentEl}
          <button class="btn--float btn--red btn-big" onClick={this.handleButton}>Shot the fire</button>
        </div>;
    }

    return <div>
      {attachmentEl}
      <img src={url} alt="fire image" className="user-img" />
      <button class="btn--red btn-send" onClick={() => onSend(url)}>Send</button>
    </div>
  }
}

export default ImageUpload;
