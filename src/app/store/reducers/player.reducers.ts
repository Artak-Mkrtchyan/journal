import { PlayerActions, EPlayerActions } from '@store/actions/player.actions';
import { PlayerState } from '@store/state/player.state';
import { IPlayer } from '@models/player.interface';

export const playerReducers = (
  state = PlayerState,
  action: PlayerActions
): IPlayer => {
  switch (action.type) {
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

    case EPlayerActions.SetActivePlaylist:
      return {
        ...state,
        activePlaylist: action.playlist
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

    case EPlayerActions.NextSong:
      return {
        ...state,
        playlistIndexes: {
          ...state.playlistIndexes,
          currentIndex: state.playlistIndexes.currentIndex + 1
        }
      };

    case EPlayerActions.PreviousSong:
      return {
        ...state,
        playlistIndexes: {
          ...state.playlistIndexes,
          currentIndex: state.playlistIndexes.currentIndex - 1
        }
      };

    case EPlayerActions.SetVolume:
      return {
        ...state,
        volume: action.payload
      };

    case EPlayerActions.SetCurrentPlaylistIndex:
      return {
        ...state,
        playlistIndexes: {
          ...state.playlistIndexes,
          currentIndex: action.payload
        }
      };

    case EPlayerActions.SetMaxPlaylistIndex:
      return {
        ...state,
        playlistIndexes: {
          ...state.playlistIndexes,
          topMaxIndex:
            action.typeIndex === 'top'
              ? action.maxIndex
              : state.playlistIndexes.topMaxIndex,
          searchMaxIndex:
            action.typeIndex === 'search'
              ? action.maxIndex
              : state.playlistIndexes.searchMaxIndex,
          myTracksMaxIndex:
            action.typeIndex === 'myTrack'
              ? action.maxIndex
              : state.playlistIndexes.myTracksMaxIndex
        }
      };

    default:
      return state;
  }
};
