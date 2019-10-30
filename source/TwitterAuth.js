import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, NativeModules, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Dialog from "react-native-dialog";
import Modal from 'react-native-modalbox'
import Model from './Model';
import HomePage from './HomePage'
import CardConetxt from '../context/card';
const { RNTwitterSignIn } = NativeModules

const screen = Dimensions.get('window');
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "eWXb1ZM7AworQh7x2PntQgtLI",
  TWITTER_CONSUMER_SECRET: "kxibwTMGcGjbcfKALqThTApQyy4P62YaYth0r37fcuHRqPWnHQ"
}
class TwitterAuth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showModal: false,
      name: '',
      image: '',
      age: '',
      hobbies: '',
      email: '',
      description: '',
    };
  }

  saveData = (data) => {
    const { name, image, age, hobbies, description, email } = this.state;
    if (name && age && hobbies && description) {
      let arr = {
        name,
        image: data,
        age,
        hobbies,
        description,
        email
      }
      try {
        AsyncStorage.setItem('data', JSON.stringify(arr))

      } catch (error) {
        // Error saving data
        console.log('error in storing', error);
      }
    }
    this.setState({ image: data , showModal:false})
  }
  componentDidMount() {
    AsyncStorage.getItem('data').then((data) => {
      if (data) {
        this.props.navigation.navigate('HomePageScreen');
      }
    })
  }
  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const { authToken, authTokenSecret, email } = loginData
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true,
            showModal: true,
            name: loginData.name,
            email: loginData.email
          });
        }
      })
      .catch(error => {
        console.log("error", error)
      }
      )
  }
  setUserName = name => {
    console.log('Settng user Nmae', name);
    this.setState({ name });
  }
  setUserAge = age => {
    console.log('Settng age age', age)
    this.setState({ age });
  }
  setUserHobbies = hobbies => {
    console.log('Settng hobbies hobbies', hobbies)
    this.setState({ hobbies });
  }
  setUserDescription = description => {
    console.log('Settng description description', description)
    this.setState({ description });
  }
  render() {
    return (
      <CardConetxt.Provider
        value={{
          name: this.state.name,
          image: this.state.image,
          age: this.state.age,
          hobbies: this.state.hobbies,
          description: this.state.description,
          setUserName: this.setUserName,
          setUserAge: this.setUserAge,
          setUserDescription: this.setUserDescription,
          setUserHobbies: this.setUserHobbies,
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'gray',
        }}>
          <Image
            resizeMode="contain"
            source={{ uri: 'http://pngimg.com/uploads/twitter/twitter_PNG9.png' }}
            style={{
              flex: 1,
              height: '100%', width: '100%'
            }}
          />
          <TouchableOpacity

            style={{
              borderWidth: 1,
              height: 50,
              width: 230,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 20,
              backgroundColor: '#64ad6a',
              // top:10,
              bottom: 130,
            }}
            onPress={this._twitterSignIn}
          >
            <Text style={{ fontSize: 20 }}> Login With Twitter</Text>
          </TouchableOpacity>
          <Model
            email={this.state.email}
            open={this.state.showModal}
            navigation={this.props.navigation.navigate}
            submit={this.saveData}
            buttonText={'Login'}
          />
        </View>
      </CardConetxt.Provider>
    );
  }
}


export default TwitterAuth;
