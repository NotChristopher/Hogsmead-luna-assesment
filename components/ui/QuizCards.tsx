import * as React from 'react';
import {View, Text} from 'react-native';

interface Props {
    answer : any,
}

const QuizCards = ({answer} : Props) => {

    return(
        <View>
            <Text>
                {answer.answer}
            </Text>
        </View>
    );
};
export default QuizCards;
