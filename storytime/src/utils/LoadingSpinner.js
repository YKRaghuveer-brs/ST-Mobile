import {Image, View, Text} from 'react-native';
import { windowHeight, windowWidth } from './Dimensions';

const LoadingSpinner = () => {
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "coral"
        }}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../assets/images/Spiral_logo_loader.gif')}></Image>
      </View>
    </>
  );
};

export default LoadingSpinner;
