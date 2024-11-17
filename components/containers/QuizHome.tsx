import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer } from '../store/slices/quizSlice';
import {setHouseSlice} from '../store/slices/houseSlice';
import {Questions} from '../mockData/Questions';
import QuizHeader from '../ui/QuizHeader';
import axios from 'axios';
import QuizCards from '../ui/QuizCards';
import { useNavigation } from '@react-navigation/native';


const QuizHome = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, traitCount,house } = useSelector(state => state.quiz);
  const question = Questions[currentQuestionIndex];
  const navigation = useNavigation();

  const fetchGroupForTrait = async (trait) => {
    let myTrait = trait;
    try {
      const response = await axios.get(`https://wizard-world-api.herokuapp.com/Houses`);
      const myHouse = response.data.filter(house =>
        house.traits.some(trait => trait.name === myTrait[0])
      );
      console.log(myHouse[0].name);
      dispatch(selectAnswer({house : myHouse[0].name}));
      navigation.navigate('HouseLanding');
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  const handleShowResults = (trait) => {
    fetchGroupForTrait(trait);
    dispatch(selectAnswer({majorityTrait : trait[0]}));
  };

  const handleAnswerSelect = (trait) => {
    dispatch(selectAnswer({ trait }));
  };

  const getMajorityTrait = () => {
    const maxTrait = Object.entries(traitCount).reduce((a, b) => a[1] > b[1] ? a : b);
    handleShowResults(maxTrait);
    return maxTrait[0];
  };

  const renderItem = ({ item }) => (
    <Button title={item.answer} onPress={() => handleAnswerSelect(item.trait)} />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/quizBg.png')} style={styles.image} />
      <QuizHeader question={question.question}/>
      <FlatList
        data={question.answers}
        renderItem={renderItem}
        keyExtractor={(item) => item.answer}
      />
      {currentQuestionIndex === Questions.length - 1 && (
        <Button title="See Results" onPress={() => getMajorityTrait()}/>
      )}
      <Text>{house}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
