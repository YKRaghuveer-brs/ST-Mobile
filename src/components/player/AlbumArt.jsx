import {View, StyleSheet, Image, Pressable, Dimensions} from 'react-native';

const AlbumArt = ({url}) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image style={styles.image} source={{uri: url}} />
      </Pressable>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 2,
    // paddingTop: 2,
    paddingRight: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default AlbumArt;
