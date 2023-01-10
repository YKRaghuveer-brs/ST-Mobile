import React from "react";
import {Text ,View , Image , StyleSheet} from 'react-native' ;
  
const AddGifImage = () => {
    return (
        <View style={Styles.container}>
          <Image
            style ={{width: "100%", height:"100%"}}
            // source={{ }}
            source={require("../../assets/Images/Cube_1.gif")}  


          />
        </View>
      );
}


const Styles = StyleSheet.create({
    container :{
        alignContent:'center',
        
    }
})
  
export default AddGifImage;