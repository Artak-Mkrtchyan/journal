export interface IPlayer {
  isHasSong: boolean;
  isPlay: boolean;
  volume: number;
  artistInfo: {
    albumId: string;
    albumName: string;
    artistName: string;
  };
  name: string;
  musicSrc: string | ArrayBuffer;
  // currentTime: number;
}
