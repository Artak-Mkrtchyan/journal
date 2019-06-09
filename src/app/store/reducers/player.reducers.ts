import { PlayerActions, EPlayerActions } from '@store/actions/player.actions';
import { PlayerState } from '@store/state/player.state';
import { IPlayer } from '@models/player.interface';

export const playerReducers = (
  state = PlayerState,
  action: PlayerActions
): IPlayer => {
  switch (action.type) {
    // case EPlayerActions.SetCurrentTime:
    //   return {
    //     ...state,
    //     currentTime: action.payload
    //   };

    case EPlayerActions.LoadSong:
      return {
        ...state,
        artistInfo: {
          albumId: action.payload.albumId,
          albumName: action.payload.albumName,
          artistName: action.payload.artistName
        },
        isHasSong: true,
        name: action.payload.name,
        musicSrc: action.payload.musicSrc
      };

    case EPlayerActions.TogglePlayerStatus:
      return {
        ...state
        // isHasSong: !state.isHasSong
      };

    case EPlayerActions.SwitchSongStatus:
      return {
        ...state,
        isPlay: !state.isPlay
      };

    case EPlayerActions.PlaySong:
      return {
        ...state,
        isPlay: true
      };

    case EPlayerActions.StopSong:
      return {
        ...state,
        isPlay: false
      };

    case EPlayerActions.SetVolume:
      return {
        ...state,
        volume: action.payload
      };

    default:
      return state;
  }
};
