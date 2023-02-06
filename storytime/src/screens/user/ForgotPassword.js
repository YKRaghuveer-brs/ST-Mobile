/** 
Created: 23.01.2023
Component: Forgot Password
Description: Renders forgot password logic 
(c) Copyright (c) by Nyros. 
**/

import { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, View, Text, SafeAreaView, Image, Pressable } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import tw from "twrnc";
import { AuthContext } from "../../context/AuthContext";



const ForgotPassword = ({ navigation }) => {
  const {HttpPost, isLoading} = useContext(AuthContext)
  useEffect(() => {
    setTimeout(() => {
      
    }, 3000);
  }, []);

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Email Address is Required"),
  });

  return (
    <View style={styles.mainBody}>
      {isLoading ? (
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
            source={require("../../assets/images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ToastManager duration={3000} style={{ fontSize: 10 }} />
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                const response = await HttpPost("resetPasswordEmailMobile", values);
                if (response) {
                  Toast.success(response.data);
                  setTimeout(() => {
                    navigation.navigate("ResetPasswordVerify", { email: values.email });
                  }, 3000);
                }
              } catch (error) {
                Toast.error(error.response.data);
                console.error(error);
              }
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
                  <Text style={{ alignSelf: "center", color: "#fff", fontSize: 20 }}>Forgot Password</Text>
                </View>

                <View style={styles.SectionStyle}>
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
                <View>{errors.email && <Text style={styles.errorTextStyle}>{errors.email}</Text>}</View>

                <Pressable style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmit}>
                  <Text style={styles.buttonTextStyle}>Send OTP</Text>
                </Pressable>

                <View style={tw`flex items-center`}>
                  <Text style={tw`font-bold text-white`} onPress={() => navigation.navigate("Register")}>
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
export default ForgotPassword;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#291F4E",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#2A0D62",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#072c32",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "left",
    fontSize: 12,
    marginLeft: 35,
  },
  registerTextStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
});
