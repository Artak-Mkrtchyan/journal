import { createSelector } from '@ngrx/store';

import { IPlaylist } from '@models/playlist.interface';
import { IAppState } from '@store/state/app.state';

const Playlist = (state: IAppState) => state.playlist;

export const selectPlaylist = createSelector(
  Playlist,
  (playlist: IPlaylist) => playlist
);
