import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, SafeAreaView, Dimensions, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../context/card';
import VideoCard from './VideoCard';
import youtubedl from 'react-native-ytdl';
import Model from './Model'
let Data = [
    {
        id: '1',
        videoUrl: 'https://youtu.be/jPBgGA4sVmQ',
    },
    {
        id: '2',
        videoUrl: 'https://youtu.be/b0Go-EZEc4M',
    },
    {
        id: '3',
        videoUrl: 'https://youtu.be/IWa8XnmKzA0',
    },
    {
        id: '4',
        videoUrl: 'https://youtu.be/KcBSDtfrdUI',
    },
    {
        id: '5',
        videoUrl: 'https://www.youtube.com/watch?v=o27GGC3RLac',
    }
]
export default class HomePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            modelView: false,
            data: false
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        let count = 0;
        Data.forEach((el, index, arr) => {
            youtubedl.getInfo(el.videoUrl, {}, (err, info) => {
                count++;
                Data[index].videoLink = info.formats[0].url
                Data[index].videoTitle = info.title
                // console.log('url link', info.formats[0].url);
                if (count === arr.length) {
                    this.setState({ data: true });
                }
            });
        })
        AsyncStorage.getItem('data').then((data) => {
            localData = JSON.parse(data);
            this.setState({ userData: localData })
        })
    }
    renderItem = ({ item }) => (
        <View style={{
            flex: 1,
            height: 200, width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            // alignSelf:'center'
        }}>
            <VideoCard navigation={this.props.navigation}
                videoUrl={item.videoUrl}
                videoPlayLink={item.videoLink}
                videoTitle={item.videoTitle}
            />
        </View>
    )
    logout = async () => {
        await AsyncStorage.removeItem('data');
        console.log(this.props);
        this.props.navigation.navigate('FrontPageScreen');
    }

    openModal = () => {
        this.setState(prevState => ({
            modelView: !prevState.modelView
        }));
    }


    render() {
        const { userData, image, data } = this.state;
        if (userData.name && data) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1, borderWidth: 1, flexDirection: 'row', }}>
                        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25 }}>
                                {this.state.userData.name}
                            </Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.openModal()}>
                                <Image
                                    // resizeMode={'center'}
                                    style={styles.imageCircle}
                                    source={{ uri: userData.image }} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <SafeAreaView style={{ flex: 10, width: '100%' }}>
                        <FlatList
                            data={Data}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                    <Model
                        name={this.state.userData.name}
                        email={this.state.userData.email}
                        description={this.state.userData.description}
                        hobbies={this.state.userData.hobbies}
                        open={this.state.modelView}
                        buttonText={'Logout'}
                        navigation={this.props.navigation.navigate}
                        imageSrc={this.state.userData.image}
                        age={this.state.userData.age}
                        logoutFun={this.logout}
                    // submit={this.saveData}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#00ff00" />                    
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageCircle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        borderWidth: 1,
        // borderRadius: 10
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
})