/** 
Created: 23.01.2022
Component: Reset Password Verification Screen
Description: To verify the user - to reset the password
(c) Copyright (c) by Nyros. 
**/

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import ToastManager, {Toast} from 'toastify-react-native';

const CELL_COUNT = 4;

const ResetPasswordVerification = ({route, navigation}) => {
  const {email} = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [counter, setCounter] = React.useState(59);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      email: email,
      code: value,
    };
    try {
      const response = await axios.post(
        'http://203.193.173.125:6969/resetPasswordCodeVerifyMobile',
        payload,
      );
      if (response) {
        Toast.success(response.data);
        setTimeout(() => {
          navigation.navigate('ResetPassword', {
            email: email,
          });
        }, 3000);
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.error(error);
    }
    setLoading(false);
  };

  const resendPassword = async () => {
    setLoading(true);
    const payload = {
      email: email,
    };
    try {
      const response = await axios.post(
        'http://203.193.173.125:6969/resetPasswordEmailMobile',
        payload,
      );
      if (response) {
        Toast.success(response.data);
        setCounter(59);
        setValue('');
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ToastManager duration={3000} style={{fontSize: 10}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              left: 0,
              right: 0,
              top: 20,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../../assets/Images/Spiral_logo_loader.gif')}
            />
          </View>
        ) : (
          ''
        )}
        <Image
          source={{uri: 'https://i.ibb.co/YfCLy1z/storytime.png'}}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain',
            margin: 10,
          }}
        />
      </View>
      <Text style={styles.title}>OTP Verification Reset Password</Text>
      <Text style={styles.title1}>
        Please type the verification code sent to the email &nbsp;
        {email}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Pressable
          disabled={counter == 0 ? false : true}
          onPress={resendPassword}>
          <Text style={styles.registerTextStyle}>Resend OTP</Text>
        </Pressable>

        <Text style={styles.registerTextStyle}>
          {counter != 0 ? ' in 00:' + counter : ''}
        </Text>
      </View>

      <Pressable
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmit}>
        <Text style={styles.buttonTextStyle}>VERIFY & PROCEED</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResetPasswordVerification;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
    padding: 20,
  },
  title: {textAlign: 'center', fontSize: 30, color: '#fff'},
  title1: {textAlign: 'center', fontSize: 15, color: '#fff'},

  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  buttonStyle: {
    backgroundColor: '#2A0D62',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#fcc630',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerTextStyle: {
    color: '#FFFFFF',

    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    paddingTop: 10,
  },
});
