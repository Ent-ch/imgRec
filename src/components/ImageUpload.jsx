import { Component } from 'inferno';
import { EXIF } from 'exif-js';

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      selectedFile: null,
      errorGps: false,
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
    
      this.setState({url, selectedFile: this.attachment.files[0]});
    };
    reader.readAsDataURL(this.attachment.files[0]);
  }

  handleSend() {
    let ln, lt;
    const self = this;
    const data = new FormData()

    EXIF.getData(this.image, function() {
      const allMetaData = EXIF.getAllTags(this);

      if (!allMetaData.GPSLatitude) {
        return self.setState({ errorGps: true });
      }

      ln = `${allMetaData.GPSLatitude[0]}.${allMetaData.GPSLatitude[1]}`;
      lt = `${allMetaData.GPSLongitude[0]}.${allMetaData.GPSLongitude[1]}`;
      
      self.props.onSend(self.state.url, ({lt, ln}), allMetaData.DateTime);
      data.append('foto', self.state.selectedFile);
      data.append('gps', {lt, ln});
  
      fetch('/upload', {
        method: 'POST',
        body: data
      }).then(resp => resp.json()).then(data => {
        console.log(data);
      });
  
    });
  }

  render() {
    const { url, errorGps } = this.state;
    const attachmentEl = <input
      type="file"
      ref={attachment => {this.attachment = attachment;}}
      style="display: none;"
      onchange={this.handleSelectFile}
      accept=".jpg,.jpeg"
    />;

    if (errorGps) {
      return <div>
          <h2>Error reading GPS!<br />
            Please enable gps tags for foto.</h2>
        </div>;
    }

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
