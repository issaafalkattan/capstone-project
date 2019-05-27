import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
import  {ExcelFiles} from '../../api/files';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: false,
  inProgress : false,
}
class FileUpload extends Component {
    uploadIt = (info) => {
        const self = this;
        console.log("info", info);
        // We upload only one file, in case
        // there was multiple files selected
        const file = info.file.originFileObj; 
   
        if (file && info.event && info.event.percent === 100) {
          const uploadInstance = ExcelFiles.insert({
            file,
            meta: {
              locator: self.props.fileLocator,
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true, // If you see issues with uploads, change this to false
          }, false);
       console.log(uploadInstance)
          self.setState({
            uploading: uploadInstance, // Keep track of this instance to use below
            inProgress: true, // Show the progress bar now
          });
   
          // These are the event functions, don't need most of them, it shows where we are in the process
          uploadInstance.on('start', function () {
            self.state.fileUrl = 'none';
          });
   
          uploadInstance.on('end', function (error, fileObj) {
          });
   
          uploadInstance.on('uploaded', function (error, fileObj) {
   
            // Reset our state for the next file
       
            self.setState({
              uploading: [], 
              inProgress: false,
              filename: fileObj._id,
              fileUrl :  `${Meteor.absoluteUrl() + fileObj._downloadRoute}/files/${fileObj._id}/original/${fileObj._id}.${fileObj.extension}`,
    
            });
            console.log("File object", fileObj, error, this.state.filename);
            self.props.close();
            message.success('File ' + `${fileObj.name}` + ' uploaded Successfully');

            Meteor.call('processExcel', self.state.filename);
            message.loading("File Processing has started, the students will be shortly added to the list.", 10)


          });
   
          uploadInstance.on('error', function (error, fileObj) {
            message.error('File ' + `${fileObj.name}` + ' failed ' + `${error}`);
          });
   
          uploadInstance.on('progress', function (progress, fileObj) {
            // Update our progress bar
            self.setState({
              progress,
            });
          });
   
          uploadInstance.start(); // Must manually start the upload
        }
      }
  render() {
    return (
        <Dragger {...props}           onChange={this.uploadIt}>

        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
Please upload Excel sheet to process. 
<br/> Note that the sheet should follow the following format : 
<br />
<img src="./example.JPG" style={{maxWidth : '100%'}}/>
        </p>
      </Dragger>
    )
  }
}

export default FileUpload
