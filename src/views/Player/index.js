import React from 'react';
import { Text, View, Animated, Platform, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
import Constants from 'expo-constants';

import {weapons,ROCK, PAPER, SCISSORS, compare} from './../../utils';
import {bgColor,fontColor, border, hand} from './../../utils/constant';

import Modal from './../../components/Modal'
import CountDown from '../../components/CountDown';
import Hand from '../../components/Hand';

export default function Player(props) {
    let [choice, setChoice] = React.useState(null);
    let [computerChoice, setComputerChoice] = React.useState(null);
    let [result,setResult] = React.useState(null);
    let [countDown, setCountDown] = React.useState(5);
    let [open,setOpen] = React.useState(false);
    let [modal,setModal] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        setModal(new Animated.Value(hp("100%")));
    }, [])

    React.useEffect(() => {
        if (open) {
          Animated.timing(modal, {
            toValue: hp("0%"),
            duration: 200
          }).start();
        }else{
            Animated.timing(modal, {
                toValue: hp("100%"),
                duration: 200
              }).start();
        }
    }, [open])

    const onChoose = weapon => {
        setChoice(weapon);
        runCountDown();
        setTimeout(() => {
            const computer = weapons[Math.floor(Math.random() * weapons.length)];
            setComputerChoice(computer);
            const result = compare(weapon, computer);
            setResult(result);
            openModal();
        }, 5000)
    }

    const openModal = () => {
        setOpen(true);
    };

    const runCountDown = () => {
        let downloadTimer = setInterval(function(){
            countDown--;
            setCountDown(countDown);
            if(countDown <= 0)
                clearInterval(downloadTimer);
            },1000);
    }

    const animatedModalOpacity = modal.interpolate({
        inputRange: [hp("0%"), hp("100%")],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const onClickBtn = (mode = 'Home') => {
        props.navigation.navigate(mode);
    }

    const onClickPlay = () => {
        setOpen(false)
        setChoice(null)
        setComputerChoice(null)
        setTimeout(() => setResult(null), 200)
        setCountDown(5)
    }

    return (
        <View style={styles.container}>

            {/* Computer */}
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-around'
                }}>
                    {/* Text Container */}
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>COMPUTER</Text>
                    </View>

                    {/* Hand Container */}
                    <View style={styles.handContainer}>
                        <Hand
                            name="hand-paper-o"
                            choice={computerChoice}
                            type={PAPER}
                            rotate='180deg'
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-rock-o"
                            choice={computerChoice}
                            type={ROCK}
                            rotate='180deg'
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-scissors-o"
                            choice={computerChoice}
                            type={SCISSORS}
                            rotate='270deg'
                            color={hand}
                            disabled
                        />
                    </View>
                </View>
            </View>

            {/* count down */}
            <View style={styles.countDown}>
                <CountDown countDown={countDown} borderColor={border} />
            </View>

            {/* Player */}
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-around'
                }}>

                    {/* Hand Container */}
                    <View style={styles.handContainer}>
                        <Hand
                            name="hand-paper-o"
                            choice={choice}
                            type={PAPER}
                            color={hand}
                            onPress={() => onChoose(PAPER)}
                            disabled={typeof choice === 'string'}
                        />
                        <Hand
                            name="hand-rock-o"
                            choice={choice}
                            type={ROCK}
                            color={hand}
                            onPress={() => onChoose(ROCK)}
                            disabled={typeof choice === 'string'}
                        />
                        <Hand
                            name="hand-scissors-o"
                            choice={choice}
                            type={SCISSORS}
                            color={hand}
                            onPress={() => onChoose(SCISSORS)}
                            disabled={typeof choice === 'string'}
                        />
                    </View>

                    {/* Text Container */}
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>CHOOSE ONE MOVE</Text>
                    </View>
                </View>
            </View>

            {/* modal */}
            <Modal
              top={modal}
              opacity={animatedModalOpacity}
              onClickBtn={onClickBtn}
              onClickPlay={onClickPlay}
              result={result}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        backgroundColor: bgColor
    },
    countDown: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    handContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: fontColor
    }
})

