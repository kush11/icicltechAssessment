import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Thumbnail from './YoutubeThumbnail'
const VideoCard = ({ image, videoUrl, videoDescription, videoPlayLink, navigation }) => {
    return (
        <View style={{ flex:1, width: '90%', flexDirection: 'row', }}>

            <View style={{
                padding: 10,                
                marginTop: 10,
                elevation: 5,
                borderWidth: 0.15,
                backgroundColor: 'white',
                borderRadius: 15,
                borderColor: 'transparent',
                shadowOffset: { width: 4, height: 4 },
                shadowColor: '#90a4ae',
                shadowOpacity: 5.0,

                flex: 1,                                
                // justifyContent: 'center',
                // alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    flex:1, width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={() => navigation.navigate('VideoPlayerScreen', { url: videoPlayLink })}
                >
                    <Image
                        // resizeMode='cover'
                        source={{ uri: Thumbnail(videoUrl) }}
                        style={{
                            borderWidth: 0.15,
                            borderRadius: 15,
                            height: '100%',
                            width: "100%",                          
                        }}
                    />                   
                </TouchableOpacity>
                <Text>{videoDescription}</Text>
            </View>
        </View>
    )
}
export default VideoCard;