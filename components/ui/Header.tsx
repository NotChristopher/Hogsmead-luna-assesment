import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({house}) => {
   
    return(
        <View style={styles.container}>
            <Text style={styles.text}>You are house {house}!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        minHeight: 100,
    },
    text:{
        textAlign: 'center',
        fontSize: 24,
        margin: 'auto',
    }
  });
export default Header;
