import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});