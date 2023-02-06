/** 
Created: 23.01.2022
Component: Track Details
Description: Renders the Track details of a particular Show for main player
(c) Copyright (c) by Nyros. 
**/

import {View, Text, StyleSheet, Pressable} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import * as RootNavigation from '../../../navigation/RootNavigation.js';

const TrackDetails = ({title, artist, onTitlePress}) => (
  <View style={styles.container}>
    <View style={styles.detailsWrapper}>
      <TextTicker
        style={styles.title}
        onPress={onTitlePress}
        duration={3000}
        marqueeDelay={3000}>
        {title}
      </TextTicker>

      <Pressable
        onPress={() =>
          RootNavigation.navigate('AuthorStories', {publisher: artist})
        }>
        <Text style={styles.artist}>{artist}</Text>
      </Pressable>
    </View>
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  },
});
