/** 
 * FindMyBlood 
 * Header bar -> Primary Header bar component with back button support
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
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';

export default class HeaderPrimary extends Component {
    render() {
        return (
            <View style={styles.headerView}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.props.onPress}>
            <Image source={Assets.IC_BACKBTN_RED} style={styles.backButton}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
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
        color:AppStyles.colorBlack,
        marginTop:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/27 : Metrics.DEVICE_HEIGHT/20,
        marginLeft:8
    }
});

HeaderPrimary.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
}