/** 
Created: 23.01.2022
Component: Profile Screem
Description: Renders the User Profile details
(c) Copyright (c) by Nyros. 
**/

import {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ToastManager, {Toast} from 'toastify-react-native';
import tw from 'twrnc';
import {BASE_URL} from '../../config';

const ProfileScreen1 = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Form Validation
  const validateSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('First Name is required')
      .min(3, 'First Name must be at least 3 characters')
      .max(20, 'First Name must not exceed 20 characters'),
    last_name: Yup.string()
      .required('Last Name is required')
      .min(3, 'Last Name must be at least 3 characters')
      .max(20, 'Last Name must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const initialValues = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };


  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4 text-white`}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            left: 0,
            right: 0,
            top: 40,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../assets/images/Spiral_logo_loader.gif')}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <ToastManager duration={3000} style={{fontSize: 10}} />

        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <Text
                style={[
                  {
                    textAlign: 'left',
                    fontSize: 25,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    color: '#fff',
                    backgroundColor: '#FFFFFF3E',
                    marginLeft: 10,
                  },
                ]}>
                {'<'}
              </Text>
            </Pressable>
          </View>
          <Text style={tw`text-xl text-white pt-3 font-bold content-center  `}>
            Profile
          </Text>

          <View style={styles.rightContainer}>
            <Text
              style={[
                {
                  fontSize: 15,
                  padding: 5,
                  color: '#fff',
                  backgroundColor: '#FFFFFF3E',
                  marginRight: 10,
                },
              ]}>
              {'<'}
            </Text>
          </View>
        </View>

        <View style={tw`position:absolute,z-10, w-full`}>
          <Formik
            validationSchema={validateSchema}
            initialValues={initialValues}
            onSubmit={async values => {
              axios
                .put(BASE_URL + 'updateUser/' + user._id, values)
                .then(res => {
                  if (res) {
                    Toast.success('Update your data successfully');
                  }
                  setTimeout(() => {
                    setIsSubmit(false);
                  }, 5000);
                })
                .catch(error => {
                  Toast.error(error.response.data);
                });
            }}>
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
                </View>

                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>Email</Text>
                  <TextInput
                    name="email"
                    placeholder="Email"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    editable={false}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>

                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>First Name</Text>
                  <TextInput
                    name="first_name"
                    placeholder="First Name"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
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
                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>Last Name</Text>

                  <TextInput
                    name="last_name"
                    placeholder="Last Name"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
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

                <Pressable
                  style={tw`bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                  disabled={isSubmit}>
                  <Text style={tw`text-white py-3 font-bold`}>Update</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen1;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
