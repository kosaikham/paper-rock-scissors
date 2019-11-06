import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function BigButton(props){
    const {onPress, text, bgColor} = props;
    return (
        <TouchableOpacity style={[styles.button,{
            backgroundColor: bgColor
        }]} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 15,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 2, height: 4 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
        elevation: 4
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})

