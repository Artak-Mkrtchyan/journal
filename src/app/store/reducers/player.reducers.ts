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

    case EPlayerActions.OpenPlayer:
      return {
        ...state,
        isOpen: true
      };

    case EPlayerActions.StartPlayer:
      return {
        ...state,
        isPlay: true
      };

    case EPlayerActions.StopPlayer:
      return {
        ...state,
        isPlay: false
      };

    case EPlayerActions.ClosePlayer:
      return {
        ...state,
        isOpen: false
      };

    case EPlayerActions.SetVolume:
      return {
        ...state,
        volume: action.payload
      }

    default:
      return state;
  }
};
