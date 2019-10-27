import React, { PureComponent } from 'react';
import {  View, Text, NativeModules, TouchableOpacity } from 'react-native';
const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "eWXb1ZM7AworQh7x2PntQgtLI",
  TWITTER_CONSUMER_SECRET: "kxibwTMGcGjbcfKALqThTApQyy4P62YaYth0r37fcuHRqPWnHQ"
}
class TwitterAuth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn:false
    };
    console.log('aa gaya');
  }


  _twitterSignIn = () => {
    console.log('aa gaya _twitterSignIn');
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret, email } = loginData
        console.log('email', email)
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      }
    )
}
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity 
          onPress={this._twitterSignIn}
        >
        <Text> componentText </Text>
        </TouchableOpacity>              
      </View>
    );
  }
}

export default TwitterAuth;
