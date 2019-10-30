import React, { Component } from 'react'

import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation'
class VideoPlayerView extends Component {

    componentWillMount() {
        Orientation.lockToLandscape();
    }
    componentWillUnmount() {        
        Orientation.lockToPortrait();
    }

    render() {
        const { navigation } = this.props;
        const videoUrl = navigation.getParam('url');        
        return (
            <View style={{ flex: 1 }}>
                <VideoPlayer
                    source={{ uri: videoUrl }}
                    navigator={this.props.navigator}
                    onBack={() => this.props.navigation.navigate('HomePageScreen')}
                />
                {/* <WebView
                    style={{marginTop: 10}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: videoUrl }}
                /> */}
            </View>
        )
    }
}

export default VideoPlayerView;