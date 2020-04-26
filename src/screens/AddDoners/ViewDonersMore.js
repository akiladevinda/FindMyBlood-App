/** 
 * FindMyBlood 
 * Doners Proifle View
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
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';

export default class VeiwDonersMore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_fullname:this.props.navigation.state.params.Doners.Full_Name,
            mobile_number:this.props.navigation.state.params.Doners.Mobile_Number,
            email:this.props.navigation.state.params.Doners.Email,
            dob:this.props.navigation.state.params.Doners.DOB,
            gender:this.props.navigation.state.params.Doners.Gender,
            blood_group:this.props.navigation.state.params.Doners.Blood_Group,
            address:this.props.navigation.state.params.Doners.Address,
        }
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

    //Contact User
    contactUser = (value) => {
        if(value == 'call'){
            Linking.openURL(`tel:${this.state.mobile_number}`)
        }else{
            Linking.openURL('mailto:'+this.state.email)
        }
    }


    render() {
        return (
            <View style={styles.container}>

            <HeaderPrimary title={this.state.user_fullname} onPress={ ()=> this.backButtonOnPress()}/>

            <ScrollView>

            <Image source={Assets.USER_AVATAR} style={styles.userAvatar}/>

            <View style={styles.borderSeparater}></View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Blood Group :</Text>
                <Text style={styles.infoText}>{this.state.blood_group}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Mobile Number :</Text>
                <Text style={styles.infoText}>{this.state.mobile_number}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Email :</Text>
                <Text style={styles.infoText}>{this.state.email}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Date of Birth :</Text>
                <Text style={styles.infoText}>{this.state.dob}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Gender :</Text>
                <Text style={styles.infoText}>{this.state.gender}</Text>
            </View> 

            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>Address :</Text>
                <Text style={styles.infoText}>{this.state.address}</Text>
            </View> 

            <View style={styles.borderSeparater}></View>

            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactUser('call')} style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_CALL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Get Call</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactUser('email')}  style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_EMAIL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
            </View>
            <View style={{height:10}}></View>


            </ScrollView>

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
