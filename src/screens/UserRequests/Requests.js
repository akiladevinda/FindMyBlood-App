/** 
 * FindMyBlood 
 * View All Requests Screen
 */


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    BackHandler,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../config/API';
import CustomButtonBorder from '../../components/CustomButton/CustomButtonBorder';
import Assets from '../../config/Assets';
import RequestsMore from './RequestsMore';

export default class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            users_data:[],
        }
    }

    clickEventListener = (item) => {
        this.props.navigation.navigate("RequestsMore",{screen:RequestsMore,Requests:item})
    }

    componentWillMount(){
        this.API_Get_MissingPersons();
    }
    
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //Back Button Press Event
    backButtonOnPress = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack(null);
        return true;
    }

    //Get Call for user
    getPhoneCall = (value) => {
        Linking.openURL(`tel:${value.Mobile_Number}`)
    }

    //Get All Missing Persons Details API function
    API_Get_MissingPersons = () => {
        this.setState({loading:true})

        fetch(API.API_GET_REQUESTS,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.data[0].status_code == '200'){
                    this.setState({users_data:responseText.data})
                }else{

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
            <HeaderPrimary 
            title='All Requests'
            onPress={ () => this.backButtonOnPress()}
            />

            <ScrollView>
            <FlatList 
                style={styles.tasks}
                columnWrapperStyle={styles.listContainer}
                data={this.state.users_data}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {borderColor:AppStyles.primaryColorLight}]} onPress={() => {this.clickEventListener(item)}}>
                    <View style={styles.cardContent}>
                        <Text style={[styles.description]}>{item.Full_Name}</Text>
                        <Text style={styles.date}>Blood Group Wanted : {item.Blood_Group}</Text>
                            <View style={styles.bottonCotainer}>
                            <TouchableOpacity style={styles.buttonContainer} onPress= { ()=> this.getPhoneCall(item)}>
                            <Text style={styles.buttonText}>Get Call</Text>
                            </TouchableOpacity>
                            </View>
                    </View>
                    </TouchableOpacity>
                )}}/>
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
    tasks:{
        flex:1,
      },
      cardContent: {
        marginLeft:20,
        marginTop:10,
      },
    
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    
        marginVertical: 20,
        marginHorizontal:15,
        backgroundColor:"white",
        flexBasis: '46%',
        padding: 10,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderLeftWidth:10,
        height:Metrics.DEVICE_HEIGHT/5,
        borderRadius:25
      },
    
      description:{
        fontSize:18,
        flex:1,
        color:AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFontBold
      },
      date:{
        fontSize:14,
        flex:1,
        color:"#696969",
        marginTop:5,
        fontFamily:AppStyles.primaryFont
      },
      bottonCotainer: {
        flexDirection: 'row',
        // justifyContent:'center',
    },
    buttonContainer:{
        height:50,
        width:Metrics.DEVICE_WIDTH/3,
        backgroundColor:'transparent',
        padding:20,
        shadowOpacity:30,
        borderRadius:20,
        borderColor:AppStyles.primaryColor,
        borderWidth:2,
        marginTop:15,
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFont,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
});