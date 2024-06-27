
import {useDispatch} from 'react-redux';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import tw from 'twrnc';
import LoadingSpinner from '../components/LoadingSpinner';
import {login} from '../store/user/authSlice';
import {useLoginAPIMutation} from '../store/user/userApiSlice';
import ShowToast from '../components/ShowToast';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [loginAPI, {isLoading}] = useLoginAPIMutation();

  const loginHandler = async (values, {setSubmitting, resetForm}) => {
    try {
      const response = await loginAPI({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(login({...response}));
      resetForm()
    } catch (error) {
      ShowToast('error', error?.data?.message || error.error);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] text-white`}>
      {isLoading && <LoadingSpinner />}

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={tw`w-full`}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={loginHandler}>
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
                    Login
                  </Text>
                </View>

                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
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
                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={tw`flex-1 rounded pl-4 bg-white bg-opacity-30 rounded-full`}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
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
                <View style={tw`flex items-end mr-8`}>
                  <Text
                    style={tw`font-bold text-white`}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={tw`mt-4 ml-8 mr-8 mb-2 flex items-center rounded-full bg-[#7464ED] py-3`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}>
                  <Text style={tw`text-base text-white font-bold`}>Login</Text>
                </TouchableOpacity>

                <View style={tw`flex items-center`}>
                  <Text
                    style={tw`font-bold text-white mt-3`}
                    onPress={() => navigation.navigate('Register')}>
                    You don't have account ? Sign up
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

export default LoginScreen;
