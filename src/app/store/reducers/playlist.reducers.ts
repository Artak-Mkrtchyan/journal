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
    case EPlaylistActions.SetPlaylist:
      return {
        tracks: action.payload
      };

    default:
      return state;
  }
};
