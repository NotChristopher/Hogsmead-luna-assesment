import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, Button, Alert, SafeAreaView } from 'react-native';
import StyledInputField from '../ui/styled/StyledInputField';
import ReactNativeBiometrics from 'react-native-biometrics';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { useDispatch } from 'react-redux';
import { selectAnswer } from '../store/slices/quizSlice';
// import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface UserCredentials {
  username: string;
  password: string;
}

interface AuthData {
  userName: string,
  password: string,
}

const storageOptions = {
  accessible: ACCESSIBLE.WHEN_UNLOCKED,
};

const HomeScreen = () => {
  const biometrics = new ReactNativeBiometrics();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [userName, setUserName] = React.useState<string>('');
  const [authData, setAuthData] = React.useState<AuthData | null>(null);
  // const [loaded, setLoaded] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const checkBiometrics = async () => {
    try {
      const { available } = await biometrics.isSensorAvailable();
      if (available) {
        authenticate();
      } else {
        const credentials: UserCredentials = {
          username: userName,
          password: 'password',
        };
        await RNSecureStorage.setItem('userCredentials', JSON.stringify(credentials), storageOptions);
        navigation.navigate('QuizHome');
      }
    } catch (error) {
      console.log('Error checking biometrics', error);
    }
  };

  const authenticate = async () => {
    try {
      const { success, error } = await biometrics.simplePrompt({
        promptMessage: 'Authenticate with Biometrics',
      });
      if (success) {
        const credentials: UserCredentials = {
          username: userName,
          password: 'password',
        };
        await RNSecureStorage.setItem('userCredentials', JSON.stringify(credentials), storageOptions);
        navigation.navigate('QuizHome');
      } else if (error) {
        Alert.alert('Authentication Failed');
      }
    } catch (error: any) {
      Alert.alert('Biometric Authentication Error', error.message);
    }
  };


  const getCredentials = async () => {
    try {
      const storedCredentials = await RNSecureStorage.getItem('userCredentials');
      const storedHouse = await RNSecureStorage.getItem('userHouse');
      if (storedCredentials && storedHouse) {
        const credentials: UserCredentials = JSON.parse(storedCredentials);
        const myHouse = JSON.parse(storedHouse);
        // setLoaded(true);
        setAuthData(credentials);
        dispatch(selectAnswer({ house: myHouse }));
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.error('Error fetching stored credentials', error);
    }
  };

  const login = () => {
    //  authenticateWithBiometrics();
  };


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/images/homebg.png')} resizeMode="cover" style={styles.image} />
      {authData?.userName ? (
        <>
          <View style={styles.textWrapepr}>
            <Text style={styles.text}>Welcome back</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button title={authData?.userName ? 'Login' : 'Secure Login'} onPress={login} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.textWrapepr}>
            <Text style={styles.text}>Welcome to Hogsmead.</Text>
            <Text style={styles.text}>Your pocket sized wizardly companion</Text>
            <Text style={styles.text}>Before we move forward we need to get you sorted to an appropriate house</Text>
          </View>
          <View style={styles.inputWrapper}>
            <StyledInputField setState={setUserName} state={userName} label={'Name'} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title={authData?.userName ? 'Login' : 'Secure Login'} onPress={checkBiometrics} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapepr: {
    padding: 10,
  },
  inputWrapper: {
    padding: 10,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20%',
  },
  buttonWrapper: {
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
