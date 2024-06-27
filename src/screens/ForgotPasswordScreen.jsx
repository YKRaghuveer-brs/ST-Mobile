import {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import LoadingSpinner from '../components/LoadingSpinner';
import tw from 'twrnc';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <View style={styles.mainBody}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {isSubmit && <LoadingSpinner />}
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: ''}}
            onSubmit={() => {}}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
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
                  <Text
                    style={{alignSelf: 'center', color: '#fff', fontSize: 20}}>
                    Forgot Password
                  </Text>
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    name="email"
                    placeholder="Email Address"
                    style={tw`flex-1 h-12 rounded bg-white bg-opacity-30 px-6 rounded-full`}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  {errors.email && (
                    <Text style={styles.errorTextStyle}>{errors.email}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={tw`mt-4 ml-8 mr-8 flex items-center rounded-full bg-[#7464ED] py-3 mb-4`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}>
                  <Text style={tw`text-base text-white font-bold`}>
                    Send OTP
                  </Text>
                </TouchableOpacity>

                <View style={tw`flex items-center`}>
                  <Text
                    style={tw`font-bold text-white`}
                    onPress={() => navigation.navigate('Register')}>
                    You don't have account ? Register
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#291F4E',
    alignContent: 'center',
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
    borderColor: '#072c32',
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
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontSize: 12,
    marginLeft: 35,
  },
  registerTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default ForgotPasswordScreen;
