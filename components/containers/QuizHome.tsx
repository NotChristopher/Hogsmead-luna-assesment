import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer } from '../store/slices/quizSlice';
import {Questions} from '../mockData/Questions';
import QuizHeader from '../ui/QuizHeader';
import axios from 'axios';
import QuizCards from '../ui/QuizCards';



const QuizHome = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, traitCount, majorityTrait } = useSelector(state => state.quiz);

  const question = Questions[currentQuestionIndex];
  const houseTraite = majorityTrait;

  const fetchGroupForTrait = async (trait) => {
    let myTrait = trait;
    try {
      const response = await axios.get(`https://wizard-world-api.herokuapp.com/Houses`);
      const housesWithCunning = response.data.filter(house => 
        house.traits.some(trait => trait.name === myTrait[0])
      );
      // console.log(housesWithCunning, myTrait);
      // Handle your group data here (e.g., update the state, show it in UI)
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };
  
  
  // Use the fetch function in your QuizScreen
  const handleShowResults = (trait) => {
    fetchGroupForTrait(trait);
    dispatch(selectAnswer({majorityTrait : trait[0]}));
  };

  const handleAnswerSelect = (trait) => {
    dispatch(selectAnswer({ trait }));
  };

  // Function to get the majority trait at the end of the quiz
  const getMajorityTrait = () => {
    const maxTrait = Object.entries(traitCount).reduce((a, b) => a[1] > b[1] ? a : b);
    handleShowResults(maxTrait);
    return maxTrait[0]; // Majority trait name
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