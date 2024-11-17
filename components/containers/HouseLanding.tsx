import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {useSelector } from 'react-redux';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import { getImageByString } from '../utils/imageUtils';

interface HouseLandingProps {}
interface RootState {
    quiz: {
      house: string;
    };
  }
const HouseLanding: React.FC<HouseLandingProps> = () => {
  const { house } = useSelector((state: RootState) => state.quiz);
  const newHouse = house?.replace(/\s+/g, ' ') || 'Gryffindor';
  const src = newHouse.toLowerCase();

  return (
    <View>
      <Header house={house || 'Gryffindor'} />
      <Image source={getImageByString(src)} style={[styles.image]} />
      <Footer img={getImageByString(src)} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
});

export default HouseLanding;
