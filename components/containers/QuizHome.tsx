import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import StyledInputField from '../ui/styled/StyledInputField';
import StyledButton from '../ui/styled/StyledButton';
import QuizHeader from '../ui/QuizHeader';
import QuizCards from '../ui/QuizCards';

const QuizHome = () =>{

    return(
        <View style={styles.container}>
           <QuizHeader question = {"Question Text"} />
           <View>
           <QuizCards answer={'Example Text'} />
           </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  });
export default QuizHome;