import {View, Text, Pressable, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeStickyPlayer} from '../../store/user/authSlice';
import tw from 'twrnc';
import AlbumArt from './AlbumArt';
import Controls from './Controls';
import {truncateText} from '../../utils/utils';
import TextTicker from 'react-native-text-ticker';
import SeekBar from './SeekBar';
import {useEffect, useRef, useState} from 'react';
import {useGetEpisodesByShowIdQuery} from '../../store/spotify/spotifyApiSlice';
import Video from 'react-native-video';
import LoadingSpinner from '../LoadingSpinner';

const StickyPlayer = () => {
  const {storyInfo} = useSelector(state => state.auth);

  const audioElement = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [paused, setPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const {data, isLoading} = useGetEpisodesByShowIdQuery(storyInfo.id);

  const dispatch = useDispatch();

  const playerHandler = () => {
    dispatch(closeStickyPlayer());
  };

  const setDuration = data => {
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = data => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const seek = time => {
    time = Math.round(time);
    audioElement && audioElement.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const onBack = () => {
    if (currentPosition < 10 && selectedTrack > 0) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack - 1);
        setCurrentTrack(tracks[selectedTrack]);
      }, 0);
    } else {
      setCurrentPosition(0);
    }
  };

  const onForward = () => {
    if (selectedTrack < tracks.length - 1) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack + 1);
        setCurrentTrack(tracks[selectedTrack]);
      }, 0);
    } else {
      setCurrentPosition(0);
    }
  };

  const loadStart = data => {};

  useEffect(() => {
    if (data) {
      const list = data?.items?.filter(episode => episode);
      setTracks(list);
      setCurrentTrack(list[selectedTrack]);
      console.log('CURRENT TRACK IS ');
      console.log(list[selectedTrack]);
    }
  }, [storyInfo, data]);

  const video = isChanging ? null : (
    <Video
      // source={require('../../assets/sample.mp3')} // Can be a URL or a local file.
      source={{uri: currentTrack.audio_preview_url}}
      ref={audioElement}
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={true} // Repeat forever.
      onLoadStart={loadStart} // Callback when video starts to load
      onLoad={data => setDuration(data)} // Callback when video loads
      onProgress={data => setTime(data)} // Callback every ~250ms with currentTime
      onEnd={this.onEnd} // Callback when playback finishes
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.audioElement}
    />
  );

  return (
    <>
      {!isLoading ? (
        <View style={[tw`bg-[#5E48A8] rounded-lg mx-1.5`, styles.container]}>
          <View style={tw`flex items-end px-2 pt-1`}>
            <View>
              <Pressable onPress={playerHandler}>
                <Image
                  source={require('../../assets/images/close.png')}
                  style={tw`w-3 h-3`}
                />
              </Pressable>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {/* passing a static image url */}
            {/* <AlbumArt url={"https://i.scdn.co/image/ab67656300005f1f72a4b9f3e4052d86b9cd543c"} /> */}
            {!isLoading && tracks.length > 0 && (
              <AlbumArt url={currentTrack.images[0].url} />
            )}
            <Pressable>
              <View style={{paddingLeft: 10, paddingTop: 14}}>
                <Text style={{color: '#fff', fontSize: 14}}>
                  {!isLoading &&
                    tracks.length > 0 &&
                    truncateText(currentTrack.name, 14)}
                  {/* passing a static title  */}
                  {/* {truncateText('Kids Stories', 14)} */}
                </Text>

                <TextTicker
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    width: 100,
                    marginBottom: 10,
                  }}
                  duration={3000}
                  marqueeDelay={3000}>
                  {!isLoading && tracks.length > 0 && currentTrack.description}
                  {/* passing a static description */}
                  {/* {'History of India'} */}
                </TextTicker>
              </View>
            </Pressable>

            <Controls
              onPressRepeat={() => setRepeatOn(!repeatOn)}
              repeatOn={repeatOn}
              shuffleOn={shuffleOn}
              forwardDisabled={selectedTrack === tracks.length - 1}
              onPressShuffle={() => setShuffleOn(!shuffleOn)}
              onPressPlay={() => setPaused(false)}
              onPressPause={() => setPaused(true)}
              onBack={onBack}
              onForward={onForward}
              paused={paused}
            />
            {video}
          </View>

          <View>
            <SeekBar
              onSeek={time => seek(time)}
              trackLength={totalLength}
              onSlidingStart={() => setPaused(false)}
              currentPosition={currentPosition}
            />
          </View>
        </View>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 675,
    height: 100,
    width: 400,
    backgroundColor: '#5E48A8',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};

export default StickyPlayer;