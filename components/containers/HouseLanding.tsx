import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import {getImageByString} from '../utils/imageUtils';

const HouseLanding = ({}) => {
    const {house} = useSelector(state => state.quiz);
    let newHouse = house.replace(/\s+/g, ' ');
    const src = newHouse.toLowerCase();
    console.log(src);
    return(
        <View>
            <Header house={house ? house : 'Gryffindor' } />
            <Image source={getImageByString(src)} style={[styles.image ,{resizeMode: 'contain'}]} />
            <Footer />
        </View>
    )
};
const styles = StyleSheet.create({
    image: {
        width: '100vw',
        height: 400,

    }
  });

export default HouseLanding;
