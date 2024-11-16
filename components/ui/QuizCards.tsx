import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const QuizCards = ({answer}) => {

    return(
        <View>
            <Text>
                {answer}
            </Text>
        </View>
    )
};
export default QuizCards;