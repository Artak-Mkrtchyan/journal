import { IPlaylist } from '@models/playlist.interface';
import { createSelector } from '@ngrx/store';

import { IAppState } from '@store/state/app.state';

const Playlist = (state: IAppState) => state.playlist;

export const selectPlaylist = createSelector(
  Playlist,
  (state: IPlaylist) => state
);
