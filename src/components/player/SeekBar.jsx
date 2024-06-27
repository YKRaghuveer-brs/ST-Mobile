import {View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const SeekBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
  const minutesAndSeconds = position => [
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ];

  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        value={currentPosition}
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#F2F2F2"
        step={1}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={time => onSeek(time)}
      />
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  },
});
