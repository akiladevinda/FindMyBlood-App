/** 
 * FindMyBlood 
 * Missing Person View More Screen
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    BackHandler,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import HeaderBackBtn from '../../components/Header/HeaderBackBtn';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';

export default class NewsFeedMore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organizer_name:this.props.navigation.state.params.News.Organizer_Name,
            organizer_email:this.props.navigation.state.params.News.Organizer_Email,
            organizer_mobile:this.props.navigation.state.params.News.Organizer_Mobile_No,
            event_title:this.props.navigation.state.params.News.Event_Title,
            event_date:this.props.navigation.state.params.News.Event_Date,
            event_time:this.props.navigation.state.params.News.Event_Time,
            event_location:this.props.navigation.state.params.News.Event_Location,
 
        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //Back Button Press Event
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //Contact User Button Press
    contactReporter = (value) => {
        if(value == 'call'){
            Linking.openURL(`tel:${this.state.organizer_mobile}`)
        }else{
            Linking.openURL('mailto:'+this.state.organizer_email)
        }
    }

    render() {
        return (
            <View style={styles.container}>

            <ScrollView>
            <LinearGradient 
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
            colors={['#500B0B', '#A81643', '#FF217A']}   
            style={styles.headerView}>

            <HeaderBackBtn title='News Feed' onPress={ () => this.backButtonOnPress()}/>

            <Text style={styles.title}>{this.state.event_title}</Text>

            <View style={{height:20}}></View>


            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Date : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.event_date}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Time : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.event_time}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Location : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.event_location}</Text>
            </View>

            </LinearGradient>

            <View style={{height:20}}></View>

            <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Posted By : </Text>
            <View style={{height:20}}></View>
            <Text style={styles.infoBody}>{this.state.organizer_name}</Text>
            </View>
            <View style={{height:20}}></View>
            <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Contact : </Text>
            <View style={{height:20}}></View>
            </View>
            
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactReporter('call')} style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_CALL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Get Call</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactReporter('email')}  style={styles.buttonContainer}>
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
    headerView:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/1.7,
       borderBottomRightRadius:100,
       borderBottomLeftRadius:100,
    },
    title:{
        fontFamily:AppStyles.primaryFont,
        color:AppStyles.colorWhite,
        fontSize:20,
        textAlign:'center',
        marginTop:Metrics.DEVICE_HEIGHT/30
    },
    missingPersons:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.3)',
        width:Metrics.DEVICE_WIDTH/1.1,
        height:Metrics.DEVICE_HEIGHT/10,
        marginLeft:Metrics.DEVICE_WIDTH/25,
        marginTop:5,
        borderRadius:10,
    },
    misssingPersonsText:{
        textAlign:'left',
        fontFamily:AppStyles.primaryFontLight,
        fontSize:18,
        color:AppStyles.colorWhite,
        marginTop:20,
        marginLeft:10,
    },
    infoConrainer:{
        marginLeft:Metrics.DEVICE_WIDTH/12
    },
    infoHeading:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:22,
        color:AppStyles.colorBlack,
    },
    infoBody:{
        fontFamily:AppStyles.primaryFont,
        fontSize:20,
        color:AppStyles.colorBlack,
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