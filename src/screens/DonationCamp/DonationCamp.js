/** 
 * FindMyBlood 
 * Donation Camp Adding Page
 */


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
    BackHandler,
    Image,
    TouchableOpacity
} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import Assets from '../../config/Assets';
import AppStyles from '../../config/AppStyles';
import Metrics from '../../config/Metrics';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';
import Textarea from '../../components/TextArea';


export default class DonationCamp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organizer_name:'',
            organizer_email:'',
            organizer_mobile_number:'',
            event_title:'',
            event_location:'',
            event_date:'Select Date',
            event_time:'Select Time',
            event_details:'',
            loading:false,
            isDatePickerVisible: false,
            isTimePickerVisible:false,

        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //On Press event for the back button 
    backButtonOnPress = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack(null);
        return true;
    }

    //Home navigation
    navigateToHome = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack(null);
        return true;
    }

    //Date Picker handling methods
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        const mdate = date.toString().split(" ");
        this.setState({
            event_date : mdate[1] + " " + mdate[2] + ", " + mdate[3]
        });
        this.hideDatePicker();
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    //Time Picker Methods
    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };
    
    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };
    
    handleTimePicked = date => {
        const mtime = date.toString().split(" ");
        this.setState({
            event_time : mtime[4]
        });
        this.hideTimePicker();
    };

    //Submit form validation
    submitFormValidation = () => {

        if(this.state.organizer_name.length<=0 || this.state.organizer_email.length<=0 ||
            this.state.organizer_mobile_number.length<=0 || this.state.event_title.length<=0||
            this.state.event_date.length<=0 || this.state.event_time.length<=0 ||
            this.state.event_location.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_CreateDonationCamp();
            }

    }

    //Add New Doner API Fetch Method
    API_CreateDonationCamp= () => {
        this.setState({loading:true})

        fetch(API.API_ADD_CAMP,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Organizer_Name":this.state.organizer_name,
                "Organizer_Email":this.state.organizer_email,
                "Organizer_Mobile_No":this.state.organizer_mobile_number,
                "Event_Title":this.state.event_title,
                "Event_Date":this.state.event_date,
                "Event_Time":this.state.event_time,
                "Event_Location":this.state.event_location
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.status_code == '200'){
                    Alert.alert(
                        'Donation Camp Created',
                        'You have successfully created new donation camp...',
                        [
                        {text: 'OK',onPress: () => this.navigateToHome()},
                        ],
                        {cancelable: false},
                    );
                }else if(responseText.status_code == '401'){
                    Alert.alert(
                        'Error Occured !',
                        'Please try again later...',
                        [
                        {text: 'OK',},
                        ],
                        {cancelable: false},
                    );
                }

            })
            .catch((error) => {
                this.setState({loading:false})
                Alert.alert(
                    'Error Occured !',
                    'Please try again later...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <HeaderPrimary title='Create Donation Camp' onPress={ ()=> this.backButtonOnPress()}/>
            <ScrollView>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_FULLNAME}/>
            <TextInput style={styles.inputs}
                placeholder="Organizer Name"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(organizer_name) => this.setState({organizer_name})}/>
            </View> 
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL}/>
            <TextInput style={styles.inputs}
                placeholder="Organizer Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(organizer_email) => this.setState({organizer_email})}/>
            </View>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_MOBILE_NO}/>
            <TextInput style={styles.inputs}
                placeholder="Organizer Contact Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(organizer_mobile_number) => this.setState({organizer_mobile_number})}/>
            </View>
            <View style={{height:20}}></View>
            <View style={{height:2,width:Metrics.DEVICE_WIDTH/1.2,marginLeft:Metrics.DEVICE_WIDTH/12,backgroundColor:AppStyles.colorBlack}}></View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Event Title"
                placeholderTextColor={AppStyles.colorBlack}
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(event_title) => this.setState({event_title})}/>
            </View> 
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Event Location"
                placeholderTextColor={AppStyles.colorBlack}
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(event_location) => this.setState({event_location})}/>
            </View> 
            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showDatePicker()}>
            <View style={styles.inputContainer}>
            <Text style={styles.dateAndtime}>{this.state.event_date}</Text>
            </View> 
            </TouchableOpacity>
            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showTimePicker()}>
            <View style={styles.inputContainer}>
            <Text style={styles.dateAndtime}>{this.state.event_time}</Text>
            </View> 
            </TouchableOpacity>

        
            <View style={{height:40}}></View>

            <CustomButtonPrimary 
                title='CREATE DONATION CAMP'
                onPress = { ()=> this.submitFormValidation()}
            />

            <View style={{height:10}}></View>
            </ScrollView>

            <Spinner
            visible={this.state.loading}
            cancelable={false}
            />

            <DateTimePicker
                mode='date'
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDatePicker}
            />  
            <DateTimePicker
                mode='time'
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this.handleTimePicked}
                onCancel={this.hideTimePicker}
            />
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        borderRadius:20,
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/12,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:20,
        marginLeft:Metrics.DEVICE_WIDTH/13,
        backgroundColor:'#E9E9E9'
    },
    inputs:{
        height:40,
        marginLeft:16,
        flex:1,
        fontFamily:AppStyles.primaryFont,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    genderView:{
        marginLeft:Metrics.DEVICE_WIDTH/9,
        marginTop:10,
        alignSelf:'auto'
    },
    dateAndtime:{
        fontFamily:AppStyles.primaryFont,
        marginLeft:18
    },
    item: {
        borderWidth: 1,
        borderColor: '#f54242',    
        backgroundColor: '#FFF',
      },
    label: {
        color: '#333',
        fontSize:16
    },
    itemSelected: {
        backgroundColor: AppStyles.primaryColorLight,
    },
    labelSelected: {
        color: '#FFF',
    },
    nationDataContainer:{
        flexDirection:'row',
        padding:10,
    },
    textareaContainer: {
        height: Metrics.DEVICE_HEIGHT/4.5,
        width:Metrics.DEVICE_WIDTH/1.2,
        marginLeft:Metrics.DEVICE_WIDTH/12,
        marginTop:20,
        padding: 5,
        backgroundColor:'#E9E9E9',
        borderRadius:20
      },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFont
    },
});