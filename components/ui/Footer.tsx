import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ShareButton from './styled/ShareButton';
import StyledButton from './styled/StyledButton';

interface FooterProps {
    img : 'string',
}
const Footer = ({img} : FooterProps) => {

    return (
        <View style ={styles.container}>
            <View style={styles.buttonWrapper}>

            <ShareButton  src = {img}/>
            </View>
            <View style={styles.buttonWrapper}>

            <StyledButton title = {'proceed'} path = {'Potions'} />
            </View>
        </View>
    );
};
export default Footer;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        minHeight: 100,
    },
    buttonWrapper : {
        width: 120,
        margin: 'auto',
        marginBottom: 10,
    },
  });
