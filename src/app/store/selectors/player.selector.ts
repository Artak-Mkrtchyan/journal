import { IPlayer } from '@models/player.interface';
import { createSelector } from '@ngrx/store';

import { IAppState } from '@store/state/app.state';
import { playerReducers } from '@store/reducers/player.reducers';

export const Player = (state: IAppState) => state.player;

export const selectPlayer = createSelector(
  Player,
  (player: IPlayer) => {
    return {
      isHasSong: player.isHasSong,
      artistInfo: player.artistInfo,
      isPlay: player.isPlay,
      volume: player.volume,
      activePlaylist: player.activePlaylist
    };
  }
);

export const selectPlayerTrackName = createSelector(
  Player,
  (player: IPlayer) => {
    return {
      songName: player.name,
      currentTrackIndex: player.playlistIndexes.currentIndex
    };
  }
);

export const selectPlayerStatus = createSelector(
  Player,
  (state: IPlayer) => {
    return {
      isPlay: state.isPlay,
      name: state.name
    };
  }
);
