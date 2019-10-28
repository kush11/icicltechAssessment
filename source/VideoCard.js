import React from 'react';
import {View, Text,Image,TouchableOpacity } from 'react-native';
const VideoCard = ({image,videoUrl, name, navigation}) =>{
    return(
        <View style={{height:100,width:'90%', flexDirection:'row',}}>
            
                    <View style={{flex:1, 
                    backgroundColor:'red', 
                    borderRadius:20,
                    justifyContent:'center', alignItems:'center'
                    }}>
                        <TouchableOpacity style={{
                            height:100,width:'90%',
                            justifyContent:'center', 
                            alignItems:'center'
                        }}                       
                        onPress={()=>navigation.navigate('VideoPlayerScreen',{url:videoUrl})}                        
                        >
                        <Image 
                        // resizeMode='cover'
                        source={{uri:image}} 
                            style={{
                                height:100,
                                width:100,
                                borderRadius:200,
                            }}
                    />
                        </TouchableOpacity>
                    </View>                   
                </View>
    )
}
export default VideoCard;