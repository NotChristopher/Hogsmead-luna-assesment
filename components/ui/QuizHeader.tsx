import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
    question : string,
}
const QuizHeader = ({question} : Props ) => {

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {question}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(100, 130, 173, 1)',
        height: 200,
        minWidth: '100%',
        padding: 10,
    },
    text : {
        color: '#ffff',
        fontSize: 18,
        textAlign: 'center',
        marginTop:20,
    },
  });

export default QuizHeader;
