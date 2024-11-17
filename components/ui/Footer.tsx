import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import ShareButton from './styled/ShareButton';
import StyledButton from './styled/StyledButton';

const Footer = ({img}) => {

    return (
        <View>
            <ShareButton src = {img}/>
            <StyledButton title = {'proceed'} path = {'Potions'} />
        </View>
    );
};
export default Footer;
