import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";


const StoryEpisodes = async (story)  => {

	 const {spotifyGet,setTracks,setStory,setStickyPlayer} = useContext(AuthContext);

     const queryParams = { limit: 50, market: "IN" };
    const response = await spotifyGet(
      `shows/${story.id}/episodes`,
      queryParams
    );
    const episodes = [];
    if (response.items.length > 0 || response.next) {
      response.items.map((episode, index) => {
        let obj = {
          id: index,
          title: episode.name.slice(0, 20),
          artist: "Justin Bieber",
          albumArtUrl: episode.images[0].url,
          audioUrl: episode.audio_preview_url,
        };
        episodes.push(obj);
      });

      // setEpisodeList(episodes);
      setTracks(episodes)
      setStory(story)
    } else {
      return false;
    }

    setStickyPlayer(true);

};

export default StoryEpisodes;