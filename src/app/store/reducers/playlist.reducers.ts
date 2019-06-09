import { PlaylistState } from '@store/state/playlist.state';
import {
  PlaylistAction,
  EPlaylistActions
} from '@store/actions/playlist.actions';
import { IPlaylist } from '@models/playlist.interface';

export const playlistReducers = (
  state = PlaylistState,
  action: PlaylistAction
): IPlaylist => {
  switch (action.type) {
    case EPlaylistActions.SetTopPlaylist:
      return {
        ...state,
        topTracks: action.payload
      };

    case EPlaylistActions.SetSearchPlaylist:
      return {
        ...state,
        searchTracks: action.payload
      };

    default:
      return state;
  }
};
