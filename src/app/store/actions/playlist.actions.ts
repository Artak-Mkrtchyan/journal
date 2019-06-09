import { Action } from '@ngrx/store';

export enum EPlaylistActions {
  SetTopPlaylist = '[Playlist] Set Top Playlist',
  SetSearchPlaylist = '[Playlist] Set Search Playlist'
}

export class SetTopPlaylist implements Action {
  readonly type = EPlaylistActions.SetTopPlaylist;

  constructor(public payload: Array<object>) {}
}

export class SetSearchPlaylist implements Action {
  readonly type = EPlaylistActions.SetSearchPlaylist;

  constructor(public payload: Array<object>) {}
}

export type PlaylistAction = SetSearchPlaylist | SetTopPlaylist;
