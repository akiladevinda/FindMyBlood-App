/** 
 * FindMyBlood 
 * Home Screen OF the Application
 */


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import Assets from '../../config/Assets';
import AppStyles from '../../config/AppStyles';
import AddNewDoner from '../AddDoners/AddNewDoner';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doners_count:'20',
            requests_count:'10',
            menu_items: [
                {id:1, title: "Add New Doners", image:Assets.HOME_ADDDONERS},
                {id:2, title: "Create Donation Camp", image:Assets.HOME_CREATECAMP},
                {id:3, title: "Explore News Feed", image:Assets.HOME_NEWSFEED},
                {id:4, title: "View All Users", image:Assets.HOME_SEARCHUSERS},
                {id:5, title: "My Profile", image:Assets.HOME_PROFILE},
                {id:6, title: "Log Out", image:Assets.HOME_LOGOUT},
            ]
        }
    }

    //Menu button click event 
    clickEventListener = (value) => {

        if(value.id == 1){
            this.props.navigation.navigate("AddNewDoner",{screen:AddNewDoner})
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

                <Image source={Assets.APP_LOGO} style={styles.appLogo}/>
                
                <View style={styles.headerInfo}>
                <Text style={styles.headerInfoText}>{this.state.doners_count} New Doners</Text>
                <View style={styles.headerInfoButtonConrainer}>
                <TouchableOpacity style={styles.headerInfoButton} onPress={ ()=> alert('g')}>
                <Text style={styles.headerInforButtonText}>VIEW ALL</Text>
                </TouchableOpacity>
                </View>
                </View>
                
                <View style={styles.headerInfo}>
                <Text style={styles.headerInfoText}>{this.state.requests_count} Requests</Text>
                <View style={styles.headerInfoButtonConrainer}>
                <TouchableOpacity style={styles.headerInfoButton} onPress={ ()=> alert('g')}>
                <Text style={styles.headerInforButtonText}>VIEW ALL</Text>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.emeregencyReqContainer}>
                <TouchableOpacity style={styles.emergencyReqButton} onPress={ ()=> alert('f')}>
                <Text style={styles.emeergenctBtnText}>+ ADD EMERGENCY REQUEST</Text>
                </TouchableOpacity>
                </View>

                </LinearGradient>

                <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.state.menu_items}
                horizontal={false}
                numColumns={2}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                        <View style={styles.cardFooter}></View>
                        <Image style={styles.cardImage} source={item.image}/>
                        <View style={styles.cardHeader}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                    )
                }}/>


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
        height:Metrics.DEVICE_HEIGHT/1.8
    },
    appLogo:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginLeft:Metrics.DEVICE_WIDTH/2.2,
        marginTop:Platform.OS === 'android' ? 15 : 35,
    },
    headerInfo:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.3)',
        width:Metrics.DEVICE_WIDTH/1.1,
        height:Metrics.DEVICE_HEIGHT/7,
        marginLeft:Metrics.DEVICE_WIDTH/25,
        marginTop:10,
        borderRadius:10,
    },
    headerInfoText:{
        textAlign:'center',
        fontFamily:AppStyles.primaryFontLight,
        fontSize:22,
        color:AppStyles.colorWhite,
        width:Metrics.DEVICE_WIDTH/3.5,
        marginTop:30,
        marginLeft:10
    },
    headerInfoButtonConrainer:{
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/2.7,
        height:Metrics.DEVICE_HEIGHT/15,
        borderRadius:30,
        marginLeft:Metrics.DEVICE_WIDTH/5,
        backgroundColor:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/25
    },
    headerInfoButton:{
        height:Metrics.DEVICE_HEIGHT/6,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    headerInforButtonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFontBold,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
    emeregencyReqContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/15,
        borderRadius:15,
        marginLeft:Metrics.DEVICE_WIDTH/12,
        backgroundColor:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/25
    },
    emergencyReqButton:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    emeergenctBtnText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFontBold,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
    list: {
        paddingHorizontal: 5,
        marginTop:10,
    },
    listContainer:{
        alignItems:'center'
    },
    card:{
        marginVertical: 10,
        backgroundColor:'rgba(0,0,0,0.1)',
        flexBasis: '40%',
        marginHorizontal: 10,
        borderRadius:30,
    },
    cardHeader: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        height: 70,
        width: 70,
        alignSelf:'center',
        resizeMode:'contain'
    },
    title:{
        fontSize:15,
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        color:AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFont
    },
});