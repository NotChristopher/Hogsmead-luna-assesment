import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import { useNavigation } from '@react-navigation/native';
interface ButtonProps {
    title : string,
}

const StyledButton = ({title, path}: ButtonProps) => {
    const navigation = useNavigation()
    return (
        <Button mode="contained" onPress={() => navigation.navigate(path)}>
        {title}
        </Button>
    );
};

export default StyledButton;
