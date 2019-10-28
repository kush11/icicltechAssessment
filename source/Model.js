import React, {Component} from 'react';
import {  View, Text,Image, StyleSheet,Button,AsyncStorage, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import Modal from 'react-native-modalbox'
import Dialog from 'react-native-dialog';
import { Toast } from 'native-base';
import ImagePickerCrop from 'react-native-image-crop-picker';
import UserContext from '../context/card';
import TextInputs from './TextInput';

const screen  = Dimensions.get('window');
class Model extends Component{
    static contextType = UserContext;
    // this.context

    constructor(props) {
        super(props);
        this.state = {
            cameraModel:false,
            imageUrl:'', 
        };
        console.log('preprereasasas',props);
        console.log('aa gaya'+this.context);
      }      

    componentDidMount(){
        console.log(this.context);
    }
    submitData = () =>{
        console.log('Submit Button');
        let userData = this.context;
        userData.image = this.state.imageUrl;
        {userData.name === this.state.name ? null : userData.name}
        console.log("dsdsdsdsdsds", userData)
        for(var key in userData) {
            if(userData[key] === "") {            
            alert('Must be filled '+key);
            return
            }
        }
        this.props.submit(this.state.imageUrl);
        // props.navigation.nagivate('HomePageScreen');
        this.props.navigation('HomePageScreen',{
            userData:this.context
        })
    }
    cameraModel = (arg) =>{
        arg === "Cancel" ? this.setState({ cameraModel: false }, () => Toast.show({
          text: 'Cancel By User',
          duration: 2000,
          type: 'default'
        })) : this.setState({ cameraModel: true })
    }  
    callImagePicker = (mode) =>{
        if(mode === 'Camera'){
            ImagePickerCrop.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log('openCamera',image);                
                this.setState({cameraModel:false, imageUrl:image.path})
              }); 
        }            
        else {
            ImagePickerCrop.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log('openPicker',image);
                this.setState({cameraModel:false, imageUrl:image.path})
              });    
        }
        
    } 
    render(){
        if(this.props.open) {this.refs.modal1.open();}        
        return(
            <Modal
              style={{height:'85%', width:'85%', borderRadius:20, borderWidth:1}}
              ref={"modal1"}
              // swipeToClose={this.state.swipeToClose}
              // onClosed={this.onClose}
              onOpened={this.onOpen}
              onClosingState={this.onClosingState}>
                <Text style={styles.text}></Text>
                <ScrollView style={{flex:1}}>
                <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={{
                    height:140,
                    width:140,
                    borderRadius:280,
                    borderWidth:1, 
                    justifyContent:'center', 
                    alignItems:'center'
                  }}
                //   onPress={()=>ImagePicker()}
                onPress={()=>this.setState({cameraModel:true})}
                  >
                    {/* <Text>Photp</Text> */}
                    {/* file:///storage/emulated/0/Pictures/a2c9b159-8924-4327-a3c4-6de8a479d462.jpg */}
                    {/* source{{uri:'file:///storage/emulated/0/DCIM/IMG_20161201_125218.jpg'}} */}
                    {this.state.imageUrl !== ''?<Image source={{uri:this.state.imageUrl}} 
                            style={{
                                height:140,
                    width:140,
                    borderRadius:280,
                            }}
                    />: <Text>Click to Add Photo</Text>}
                  </TouchableOpacity>
                  </View>
                  <View style={{flex:8}}>
                  {/* <TextInput
                      style={{
                        height:40,
                        margin:30,
                        borderBottomColor:'gray',
                        borderBottomWidth:1
                      }}
                      placeholder='Name'
                    />
                    <TextInput
                      style={{
                        height:40,
                        margin:30,
                        borderBottomColor:'gray',
                        borderBottomWidth:1
                      }}
                      placeholder='Enter your Age'
                    />
                    <TextInput
                      style={{
                        height:40,
                        margin:30,
                        borderBottomColor:'gray',
                        borderBottomWidth:1
                      }}
                      placeholder='Enter your Hobby'
                    />
                    <TextInput
                      style={{
                        height:40,
                        margin:30,
                        borderBottomColor:'gray',
                        borderBottomWidth:1
                      }}
                      placeholder='Write your shord Description about you'
                    /> */}
                    <TextInputs placeholder='Name' />
                    <TextInputs placeholder={'Enter your Age'}/>
                    <TextInputs placeholder={'Enter your Hobby'}/>
                    {/* <MultiSelect/> */}
                    <TextInputs placeholder={'Write your shord Description about you'}/>
                    <Button title="Basic modal" 
                    onPress={() => this.submitData()} 
                    style={styles.btn}/>
                  </View>
                  {/* <View style={{flex:1, backgroundColor:'red'}}>
                    <Text>dsdsdsdsd</Text>
                  </View> */}
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

    wrapper: {
      paddingTop: 50,
      flex: 1
    },
  
    modal: {
      // justifyContent: 'center',
      // alignItems: 'center'
    },
  
    modal2: {
      height: 230,
      backgroundColor: "#3B5998"
    },
  
    modal3: {
      height: 300,
      width: 300
    },
  
    modal4: {
      height: 300
    },
  
    btn: {
      margin: 10,
      backgroundColor: "#3B5998",
      color: "white",
      padding: 10
    },
  
    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },
  
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