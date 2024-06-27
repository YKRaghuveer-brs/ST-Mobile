import {useState, useEffect, useContext} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import tw from 'twrnc';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ShowToast from '../components/ShowToast.js';
import {useRegisterAPIMutation} from '../store/user/userApiSlice.js';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: true,
  mobile_app: true,
};

// Form Validation
const validateSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .min(3, 'First Name must be at least 3 characters')
    .max(20, 'First Name must not exceed 20 characters'),
  last_name: Yup.string()
    .required('Lastname is required')
    .min(3, 'Lastname must be at least 3 characters')
    .max(20, 'Lastname must not exceed 20 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Please accept terms&conditions'),
});

export const RegisterScreen = ({navigation}) => {
  const [registerAPI, {isLoading}] = useRegisterAPIMutation();

  const registerHandler = async (values, {setSubmitting, resetForm}) => {
    try {
      const response = await registerAPI({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log(response);
      resetForm();
      ShowToast('success', response.message);
      navigation.replace('VerifyEmail', {
        email: values.email,
      });
    } catch (error) {
      console.log(error);
      ShowToast('error', error?.data?.message || error.error);
    }
  };
  return (
    <View style={tw`flex-1 justify-center bg-[#291F4E]`}>
      {isLoading && <LoadingSpinner />}

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={tw`position:absolute,z-10, w-full`}>
          <Formik
            validationSchema={validateSchema}
            initialValues={initialValues}
            onSubmit={registerHandler}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
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
                  <Text style={{fontSize: 20, color: '#fff'}}>
                    Create Account
                  </Text>
                </View>

                <View style={tw`h-12 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="email"
                    placeholder="Email Address"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  {errors.email && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={tw`h-12 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="first_name"
                    placeholder="FirstName"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                  />
                </View>
                <View>
                  {errors.first_name && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.first_name}
                    </Text>
                  )}
                </View>
                <View style={tw`h-12 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="last_name"
                    placeholder="LastName"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    value={values.last_name}
                  />
                </View>
                <View>
                  {errors.last_name && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.last_name}
                    </Text>
                  )}
                </View>

                <View style={tw`h-12 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                </View>
                <View>
                  {errors.password && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                <View style={tw`h-12 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                </View>
                <View>
                  {errors.confirmPassword && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                <Pressable
                  style={tw`mt-4 ml-8 mr-8 flex items-center  rounded-full bg-[#7464ED] py-3 mb-4`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}>
                  <Text style={tw`text-base text-white font-bold`}>
                    Sign up
                  </Text>
                </Pressable>

                <View style={tw`flex items-center`}>
                  <Text
                    style={tw`font-bold text-white`}
                    onPress={() => navigation.navigate('Login')}>
                    Already have an account ? Login
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
