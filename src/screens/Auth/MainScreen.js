/** 
 * FindMyBlood 
 * Main Screen Component - User Authentication
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import Statusbar from '../../components/Statusbar/Statusbar';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';
import CustomButtonBorder from '../../components/CustomButton/CustomButtonBorder';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this); 
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    //Back button handle event - Android Only
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }    

    //Button Click Listner Function
    buttonOnClickListner = (value) => {
        if(value == 'login'){
            //Navigate to Login Screena
            this.props.navigation.navigate("LoginScreen",{screen:LoginScreen})
        }else if(value == 'register'){
            //Navigate to register screen
            this.props.navigation.navigate("RegisterScreen",{screen:RegisterScreen})
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Statusbar backgroundColor={AppStyles.primaryColor}/>

            <ScrollView>
            <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
                colors={['#500B0B', '#A81643', '#FF217A']}  
                style={styles.topHeader}>

            <Image source={Assets.APP_LOGO} style={styles.appLogo}/>

            <Text style={styles.appName}>Find My Blood</Text>
            </LinearGradient>
            
            <CustomButtonBorder 
            title='LOGIN' 
            onPress= {()=> this.buttonOnClickListner('login')}/>

            <Text style={styles.betweenText}> OR </Text>

            <CustomButtonPrimary 
            title='REGISTER' 
            onPress= {()=> this.buttonOnClickListner('register')}/>

            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHeader:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/1.6,
        backgroundColor:AppStyles.primaryColor,
        borderBottomLeftRadius:150
    },
    appLogo:{
        width:Metrics.DEVICE_WIDTH/2,
        height:Metrics.DEVICE_HEIGHT/2.5,
        marginTop:Metrics.DEVICE_HEIGHT/15,
        marginLeft:Metrics.DEVICE_WIDTH/4,
        resizeMode:'contain'
    },
    betweenText:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:20,
        marginLeft:Metrics.DEVICE_WIDTH/2.2,
        marginTop:20,
    },
    appName:{
        fontFamily:AppStyles.primaryFontLight,
        color:AppStyles.colorWhite,
        fontSize:30,
        textAlign:'center',
    }
});