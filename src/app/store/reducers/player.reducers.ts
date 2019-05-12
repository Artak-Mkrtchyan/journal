import { PlayerActions, EPlayerActions } from '@store/actions/player.actions';
import { initialPlayerState } from '@store/state/player.state';
import { IPlayer } from '@models/player.interface';

export const playerReducers = (
  state = initialPlayerState,
  action: PlayerActions
): IPlayer => {
  switch (action.type) {
    case EPlayerActions.LoadLocalFile:
      return {
        ...state,
        file: action.payload,
      };

    // case EPlayerActions.SetCurrentTime:
    //   return {
    //     ...state,
    //     currentTime: action.payload
    //   };

    case EPlayerActions.TogglePlayerStatus:
      return {
        ...state,
        isHasSong: !state.isHasSong
      };

    case EPlayerActions.SwitchSongStatus:
      return {
        ...state,
        isPlay: !state.isPlay
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
