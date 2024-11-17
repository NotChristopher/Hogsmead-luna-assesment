import * as React from 'react';
import {TextInput} from 'react-native-paper';


interface InputProps{
    label : string,
    setState : any,
    state: any,
  }

const StyledInputField = ({label, setState, state} : InputProps) => {

    return (
      <TextInput
        placeholder={label}
        mode = "outlined"
        value={state}
        onChangeText={textN => setState(textN)}

      />
    );
  };
export default StyledInputField;
