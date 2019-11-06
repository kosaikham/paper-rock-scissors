import React from 'react';
import { Text, View } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";

export default function CountDown(props){
    const {countDown, borderColor} = props;
    return (
        <View style={{
            width: wp("40%"),
            height: wp("40%"),
            borderRadius: wp("40%")/2,
            borderWidth: 10,
            borderColor: borderColor,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.6)'
            }}>{countDown}</Text>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.6)'
            }}>{countDown > 1 ? 'Times' : 'Time'}</Text>
        </View>
    )
}