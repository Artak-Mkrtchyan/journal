export interface IPlayer {
  isHasSong: boolean;
  isPlay: boolean;
  volume: number;
  artistInfo: {
    albumId: string;
    albumName: string;
    artistName: string;
  };
  activePlaylist: object;
  name: string;
  musicSrc: string | ArrayBuffer;
  playlistIndexes: {
    topMaxIndex: number;
    searchMaxIndex: number;
    myTracksMaxIndex: number;
    currentIndex: number;
  };
}
