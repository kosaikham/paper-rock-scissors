import React from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import {playbg, playfont, changebg, changefont} from './../../utils/constant';

export default function Modal(props){
    const {
        top,
        opacity,
        onClickBtn,
        onClickPlay,
        page,
        result
      } = props;
      let user = page === 'Computer' ? 'COMPUTER 1 ' : 'YOU ';
      if(result === 1){
        user += page === 'Computer' ? 'WINS!' : 'WIN!'
      }else if(result === 2){
        user += page === 'Computer' ? 'LOSES!' : 'LOSE!'
      }else{
          user = 'TIE!'
      }
    return (
      <Animated.View
        style={[styles.container, {
            top: top, // props
            opacity: opacity, // props,
        }]}
      >

          {/* White box */}
          <View style={styles.whitebox}>

              {/* Info Text Container */}
              <View style={styles.textContainer}>

                  {/* Text Style */}
                  <Text style={[styles.textStyle, {
                      color: result === 1 ? 'green' : 'black'
                  }]}>{user}</Text>
              </View>

              {/* Buttons Section */}
              <View style={{
                  flex: 1,
              }}>

                  {/* Buttons Container */}
                  <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button,{
                            backgroundColor: playbg
                        }]} onPress={() => onClickPlay()}>
                            <Text style={{
                                color: playfont
                            }}>PLAY AGAIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{
                            backgroundColor: changebg
                        }]} onPress={() => onClickBtn()}>
                            <Text style={{
                                color: changefont
                            }}>CHANGE MODE</Text>
                        </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: hp("100%"),
        backgroundColor: "rgba(0,0,0,0.4)",
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 100,
        justifyContent: "space-around",
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    whitebox: {
        backgroundColor: playfont,
        width: wp("70%"),
        height: wp("50%"),
        borderWidth: 1,
        borderRadius: 12
    },
    textContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        borderRadius: 4,
        padding: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
        elevation: 2
    }
})