import { IPlayer } from '@models/player.interface';

export const initialPlayerState: IPlayer = {
  isHasSong: false,
  isPlay: false,
  file: null,
  volume: 0.5,
  // currentTime: 0
};
