import React from 'react';
import { View, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer } from '../store/slices/quizSlice';
import { Questions } from '../mockData/Questions';
import QuizHeader from '../ui/QuizHeader';
import axios from 'axios';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface IRootState {
  quiz: {
    currentQuestionIndex: number;
    traitCount: Record<string, number>;
  };
}

interface Answer {
  answer: string;
  trait: any;
}

interface QuestionType {
  question: any;
  answers: Answer[];
}

const QuizHome: React.FC = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, traitCount } = useSelector((state: IRootState) => state.quiz);
  const question: QuestionType = Questions[currentQuestionIndex];
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const fetchGroupForTrait = async (trait: string[]) => {
    try {
      const response = await axios.get('https://wizard-world-api.herokuapp.com/Houses');
      const myHouse = response.data.filter((house: any) =>
        house.traits.some((traitObj: any) => traitObj.name === trait[0])
      );
      dispatch(selectAnswer({ house: myHouse[0]?.name }));
      navigation.navigate('HouseLanding');
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  // Handle the result display
  const handleShowResults = (trait: string[]) => {
    fetchGroupForTrait(trait);
    dispatch(selectAnswer({ majorityTrait: trait[0] }));
  };

  // Handle when an answer is selected
  const handleAnswerSelect = (trait: string[]) => {
    dispatch(selectAnswer({ trait }));
  };

  // Does Trait Count for Majority
  const getMajorityTrait = () => {
    const maxTrait = Object.entries(traitCount).reduce((a, b) => (a[1] > b[1] ? a : b));
    handleShowResults([maxTrait[0]]);
    return maxTrait[0];
  };

  const renderItem = ({ item }: { item: Answer }) => (
    <View style={styles.button}>
      <Button title={item.answer} onPress={() => handleAnswerSelect(item.trait)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/quizBg.png')} style={styles.image} />
      {currentQuestionIndex === Questions.length - 1 ? (
        <Button title="See Results" onPress={getMajorityTrait} />
      ) : (
        <>
          <QuizHeader question={question.question} />
          <FlatList
            data={question.answers}
            renderItem={renderItem}
            keyExtractor={(item) => item.answer}
            style={styles.wrapper}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 20,
  },
  button: {
    marginTop: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default QuizHome;
