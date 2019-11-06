import React from 'react';
import { Text, View, Animated, Platform, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";
  import Constants from 'expo-constants';

import {weapons,ROCK, PAPER, SCISSORS, compare} from './../../utils';
import {bgColor,fontColor, border, hand} from './../../utils/constant';

import Modal from './../../components/Modal'
import CountDown from '../../components/CountDown';
import Hand from '../../components/Hand';

export default function Player(props) {
    let [c1, setC1] = React.useState(null);
    let [c2, setC2] = React.useState(null);
    let [result,setResult] = React.useState(null);
    let [open,setOpen] = React.useState(null);
    let [modal,setModal] = React.useState(new Animated.Value(0));
    let [countDown, setCountDown] = React.useState(5);

    React.useEffect(() => {
        runInit();
        setModal(new Animated.Value(hp("100%")));
    }, [])

    React.useEffect(() => {
        if (open) {
          Animated.timing(modal, {
            toValue: hp("0%"),
            duration: 200
          }).start();
        } else if(open === false){
          Animated.timing(modal, {
            toValue: hp("100%"),
            duration: 200
          }).start();
          runInit();
        }else{
            Animated.timing(modal, {
                toValue: hp("100%"),
                duration: 200
              }).start();
        }
    }, [open])

    const runCountDown = () => {
        let downloadTimer = setInterval(function(){
            countDown--;
            setCountDown(countDown);
            if(countDown <= 0)
                clearInterval(downloadTimer);
            },1000);
    }

    const openModal = () => {
        setOpen(true);
    };

    const runInit = () => {
        runCountDown();
        setTimeout(() => {
            const c1Choice = weapons[Math.floor(Math.random() * weapons.length)];
            const c2Choice = weapons[Math.floor(Math.random() * weapons.length)];
            setC1(c1Choice);
            setC2(c2Choice);
            const result = compare(c1Choice, c2Choice)
            setResult(result)
            openModal();
        }, 5000)
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
        setC1(null)
        setC2(null)
        setTimeout(() => setResult(null), 200)
        setCountDown(5)
    }

    return (
        <View style={styles.container}>
            {/* Computer two */}
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-around'
                }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>COMPUTER 2</Text>
                    </View>

                    {/* Hand Container */}
                    <View style={styles.handContainer}>
                        <Hand
                            name="hand-paper-o"
                            choice={c2}
                            type={PAPER}
                            rotate='180deg'
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-rock-o"
                            choice={c2}
                            type={ROCK}
                            rotate='180deg'
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-scissors-o"
                            choice={c2}
                            type={SCISSORS}
                            rotate='270deg'
                            color={hand}
                            disabled
                        />
                    </View>
                </View>
            </View>

            {/* countdown */}
            <View style={styles.countDown}>
                <CountDown countDown={countDown} borderColor={border}/>
            </View>

            {/* Computer one */}
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
                            choice={c1}
                            type={PAPER}
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-rock-o"
                            choice={c1}
                            type={ROCK}
                            color={hand}
                            disabled
                        />
                        <Hand
                            name="hand-scissors-o"
                            choice={c1}
                            type={SCISSORS}
                            color={hand}
                            disabled
                        />
                    </View>

                    {/* Text */}
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>COMPUTER 1</Text>
                    </View>
                </View>

            </View>

            {/* modal */}
            <Modal
              top={modal}
              opacity={animatedModalOpacity}
              onClickBtn={onClickBtn}
              onClickPlay={onClickPlay}
              page="Computer"
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

