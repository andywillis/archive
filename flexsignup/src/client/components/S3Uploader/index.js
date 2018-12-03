import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import styles from './styles';

function onUploadError(e) {
  console.log(e);
}

async function getSignedUrl(file, callback) {
  const host = 'https://urlsigner-uiczqjvmcp.now.sh';
  const res = await fetch(`${host}/?objectName=${file.name}`);
  const config = await res.json();
  callback(config);
}

function S3Uploader(props) {

  const { handleResponse, classes, valid } = props;
  const fixedClasses = classNames(classes.upload, !valid && classes.invalid);

  return (
    <ReactS3Uploader
      className={fixedClasses}
      getSignedUrl={getSignedUrl}
      onError={onUploadError}
      onFinish={handleResponse}
      contentDisposition="auto"
      autoUpload
    />
  );

}

export default withStyles(styles)(S3Uploader);
