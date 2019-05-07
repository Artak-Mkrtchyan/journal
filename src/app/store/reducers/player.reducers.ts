import { PlayerActions, EPlayerActions } from '../actions/player.actions';
import { initialPlayerState } from '../state/player.state';
import { IPlayer } from './../../models/player.interface';

export const playerReducers = (
  state = initialPlayerState,
  action: PlayerActions
): IPlayer => {
  switch (action.type) {
    case EPlayerActions.OpenPlayer:
      return {
        isOpen: true,
        isPlay: state.isPlay
      };

    case EPlayerActions.StartPlayer:
      return {
        isOpen: state.isOpen,
        isPlay: true
      };

    case EPlayerActions.StopPlayer:
      return {
        isOpen: state.isOpen,
        isPlay: false
      };

    case EPlayerActions.ClosePlayer:
      return {
        isOpen: false,
        isPlay: state.isPlay
      };

    default:
      return state;
  }
};
