import React from 'react';
import { View, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnswer } from '../store/slices/quizSlice';
import {Questions} from '../mockData/Questions';
import QuizHeader from '../ui/QuizHeader';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';


const QuizHome = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, traitCount, house } = useSelector(state => state.quiz);
  const question = Questions[currentQuestionIndex];
  const navigation = useNavigation();

  const fetchGroupForTrait = async (trait) => {
    let myTrait = trait;
    try {
      const response = await axios.get('https://wizard-world-api.herokuapp.com/Houses');
      const myHouse = response.data.filter(house =>
        house.traits.some(trait => trait.name === myTrait[0])
      );
      console.log(myHouse[0].name);
      const houseN = {
        house : myHouse[0].name,
      };
      await RNSecureStorage.setItem('userHouse', JSON.stringify(houseN), {accessible: ACCESSIBLE.ALWAYS});
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

  const renderItem = ({ item } : any) => (
    <View style={styles.button}>
    <Button title={item.answer} onPress={() => handleAnswerSelect(item.trait)} />
    </View>
  );

  return (
      <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/quizBg.png')} style={styles.image} />
      <QuizHeader question={question.question}/>
      <FlatList
        data={question.answers}
        renderItem={renderItem}
        keyExtractor={(item) => item.answer}
        style ={styles.wrapper}
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
  },
  wrapper : {
    padding: 20,
  },
  button : {
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
