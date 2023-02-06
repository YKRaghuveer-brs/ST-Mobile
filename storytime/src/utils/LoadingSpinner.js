import {Image, View} from 'react-native';
const LoadingSpinner = () => {
  return (
    <>
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
            source={require('../assets/images/Spiral_logo_loader.gif')}
          />
        </View>
    </>
  );
};

export default LoadingSpinner;
