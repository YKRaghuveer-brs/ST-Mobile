import Player from '../stickyPlayer/Player';
import {View} from 'react-native';

export default function MiniPlayer({tracks, story, press}) {
  console.log('tracks', tracks, press, story);

  return (
    <View>
      {tracks && tracks.length ? (
        <Player tracks={tracks} story={story} onPress={press} />
      ) : null}
    </View>
  );
}
