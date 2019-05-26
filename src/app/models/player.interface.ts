export interface IPlayer {
  isHasSong: boolean;
  isPlay: boolean;
  volume: number;
  artistInfo: object;
  name: string;
  musicSrc: string | ArrayBuffer;
  // currentTime: number;
}
