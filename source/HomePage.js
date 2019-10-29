import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Button, SafeAreaView, Dimensions, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox'
import TextInputs from './TextInput';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../context/card';
import VideoCard from './VideoCard';

const Data = [
    {
        id: '1',
        videoUrl: 'https://youtu.be/jPBgGA4sVmQ',
        videoPlayLink: 'https://r1---sn-5jucgv5qc5oq-cagl.googlevideo.com/videoplayback?expire=1572387042&ei=gmS4XdiWFO7Cz7sP9L-F0Aw&ip=49.207.54.3&id=o-AHMkXUj-o846WmGYOdQkIQzgfQkf8GvNt7jjrfuaEwKN&itag=22&source=youtube&requiressl=yes&mm=31,29&mn=sn-5jucgv5qc5oq-cagl,sn-npoe7n76&ms=au,rdu&mv=m&mvi=0&pl=23&pcm2=no&gcr=in&initcwndbps=1477500&mime=video/mp4&ratebypass=yes&dur=924.827&lmt=1572264641138416&mt=1572365343&fvip=4&fexp=23842630&c=WEB&txp=5535432&sparams=expire,ei,ip,id,itag,source,requiressl,pcm2,gcr,mime,ratebypass,dur,lmt&sig=ALgxI2wwRgIhAK8mHNsBfBYbIfUFTrs_pCb24DTv9z0tbRp3ToRXb7kAAiEA7QDWeUJLEyZ4WJyCvH4vV0PBiVP0m7H9pw_vRGkl7ZE=&lsparams=mm,mn,ms,mv,mvi,pl,initcwndbps&lsig=AHylml4wRgIhAO2DsQ4NyDNJzzcrnJSk10kurpz7IfjA0rzcRB__4B3eAiEA5YxvinKDWIf8s_fXpWdRpZ0861fhZ1R40PIx4x4uZL4=',
        videoDescription: 'Kapil Finds Ways To Flirt'
    },
    {
        id: '2',
        videoUrl: 'https://youtu.be/b0Go-EZEc4M',
        videoPlayLink: 'https://r5---sn-npoe7n76.googlevideo.com/videoplayback?expire=1572393406&ei=Xn24XcSQD42E1Aba2I6oCQ&ip=49.207.54.3&id=o-AI92gBFqpb3tgAX_Rb5v3_c26V05tOTAiV8UWIdlGgCH&itag=22&source=youtube&requiressl=yes&pcm2=no&mime=video/mp4&ratebypass=yes&dur=404.630&lmt=1570407251217001&fvip=5&fexp=23842630&c=WEB&txp=5535432&sparams=expire,ei,ip,id,itag,source,requiressl,pcm2,mime,ratebypass,dur,lmt&sig=ALgxI2wwRAIgSlWrjOXuWndsQkAf-sNME1QCT9SuJ1qQu_8ZELb1MqkCIHxclNwnEtN-2IZbCFUusLXvfYwIHAZhWZJRikEAUcr2&redirect_counter=1&cm2rm=sn-5jucgv5qc5oq-cagl7e&req_id=75de88e98ee5a3ee&cms_redirect=yes&mm=29&mn=sn-npoe7n76&ms=rdu&mt=1572371748&mv=m&mvi=4&pl=23&lsparams=mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIhAJFp3QuWygQJswVzxL09sx53vguksoGv6HCmv5TlDR1FAiA71IAFqmLYoBxJ4hvs95Nl7vaERVVPKjimN0OT5a0rmg==',
        videoDescription: 'BB Ki Vines- | Detective Mangloo |'
    },
    {
        id: '3',
        videoUrl: 'https://youtu.be/IWa8XnmKzA0',
        videoPlayLink: 'https://r2---sn-5jucgv5qc5oq-cagl.googlevideo.com/videoplayback?expire=1572393508&ei=xH24XcjwD-Gs3LUP29qb2A0&ip=49.207.54.3&id=o-AHkLTRVngYEaQHjz-WMtbcG5rUvXykpPYAryt9p-YzA7&itag=22&source=youtube&requiressl=yes&mm=31,29&mn=sn-5jucgv5qc5oq-cagl,sn-npoeenez&ms=au,rdu&mv=m&mvi=1&pcm2cms=yes&pl=23&pcm2=no&initcwndbps=1205000&mime=video/mp4&ratebypass=yes&dur=691.699&lmt=1572346360375733&mt=1572371779&fvip=2&fexp=23842630&c=WEB&txp=5535432&sparams=expire,ei,ip,id,itag,source,requiressl,pcm2,mime,ratebypass,dur,lmt&lsparams=mm,mn,ms,mv,mvi,pcm2cms,pl,initcwndbps&lsig=AHylml4wRQIhAIl5ghQmNHRRWMtuluB5WHxZS22bdnuqhIXKcyc_pnNXAiBj5etklKu-RqMzYKe_mmR5gBWp5m8L9ArVn8u9Z89uUA==&sig=ALgxI2wwRQIhAOzG4hNYzXdCxeuIzoD7C5dB2EiNSJxfpIT98mjyFsqBAiBZLE8S9Nsdd132vHmhqZzQWVNXhVkNKF_RooNQA3teOg==',
        videoDescription: 'Diwali Returns | Ashish Chanchlani'
    },
    {
        id: '4',
        videoUrl: 'https://youtu.be/KcBSDtfrdUI',
        videoPlayLink: 'https://r2---sn-5jucgv5qc5oq-cagl.googlevideo.com/videoplayback?expire=1572393598&ei=Hn64Xa_hJKK2z7sP39aFoAI&ip=49.207.54.3&id=o-AL1xccLFpSrphe-ImMpvQOZesSad0yVaZUCNn5GQXRNS&itag=18&source=youtube&requiressl=yes&mm=31,29&mn=sn-5jucgv5qc5oq-cagl,sn-npoe7nes&ms=au,rdu&mv=m&mvi=1&pl=23&pcm2=no&initcwndbps=1177500&mime=video/mp4&gir=yes&clen=26967661&ratebypass=yes&dur=304.042&lmt=1569829952824992&mt=1572371837&fvip=2&fexp=23842630&c=WEB&txp=5531432&sparams=expire,ei,ip,id,itag,source,requiressl,pcm2,mime,gir,clen,ratebypass,dur,lmt&lsparams=mm,mn,ms,mv,mvi,pl,initcwndbps&lsig=AHylml4wRQIgbrCeSWGEF3pZnSinxPPF0ropToY4zyYD1g1uuw_TLXQCIQD6_pTgohyebAhVXbip07HuCJiDqyubYEZeyORUdGV8_g==&sig=ALgxI2wwRAIgSk7RtKsRHhkBF1opcn0R8IDSaszs0rdc1ekLj0PDCCcCIGwwil93O5e19f0hUpCrmjRw-lEYN7tYYY6zCf_FXdqP',
        videoDescription: 'Dheere & Dheere Se | Hrithik Roshan - Sonam Kapoor'
    },
    {
        id: '5',
        videoUrl: 'https://www.youtube.com/watch?v=o27GGC3RLac',
        videoPlayLink: 'https://r2---sn-5jucgv5qc5oq-cagl.googlevideo.com/videoplayback?expire=1572393640&ei=SH64XfH2MNLDz7sP6oSykAk&ip=49.207.54.3&id=o-AL221_w3agOm-gfew4PM1FN-8MSwp5WNUDVmOVq-XReF&itag=22&source=youtube&requiressl=yes&mm=31,29&mn=sn-5jucgv5qc5oq-cagl,sn-npoeene7&ms=au,rdu&mv=m&mvi=1&pl=23&pcm2=no&initcwndbps=1177500&mime=video/mp4&ratebypass=yes&dur=852.868&lmt=1572338975899568&mt=1572371952&fvip=5&fexp=23842630&c=WEB&txp=4432432&sparams=expire,ei,ip,id,itag,source,requiressl,pcm2,mime,ratebypass,dur,lmt&lsparams=mm,mn,ms,mv,mvi,pl,initcwndbps&lsig=AHylml4wRQIgKJYWl2GHGlW23LnG8HIK7dCKcREEjvv3kkSIybR8hU8CIQCDDyhfqi8Fnl_kwcPm8LvROi_ofepkqRRB1SPe9zElvA==&sig=ALgxI2wwRQIhAJwmQCSGmBqD8L4nRDqKb-79RT6JX-JYTOGInGQDLgwJAiAZDGNTvl9ePwUO_PhKoMwOVawsqbl5RjH8Qt4SJD6Osg==',
        videoDescription: 'Behen Bhai Ki Jugalbandi - Amit Bhadana'
    }
]
export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            modelView: false
        }        
    }

    static contextType = UserContext;

    componentDidMount() {
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
                image={item.thumbNail}
                videoUrl={item.videoUrl}
                videoPlayLink={item.videoPlayLink}
                videoDescription={item.videoDescription}
            />
        </View>
    )
    async logout() {
        await AsyncStorage.removeItem('data');
        this.props.navigation.navigate('FrontPageScreen');
    }


    render() {
        const { userData, image } = this.state;
        if (userData.name) {
            return (
                <View style={styles.container}>
                    <View style={{
                        flex: 1,
                        borderWidth: 1,
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}><Text style={{
                            fontSize: 25
                        }}>{this.state.userData.name}</Text></View>
                        <View style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                onPress={() =>
                                    // this.setState({ modelView: true })
                                    this.refs.modal1.open()
                                }
                            >
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
                    <Modal
                        style={{ height: '85%', width: '95%', borderRadius: 20, borderWidth: 1 }}
                        ref={"modal1"}
                        // swipeToClose={false}
                        // onClosed={this.onClose}
                        onOpened={this.onOpen}
                        onClosingState={this.onClosingState}>
                        <Text style={styles.text}></Text>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{
                                    height: 140,
                                    width: 140,
                                    borderRadius: 280,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                    onPress={() => this.setState({ cameraModel: true })}
                                >
                                    {this.state.imageUrl !== '' ? <Image source={{ uri: this.state.userData.image }}
                                        style={{
                                            height: 140,
                                            width: 140,
                                            borderRadius: 280,
                                        }}
                                    /> : <Text>Click to Add Photo</Text>}
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 8 }}>
                                <TextInputs placeholder={'Name'} Title={'Name'} value={this.state.userData.name} />
                                <TextInputs placeholder={'Email'} Title={'Email'} value={this.state.userData.email} />
                                <TextInputs placeholder={'Enter your Age'} Title={'Age'} value={this.state.userData.age} />
                                <TextInputs placeholder={'Enter your Hobby'} Title={'Hobbies'} value={this.state.userData.hobbies} />
                                <TextInputs placeholder={'Write your shord Description about you'} Title={'Description'} value={this.state.userData.description} />
                            </View>
                            <View style={{
                                flex: 1,
                                margin: 40,
                                alignSelf: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    borderRadius: 20,
                                    height: 40,
                                    width: 80,
                                    backgroundColor: '#24a0ed',
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    onPress={() => this.logout()}
                                >
                                    <Text>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            )
        }
        else {
            return null
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