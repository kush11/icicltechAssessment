import React from 'react';
import { View } from 'react-native';
import ImagePickerCrop from 'react-native-image-crop-picker';

const ImagePicker = (mode) => {
  const path = '';
  if (mode === 'Camera') {
    ImagePickerCrop.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
    path = image.path
  }
  else {
    ImagePickerCrop.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
    path = image.path
  }
  return path
}

export default ImagePicker