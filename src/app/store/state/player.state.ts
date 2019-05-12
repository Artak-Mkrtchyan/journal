import { IPlayer } from '@models/player.interface';

export const initialPlayerState: IPlayer = {
  isOpen: false,
  isPlay: false,
  file: null,
  volume: 50,
};
