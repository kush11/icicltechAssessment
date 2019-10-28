import React, {Component} from 'react';
import {View,Text,Image,SafeAreaView,FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../context/card';
import VieoCard from './VideoCard';
import VideoCard from './VideoCard';

const Data=[
    {
        id:'1',
        videoUrl:'1',
        name:'Demo',
        thumbNail:'https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg'
    },
    {
        id:'2',
        videoUrl:'2',
        name:'Demo1',
        thumbNail:'https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg'
    },
    {
        id:'3',
        videoUrl:'3',
        name:'Demo3',
        thumbNail:'https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg'
    },
    {
        id:'4',
        videoUrl:'4',
        name:'Demo4',
        thumbNail:'https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg'
    },
    {
        id:'5',
        videoUrl:'5',
        name:'Demo4',
        thumbNail:'https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg'
    }
]
export default class HomePage extends Component {
    state={
        userData:{}
    }    
    static contextType = UserContext;

    componentDidMount(){
        AsyncStorage.getItem('data').then((data)=>
        {
            console.log(data);
            dd = JSON.parse(data);
            console.log(dd);
            this.setState({userData:dd})
        }) 
    }
    renderItem = ({item}) => (
        <View style={{
            flex:1,
        height:110, width:'100%', 
        justifyContent:'center', 
        alignItems:'center'
        // alignSelf:'center'
        }}>
        <VideoCard image={item.thumbNail} name={item.name} videoUrl={item.videoUrl}/>        
        </View>
    )


    render(){   
        // const {navigation} =this.props;
        // const userData = navigation.getParam('userData');
        // let Data = this.context;
        // console.log('dsdsd', Data);
        // console.log('dsdsd', userData);
        const {userData} = this.state;
        if(userData.name){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1,width:'100%'}}>
                    <FlatList
                        data={Data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                    {/* <VieoCard  image={userData.image}/> */}
                </SafeAreaView>
            </View>
        )
                        }
                        else{
                            return null
                        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1        
    }
})