import { IPlayer } from '@models/player.interface';

export const PlayerState: IPlayer = {
  isHasSong: false,
  isPlay: false,
  volume: 0.5,
  artistInfo: null,
  name: null,
  musicSrc: null,
  activePlaylist: null,
  playlistIndexes: {
    topMaxIndex: 10,
    searchMaxIndex: null,
    myTracksMaxIndex: null,
    currentIndex: 0
  }
};
