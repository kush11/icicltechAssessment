import React, {PureComponent} from 'react'

import {View,Text} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

class VideoPlayerView extends PureComponent{    
    render(){        
        const {navigation} =this.props;        
        const videoUrl = navigation.getParam('url')
        console.log(videoUrl);
        return(
            <View style={{flex:1}}>
               <VideoPlayer
            source={{ uri: videoUrl }}
            navigator={ this.props.navigator }
            onBack = {()=>null}
                />
            </View>
        )
    }
}

export default VideoPlayerView;