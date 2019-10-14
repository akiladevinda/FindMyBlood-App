/** 
 * FindMyBlood 
 * Add New Doner Screen
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
import TagSelect from '../../components/TagSelect/TagSelect';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';

export default class AddNewDoner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            email:'',
            nic:'',
            mobile_number:'',
            address:'',
            dob:'Date of Birth',
            blood_group:'',
            gender:'',
            loading:false,
            isDatePickerVisible: false,
            gender_data:[  
                {label: 'Male', id: 1 },
                {label: 'Female', id: 2 }
            ],
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

    //Date Picker handling methods
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        const mdate = date.toString().split(" ");
        this.setState({
            dob : mdate[1] + " " + mdate[2] + ", " + mdate[3]
        });
        this.hideDatePicker();
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    //Submit form validation
    submitFormValidation = () => {

        // alert(this.state.gender.itemsSelected[0].label.length)

        if(this.state.full_name.length<=0 || this.state.email.length<=0 ||
            this.state.nic.length<=0 || this.state.mobile_number.length<=0||
            this.state.address.length<=0 || this.state.blood_group.itemsSelected[0].label.length<=0 ||
            this.state.gender.itemsSelected[0].label.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_AddNewDoner();
            }

    }

    //Add New Doner API Fetch Method
    API_AddNewDoner = () => {
        this.setState({loading:true})

        let Gender = this.state.gender.itemsSelected[0].label //Get Gender
        let BloodGroup = this.state.blood_group.itemsSelected[0].label  //Get Blood Group

        fetch(API.API_ADD_DONER,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Full_Name":this.state.full_name,
                "Email":this.state.email,
                "Mobile_Number":this.state.mobile_number,
                "NIC_Number": this.state.nic,
                "Address":this.state.address,
                "DOB":this.state.dob,
                "Blood_Group":BloodGroup,
                "Gender":Gender
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.status_code == '200'){
                    Alert.alert(
                        'Doner Added',
                        'You have successfully added new doner...',
                        [
                        {text: 'OK',onPress: () => this.navigateToHome()},
                        ],
                        {cancelable: false},
                    );
                }else if(responseText.status_code == '401'){
                    Alert.alert(
                        'Doner Already Exists',
                        'Please try to add new doner ...',
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
            <HeaderPrimary title='Add New Doner' onPress={ ()=> this.backButtonOnPress()}/>
            <ScrollView>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_FULLNAME}/>
            <TextInput style={styles.inputs}
                placeholder="Doner Name"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(full_name) => this.setState({full_name})}/>
            </View> 
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_MOBILE_NO}/>
            <TextInput style={styles.inputs}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(mobile_number) => this.setState({mobile_number})}/>
            </View>
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_NIC}/>
            <TextInput style={styles.inputs}
                placeholder="NIC Number"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(nic) => this.setState({nic})}/>
            </View> 
            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showDatePicker()}>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_DATE}/>
            <Text style={styles.dateAndtime}>{this.state.dob}</Text>
            </View> 
            </TouchableOpacity>
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

            <View style={styles.genderView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Gender</Text>
            <TagSelect
                data={this.state.gender_data}
                ref={(tag) => {
                    this.state.gender = tag;
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

            <View style={styles.genderView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Blood Type</Text>
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
                title='ADD DONER'
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
});