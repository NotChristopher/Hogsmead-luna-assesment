import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';


interface InputProps{
    label : string,
    setState : any,
    state : any,
}

const StyledInputField = ({label, color} : InputProps) => {

    const [text, setText] = React.useState('');

    return (
      <TextInput
        placeholder={label}
        mode = "outlined"
        value={text}
        onChangeText={text => setText(text)}
        outlineColor ={color}
        activeOutlineColor={color}
      />
    );
  };
  const styles = StyleSheet.create({
    
  });
export default StyledInputField;
