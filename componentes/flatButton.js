import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton( {text, textSize, textForm, textColor, bgColor, isDisabled, onPress, width} ){
    return(
        <TouchableOpacity style={[styles.container, {width: width}]} disabled={isDisabled} onPress={onPress} activeOpacity={0.55}>
            <View style={[styles.button, {backgroundColor: isDisabled ? 'lightgray' : bgColor, borderColor: textColor}]}>
                <Text style={[styles.buttonText, {fontSize: textSize, textTransform: textForm, color: textColor}]}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        borderRadius: 8,
        margin: 8,
    },
    button:{
        flex: 1,
        borderRadius: 8,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})