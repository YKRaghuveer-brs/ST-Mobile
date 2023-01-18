import Player from "../stickyPlayer/Player";
import { View, Text, ActivityIndicator, Image } from "react-native";


export default function MiniPlayer({ tracks, story, press }) {

	// const Player = ({ tracks, story, press }) => {


console.log("tracks",tracks,press,story)

	return(
		<View>
		 {tracks && tracks.length ? (
              <Player
                tracks={tracks}
                story={story}
                // onPress={() => press()}
              />
            ) : null}
		</View>
		)

}


