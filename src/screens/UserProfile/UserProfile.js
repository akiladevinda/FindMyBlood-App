/** 
 * FindMyBlood 
 * User Profile Detail Scfeen
 */


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import API from '../../config/API';

export default class UserPfofile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_fullname:'',
            mobile_number:'',
            email:'',
            nic:'',
            gender:'',
            dob:'',
            address:'',
            loading:false
        }
    }

    componentWillMount(){
        this.getUserEmail().then((Logged_User_Email) => {
            let Email = JSON.parse(Logged_User_Email)
            this.API_GetUserDetails(Email);
          })
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //getting user email from async
    getUserEmail = async () => {
        let Logged_User_Email = await AsyncStorage.getItem('Logged_User_Email');
        return Logged_User_Email;
    }

    //Contact User
    contactUser = (value) => {
        if(value == 'call'){
            Linking.openURL(`tel:${this.state.mobile_number}`)
        }else{
            Linking.openURL('mailto:'+this.state.email)
        }
    }

    //Api fetch for getting user details
    API_GetUserDetails = (value) => {
        this.setState({loading:true})
        let Email = value

        fetch(API.API_GET_USERPROFILE,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Email": Email
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.data[0].status_code == '200'){
                    this.setState({
                        user_fullname:responseText.data[0].Full_Name,
                        mobile_number:responseText.data[0].Mobile_Number,
                        email:responseText.data[0].Email,
                        nic:responseText.data[0].NIC_Number,
                        gender:responseText.data[0].Gender,
                        dob:responseText.data[0].DOB,
                        address:responseText.data[0].Address,
                    })
                }else{

                }
            })
            .catch((error) => {
        });
    }


    render() {
        return (
            <View style={styles.container}>

            <HeaderPrimary title={this.state.user_fullname} onPress={ ()=> this.backButtonOnPress()}/>

            <ScrollView>

            <Image source={Assets.USER_AVATAR} style={styles.userAvatar}/>

            <View style={styles.borderSeparater}></View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your Email :</Text>
                <Text style={styles.infoText}>{this.state.email}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your Mobile Number :</Text>
                <Text style={styles.infoText}>{this.state.mobile_number}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your NIC Number :</Text>
                <Text style={styles.infoText}>{this.state.nic}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your Gender :</Text>
                <Text style={styles.infoText}>{this.state.gender}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your Date of Birth :</Text>
                <Text style={styles.infoText}>{this.state.dob}</Text>
            </View> 


            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Your Address :</Text>
                <Text style={styles.infoText}>{this.state.address}</Text>
            </View> 

            <View style={styles.borderSeparater}></View>

            <View style={{height:10}}></View>


            </ScrollView>

            <Spinner
            visible={this.state.loading}
            cancelable={false}
            />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userAvatar:{
        width:200,
        height:200,
        resizeMode:'contain',
        marginLeft:Metrics.DEVICE_WIDTH/4
    },
    borderSeparater:{
        width:Metrics.DEVICE_WIDTH/1.2,
        height:2,
        backgroundColor:AppStyles.colorBlack,
        marginLeft:Metrics.DEVICE_WIDTH/12,
        marginTop:20
    },
    infoContainer:{
        alignItems:'center'
    },
    infoHeading:{
        fontFamily:AppStyles.primaryFont,
        fontSize:22,
        marginTop:10
    },
    infoText:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:20,
        color:AppStyles.primaryColorLight,
        marginTop:5,
    },
    bottonCotainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:'center',
    },
    buttonContainer:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.6,
        backgroundColor:'transparent',
        // padding:20,
        shadowOpacity:30,
        borderRadius:10,
        borderColor:AppStyles.primaryColor,
        borderWidth:2,
        marginTop:15,
        flexDirection:'row'
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFont,
        marginTop: Metrics.DEVICE_HEIGHT/50,
        color:AppStyles.primaryColor,
        marginLeft:Metrics.DEVICE_WIDTH/10
    },
    buttonIcon:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginTop:3,
        marginLeft:5
    }

});
