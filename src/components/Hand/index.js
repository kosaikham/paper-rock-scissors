import React from 'react';
import {TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Hand(props){
    const {rotate = '0deg', name, type, choice, disabled, onPress, color } = props;
    return (
        <TouchableOpacity
            style={{
                transform: [{ rotate: rotate}]
            }}
            onPress={onPress}
            disabled={disabled} >
                <FontAwesome name={name} size={choice === type ? 62 : 52 } color={choice === type ? color : "grey"}  />
        </TouchableOpacity>
    )
}