/** 
Created: 23.01.2022
Component: Register Screen
Description: Renders the Registration Form to register a new user
(c) Copyright (c) by Nyros. 
**/

import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import tw from 'twrnc';


const RegisterScreen1 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
    mobile_app: true,
  };

  // Form Validation
  const validateSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(20, "First Name must not exceed 20 characters"),
    last_name: Yup.string()
      .required("Lastname is required")
      .min(3, "Lastname must be at least 3 characters")
      .max(20, "Lastname must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Please accept terms&conditions"),
  });

  return (
    <View style={tw`flex-1 justify-center bg-[#291F4E]`}>
     {loading ? (
        <View
          style={{
             position: "absolute",
            zIndex: 2,
            left: 0,
            right: 0,
            top: 20,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ToastManager duration={3000} style={{ fontSize: 10 }} />

        <View style={tw`position:absolute,z-10, w-full`}>
          <Formik
            validationSchema={validateSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              setLoading(true);

              try {
                const response = await axios.post("http://203.193.173.125:6969/register", values);
                if (response) {
                  Toast.success(response.data.message);

                  setTimeout(() => {
                    navigation.navigate("EmailVerify", {
                      email: response.data.email,
                    });
                  }, 3000);
                }
              } catch (error) {
                Toast.error(error.response.data);
              }
              setLoading(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  <Image
                    source={{ uri: "https://i.ibb.co/YfCLy1z/storytime.png" }}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "contain",
                      margin: 10,
                    }}
                  />
                  <Text style={{ fontSize: 20,color:"#fff" }}>Create Account</Text>
                </View>

                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="email"
                    placeholder="Email Address"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  {errors.email && <Text style={tw `text-red-600 text-xs ml-8`}>{errors.email}</Text>}
                </View>
                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="first_name"
                    placeholder="FirstName"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
                  />
                </View>
                <View>
                  {errors.first_name && <Text style={tw `text-red-600 text-xs ml-8`}>{errors.first_name}</Text>}
                </View>
                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="last_name"
                    placeholder="LastName"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    value={values.last_name}
                  />
                </View>
                <View>
                  {errors.last_name && <Text style={tw `text-red-600 text-xs ml-8`}>{errors.last_name}</Text>}
                </View>

                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                <View>
                  {errors.password && <Text style={tw `text-red-600 text-xs ml-8`}>{errors.password}</Text>}
                </View>

                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                </View>
                <View>
                  {errors.confirmPassword && (
                    <Text style={tw `text-red-600 text-xs ml-8`}>{errors.confirmPassword}</Text>
                  )}
                </View>

                <Pressable
                  style={tw `bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                >
                  <Text style={tw`text-white py-3 font-bold`}>Sign up</Text>
                </Pressable>

                <View style={tw `flex items-center`}>
                  <Text style={tw `font-bold text-white`} onPress={() => navigation.navigate("Login")}>
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
export default RegisterScreen1;

