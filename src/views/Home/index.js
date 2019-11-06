import React from 'react';
import {Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import BigButton from './../../components/BigButton';
import {bgColor,select, fontColor} from './../../utils/constant';


export default function Home(props) {
    const onPressBtn = mode => {
        props.navigation.navigate(mode);
    };

    return (
        <View style={styles.container}>

            {/* Heading Container */}
            <View style={styles.headContainer}>
                <Text style={styles.headingText}>SELECT MODE</Text>
            </View>

            {/* Buttons Container */}
            <View style={{
                flex: 2,
            }}>
                <BigButton
                onPress={() => onPressBtn('Player')}
                text="PLAYER vs COMPUTER"
                bgColor={select}
                />
                <BigButton
                onPress={() => onPressBtn('Computer')}
                text="COMPUTER vs COMPUTER"
                bgColor={select}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        backgroundColor: bgColor
    },
    headContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        fontSize: 35,
        fontWeight: '300',
        color: fontColor
    }
})
