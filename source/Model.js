import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, AsyncStorage, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modalbox'
import Dialog from 'react-native-dialog';
import { Toast } from 'native-base';
import ImagePickerCrop from 'react-native-image-crop-picker';
import UserContext from '../context/card';
import TextInputs from './TextInput';

const screen = Dimensions.get('window');
class Model extends Component {
  static contextType = UserContext;
  // this.context

  constructor(props) {
    super(props);
    this.state = {
      cameraModel: false,
      imageUrl: '',
    };
  }
  submitData = (name) => {
    if (name === 'Login') {
      let userData = this.context;
      userData.image = this.state.imageUrl;
      { userData.name === this.state.name ? null : userData.name }
      for (var key in userData) {
        if (userData[key] === "") {
          alert('Must be filled ' + key);
          return
        }
      }
      this.props.submit(this.state.imageUrl);
      this.props.navigation('HomePageScreen', {
        userData: this.context
      });
    }
    if (name === 'Logout') {
      this.props.logoutFun();
    }
  }
  cameraModel = (arg) => {
    arg === "Cancel" ? this.setState({ cameraModel: false }, () => Toast.show({
      text: 'Cancel By User',
      duration: 2000,
      type: 'default'
    })) : this.setState({ cameraModel: true })
  }
  callImagePicker = (mode) => {
    if (mode === 'Camera') {
      ImagePickerCrop.openCamera({
        cropping: true,
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        this.setState({ cameraModel: false, imageUrl: image.path })
      });
    }
    else {
      ImagePickerCrop.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        this.setState({ cameraModel: false, imageUrl: image.path })
      });
    }

  }
  render() {
    // if (this.props.open) { this.refs.modal1.open(); }    
    return (
      <Modal
        style={{ height: '85%', width: '95%', borderRadius: 20, borderWidth: 1 }}
        // ref={"modal1"}
        swipeToClose={false}
        isOpen={this.props.open}
        // onClosed={this.onClose}
        onOpened={this.onOpen}
        onClosingState={this.onClosingState}>
        <Text style={styles.text}></Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{
              height: 140,
              width: 140,
              borderRadius: 280,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => this.setState({ cameraModel: true })}
            >
              {this.state.imageUrl !== '' || this.props.imageSrc ? <Image
                source={{
                  uri: this.state.imageUrl === '' ? this.props.imageSrc : this.state.imageUrl
                }}
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 280,
                }}
              /> : <Text>Click to Add Photo</Text>}
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <TextInputs placeholder={'Name'} Title={'Name'} value={this.context.name ? this.context.name : this.props.name} />
            <TextInputs placeholder={'Email'} Title={'Email'} value={this.props.email} />
            <TextInputs placeholder={'Enter your Age'} Title={'Age'} value={this.props.age} />
            <TextInputs placeholder={'Enter your Hobby'} Title={'Hobbies'} value={this.props.hobbies} />
            <TextInputs placeholder={'Write your shord Description about you'} Title={'Description'} value={this.props.description} />
          </View>
          <View style={{
            flex: 1,
            margin: 40,
            alignSelf: 'center'
          }}>
            <TouchableOpacity style={{
              flex: 1,
              borderRadius: 20,
              height: 40,
              width: 80,
              backgroundColor: '#24a0ed',
              justifyContent: 'center', alignItems: 'center'
            }}
              onPress={() => this.submitData(this.props.buttonText)}
            >
              <Text>{this.props.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Dialog.Container visible={this.state.cameraModel} onBackdropPress={() => this.cameraModel("Cancel")} style={{ borderRadius: 30 }}>
          <Dialog.Title style={styles.profileTitle}>
            Choose Profile Picture
          </Dialog.Title>
          <TouchableOpacity style={styles.cameraText} onPress={() => this.callImagePicker("Camera")}>
            <Text style={styles.cameraTextStyle}>Take Photo...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraText} onPress={() => this.callImagePicker("Gallary")}>
            <Text style={styles.cameraTextStyle}>Choose from Library...</Text>
          </TouchableOpacity>
          <Dialog.Button style={{ fontFamily: 'System' }} label="Cancel" onPress={() => this.cameraModel("Cancel")} />
        </Dialog.Container>
      </Modal>
    )
  }


}
const styles = StyleSheet.create({

  text: {
    color: "black",
    fontSize: 22
  }, profileTitle: {
    fontFamily: 'System',
    color: 'black',
    fontSize: 22
  },
  cameraText: {
    marginLeft: 15,
    height: 40,
    width: "100%",
    fontSize: 18
  },
  cameraTextStyle: {
    fontFamily: 'System',
    fontSize: 18
  },

});

export default Model;