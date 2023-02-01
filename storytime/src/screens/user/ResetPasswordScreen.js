/** 
Created: 23.01.2022
Component: Reset Password Screen
Description: Renders the reset password logic
(c) Copyright (c) by Nyros. 
**/

import  { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import tw from "twrnc";

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const initialValues = {
    password: "",
    confirmPassword: "",
    email: email,
  };

  // Form Validation
  const validateSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  return (
    <View style={styles.mainBody}>
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
            validationSchema={validateSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              try {
                // const response = await axios.post("http://203.193.173.125:6969/resetPasswordFromMobile", values);
                const response = await HttpPost("resetPasswordFromMobile", values);
                if (response) {
                  Toast.success(response.data);
                  setTimeout(() => {
                    navigation.navigate("Login");
                  }, 3000);
                }
              } catch (error) {
                Toast.error(error.response.data);
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
                  <Text style={{ alignSelf: "center", color: "#fff", fontSize: 20 }}>Reset Password</Text>
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                <View>{errors.password && <Text style={styles.errorTextStyle}>{errors.password}</Text>}</View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                </View>
                <View>{errors.confirmPassword && <Text style={styles.errorTextStyle}>{errors.confirmPassword}</Text>}</View>

                <Pressable style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmit}>
                  <Text style={styles.buttonTextStyle}>Update Password</Text>
                </Pressable>

                <View>
                  <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("Login")}>
                    Already Registered ? Login
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
export default ResetPasswordScreen;

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
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "left",
    fontSize: 11,
    marginLeft: 35,
  },
});
