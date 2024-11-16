import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const QuizHeader = ({question}) => {

    return(
        <View>
            <Text>
                {question}
            </Text>
        </View>
    )
};
export default QuizHeader;