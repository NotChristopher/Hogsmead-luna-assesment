import * as React from 'react';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
interface ButtonProps {
    title : string,
    path : string,
}

const StyledButton = ({title, path}: ButtonProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <Button mode="contained" onPress={() => navigation.navigate(path)}>
        {title}
        </Button>
    );
};

export default StyledButton;
