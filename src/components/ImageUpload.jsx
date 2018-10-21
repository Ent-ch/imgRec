import { Component } from 'inferno';
import { EXIF } from 'exif-js';

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
    };

    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  
  handleButton() {
    this.attachment.click();
  }

  handleSelectFile(input2) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const url = e.target.result;
    
      this.setState({url});
    };
    reader.readAsDataURL(this.attachment.files[0]);
  }

  handleSend() {
    let ln, lt;
    const self = this;

    EXIF.getData(this.image, function() {
      const allMetaData = EXIF.getAllTags(this);

      ln = `${allMetaData.GPSLatitude[0]}.${allMetaData.GPSLatitude[1]}`;
      lt = `${allMetaData.GPSLongitude[0]}.${allMetaData.GPSLongitude[1]}`;
      
      self.props.onSend(self.state.url, ({lt, ln}), allMetaData.DateTime);
    });
  }

  render() {
    const { url } = this.state;
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
      <img src={url} alt="fire image" className="user-img" ref={image => {this.image = image;}} />
      <button class="btn--red btn-send" onClick={this.handleSend}>Send</button>
    </div>
  }
}

export default ImageUpload;
