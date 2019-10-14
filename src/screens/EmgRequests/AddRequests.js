/** 
 * FindMyBlood 
 * Add Emergency Request
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
import TagSelect from '../../components/TagSelect/TagSelect';


export default class AddRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            email:'',
            mobile_number:'',
            address:'',
            blood_group:'',
            more_details:'',
            loading:false,
            blood_group_data:[  
                {label: 'A+', id: 1 },
                {label: 'A-', id: 2 },
                {label: 'B+', id: 3 },
                {label: 'B-', id: 4 },
                {label: 'O+', id: 5 },
                {label: 'O-', id: 6 },
                {label: 'AB+', id: 7 },
                {label: 'AB-', id: 8}
            ]

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


    //Submit form validation
    submitFormValidation = () => {

        if(this.state.full_name.length<=0 || this.state.email.length<=0 || 
            this.state.mobile_number.length<=0 || this.state.address.length<=0||
            this.state.blood_group.length<=0 || this.state.more_details.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_AddEmergencyRequest();
            }

    }

    //Add Emergency Request
    API_AddEmergencyRequest = () => {
        this.setState({loading:true})

        let BloodGroup = this.state.blood_group.itemsSelected[0].label  //Get Blood Group

        fetch(API.API_ADD_REQUEST,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Full_Name" : this.state.full_name,
                "Email" : this.state.email,
                "Mobile_Number" : this.state.mobile_number,
                "Address" : this.state.address,
                "Blood_Group" : BloodGroup,
                "More_Details" : this.state.more_details
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.status_code == '200'){
                    Alert.alert(
                        'Request Added',
                        'You have successfully added emergency request...',
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
            <HeaderPrimary title='Add Emergency Request' onPress={ ()=> this.backButtonOnPress()}/>
            <ScrollView>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_FULLNAME}/>
            <TextInput style={styles.inputs}
                placeholder="Your Name"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(full_name) => this.setState({full_name})}/>
            </View> 
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL}/>
            <TextInput style={styles.inputs}
                placeholder="Your Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_MOBILE_NO}/>
            <TextInput style={styles.inputs}
                placeholder="Your Contact Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(mobile_number) => this.setState({mobile_number})}/>
            </View>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_ADDRESS}/>
            <TextInput style={styles.inputs}
                placeholder="Address"
                keyboardType="default"
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                multiline={true}
                onChangeText={(address) => this.setState({address})}/>
            </View> 
            <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={(more_details) => this.setState({more_details})}
                defaultValue={this.state.text}
                maxLength={120}
                placeholder={'More Details'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
            />
            <View style={styles.genderView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Wanted Blood Type</Text>
            <TagSelect
                data={this.state.blood_group_data}
                ref={(tag) => {
                    this.state.blood_group = tag;
                }}
                itemStyle={styles.item}
                itemLabelStyle={styles.label}
                itemStyleSelected={styles.itemSelected}
                itemLabelStyleSelected={styles.labelSelected}
                containerStyle={styles.nationDataContainer}
                max={1}
                onMaxError={() => {}}
                />
            </View>
            

        
            <View style={{height:40}}></View>

            <CustomButtonPrimary 
                title='ADD EMERGENCY REQUEST'
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