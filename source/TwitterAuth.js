import React, { PureComponent } from 'react';
import {  View, Text, StyleSheet,NativeModules, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Dialog from "react-native-dialog";
import Modal from 'react-native-modalbox'
import Model from './Model';
import HomePage from './HomePage'
import CardConetxt from '../context/card';
const { RNTwitterSignIn } = NativeModules

const screen  = Dimensions.get('window');
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "eWXb1ZM7AworQh7x2PntQgtLI",
  TWITTER_CONSUMER_SECRET: "kxibwTMGcGjbcfKALqThTApQyy4P62YaYth0r37fcuHRqPWnHQ"
}
class TwitterAuth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn:false,
      showModal:false,
      name:'',
      image:'',
      age:'',
      hobbies:'',
      description:''
    };
    console.log('aa gaya');
    console.log('aa gaya',props);
  }
//auth token 197003058-bA09khQN4YaT2tFTKxGCWYRSCc2r3SXLOemzJqvr
//auth token secret 7OmCa9nT7lqT5yW5Rufjx90Rm8mBOdT13PDAoHLjzVqBk
//user id 197003058
// authToken:"197003058-bA09khQN4YaT2tFTKxGCWYRSCc2r3SXLOemzJqvr"
// authTokenSecret:"7OmCa9nT7lqT5yW5Rufjx90Rm8mBOdT13PDAoHLjzVqBk"
// email:"sagar.vivek159@gmail.com"
// name:"sagarvivek1516"
// userID:"197003058"
// userName:"sagarvivek1516"
    saveData = (data) =>{       
      const {name,image,age,hobbies,description} = this.state;
      if(name && age && hobbies && description){
        let arr = {
          name,
          image:data,
          age,
          hobbies,
          description
        }
        try {       
          // AsyncStorage.setItem(key, value,()=>{console.log('data is saved')})        
          AsyncStorage.setItem('data', JSON.stringify(arr))
  
        } catch (error) {
          // Error saving data
          console.log('error in storing', error);
        }
      }  
      this.setState({image:data})    
    }
    componentDidMount(){
      // const data = AsyncStorage.getItem('data');
      console.log('aa gaya',this.props);
      // let d = AsyncStorage.getItem('data');
      // let dd = JSON.parse(d);
      // console.log(dd);
      AsyncStorage.getItem('data').then((na)=>{
        console.log(na);
        if(na)
        {
          this.props.navigation.navigate('HomePageScreen');
        }
      })      
    }
  _twitterSignIn = () => {
    console.log('aa gaya _twitterSignIn');
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret, email } = loginData
        console.log('email', email)
        const userId = loginData.userID;
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true,
            showModal:true,
            name:loginData.name,
          });
        }
      })
      .catch(error => {
        console.log("error", error)
      }
    )
}
// openModal = () =>{
//   this.setState({showModal:true})
// }
setUserName = name =>{
  console.log('Settng user Nmae', name);
  this.setState({name});
}
setUserAge = age =>{
  console.log('Settng age age', age)
  this.setState({age});
}
setUserHobbies = hobbies =>{
  console.log('Settng hobbies hobbies', hobbies)
  this.setState({hobbies});
}
setUserDescription = description =>{
  console.log('Settng description description', description)
  this.setState({description});
}
  render() {
    // console.log('aa gaya',props);
    console.log('aa gaya',this.props);
    return (
      <CardConetxt.Provider 
        value={{
          name:this.state.name,
          image:this.state.image,
          age:this.state.age,         
          hobbies: this.state.hobbies,
          description:this.state.description,
          setUserName: this.setUserName,
          setUserAge:this.setUserAge,
          setUserDescription:this.setUserDescription,
          setUserHobbies:this.setUserHobbies,
        }}
      >
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity 
          onPress={this._twitterSignIn}
        >
        <Text> componentText </Text>
        </TouchableOpacity>           

        {/* <TouchableOpacity           
          onPress={()=>this.openModal()}          
        >
            <Text> OPen Modal </Text>
        </TouchableOpacity>                     */}
          <Model open={this.state.showModal} navigation={this.props.navigation.navigate} submit={this.saveData} />
      </View>
      </CardConetxt.Provider>
    );
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
  }

});

export default TwitterAuth;
