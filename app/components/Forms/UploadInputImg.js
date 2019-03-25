import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MaterialDropZone from './MaterialDropZone';

class UploadInputImg extends React.Component {
  render() {
    const { updateImages } = this.props;
    return (
      <Fragment>
        <div>
          <MaterialDropZone
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews
            maxSize={5000000}
            // filesLimit={5}
            text="Drag and drop image(s) here or click"
            updateImages={updateImages}
            multiple={false}
          />
        </div>
      </Fragment>
    );
  }
}

UploadInputImg.propTypes = {
  updateImages: PropTypes.func.isRequired
};
export default UploadInputImg;
