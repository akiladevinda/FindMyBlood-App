/** 
 * FindMyBlood 
 * Header bar with back button and share icons
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';

export default class HeaderWShare extends Component {
    render() {
        return (
            <View style={styles.headerView}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.props.onPress}>
            <Image source={Assets.IC_BACKBTN_WHITE} style={styles.backButton}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
            <TouchableOpacity onPress={this.props.shareOnPress}>
            <Image source={Assets.IC_HEADER_SHARE} style={styles.headerShare}/>
            </TouchableOpacity>
            </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    headerView:{
        width:Metrics.DEVICE_WIDTH,
        height:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/10 : Metrics.DEVICE_HEIGHT/6,
        backgroundColor:'transparent'
    },
    backButton:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginTop:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/40 : Metrics.DEVICE_HEIGHT/25,
    },
    headerTitle:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:20,
        color:AppStyles.colorWhite,
        marginTop:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/30 : Metrics.DEVICE_HEIGHT/20,
        marginLeft:8
    },
    headerShare:{
        width:30,
        height:30,
        resizeMode:'contain',
        marginTop:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/35 : Metrics.DEVICE_HEIGHT/25,
        marginLeft:Metrics.DEVICE_WIDTH/2
        
    }
});

HeaderWShare.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
    shareOnPress:PropTypes.func,
}