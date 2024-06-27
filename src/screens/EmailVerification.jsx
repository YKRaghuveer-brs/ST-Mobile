import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LoadingSpinner from '../components/LoadingSpinner';
import tw from 'twrnc';
import ShowToast from '../components/ShowToast';
import {
  useVerifyOTPAPIMutation,
  useResendOTPAPIMutation,
} from '../store/user/userApiSlice';

const EmailVerification = ({route, navigation}) => {
  // const {email} = route.params;
  const [verifyOTPAPI, {isLoading}] = useVerifyOTPAPIMutation();
  const [resendOTPAPI, {isLoading: resendOTPLoading}] =
    useResendOTPAPIMutation();

  const email = 'test@gmail.com';
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(59);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  const handleSubmit = async () => {
    if (value.length < 4) {
      console.log('yes');
      ShowToast('error', 'Enter 4 digit OTP');
      return;
    }
    try {
      const response = await verifyOTPAPI({
        email: email,
        verificationcode: value,
      }).unwrap();
      console.log(response);
      ShowToast('success', response.message);
      navigation.replace('Login');
    } catch (error) {
      ShowToast('error', error?.data?.message || error.error);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await resendOTPAPI({
        email: email,
      }).unwrap();
      console.log(response);
      ShowToast('success', response.message);
    } catch (error) {
      ShowToast('error', error?.data?.message || error.error);
    }
  };
  return (
    <>
      <View style={tw`flex-1 justify-center bg-[#291F4E]`}>
        {isLoading && <LoadingSpinner />}
        {resendOTPLoading && <LoadingSpinner />}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <SafeAreaView style={styles.root}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}>
              <Image
                source={{uri: 'https://i.ibb.co/YfCLy1z/storytime.png'}}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
              <Text style={styles.title}>Email Verify with OTP</Text>
            </View>
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
                onPress={resendOTP}>
                <Text style={tw`font-bold text-white`}>Resend OTP </Text>
              </Pressable>
              <Text style={tw`font-bold text-white`}>
                {counter != 0 ? ' in 00:' + counter : ''}
              </Text>
            </View>

            <Pressable
              style={tw`bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
              activeOpacity={0.5}
              onPress={handleSubmit}>
              <Text style={tw`font-bold text-white py-3`}>
                VERIFY & PROCEED
              </Text>
            </Pressable>
          </SafeAreaView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
    padding: 20,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
  registerTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  buttonStyle: {
    backgroundColor: '#2A0D62',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#072c32',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 150,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmailVerification;
