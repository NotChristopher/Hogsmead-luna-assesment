import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet, Button, Alert} from 'react-native';
import StyledInputField from '../ui/styled/StyledInputField';
import StyledButton from '../ui/styled/StyledButton';
import ReactNativeBiometrics from 'react-native-biometrics';


const HomeScreen = ({navigation}) =>{
    const [biometricStatus, setBiometricStatus] = React.useState('');
    const biometrics = new ReactNativeBiometrics();
    const checkBiometrics = async () => {
        try {
          const { available, biometryType } = await biometrics.isSensorAvailable();
          if (available) {
            setBiometricStatus(`Biometric sensor available! (${biometryType})`);
          } else {
            setBiometricStatus('No biometric sensor available on this device');
          }
        } catch (error) {
          console.log('Error checking biometrics', error);
          setBiometricStatus('Error checking biometrics');
        }
      };
    
      // Authenticate with biometrics
      const authenticateWithBiometrics = async () => {
        try {
          const { success, error } = await biometrics.simplePrompt({
            promptMessage: 'Authenticate with Biometrics', // Prompt message shown to user
          });
    
          if (success) {
            Alert.alert('Authentication Successful', 'You have been authenticated!');
          } else if (error) {
            Alert.alert('Authentication Failed', 'Please try again');
          }
        } catch (error) {
          Alert.alert('Biometric Authentication Error', error.message);
        }
      };
    return(
        <View style={styles.container}>
            <ImageBackground source = {require('../../assets/images/homebg.png')} resizeMode="cover" style = {styles.image} />
            <View style ={styles.textWrapepr}>
            <Text style={styles.text}>
            Welcome to Hogsmead.
            </Text>
            <Text style={styles.text}>
            Your pocket sized wizardly companion
            </Text>
            <Text style={styles.text}>
            Before we move forward we need to get you sorted to an appropriate house
            </Text>
            </View>
            <View style={styles.inputWrapper}>
            <StyledInputField label={'Name'}/>
            </View>
            <View style={styles.buttonWrapper}>
            <StyledButton title={'Step Through The Veil'} path ={'QuizHome'} onPress={authenticateWithBiometrics} />
            <Text style={styles.text}>{biometricStatus}</Text>
            <Button title="Check Biometrics Availability" onPress={checkBiometrics} />
            <Button title="Authenticate with Biometrics" onPress={authenticateWithBiometrics} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
     textWrapepr : {
        padding: 10,
     }
    ,
    inputWrapper : {
        padding: 10,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20%',
     },
     buttonWrapper : {
        padding: 10,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20%',
     },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
      color: 'white',
      fontSize: 20,
      lineHeight: 35,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  });
export default HomeScreen;