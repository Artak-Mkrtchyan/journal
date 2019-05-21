import { Action } from '@ngrx/store';

export enum EPlaylistActions {
  SetPlaylist = '[Playlist] Set Playlist'
}

export class SetPlaylist implements Action {
  readonly type = EPlaylistActions.SetPlaylist;

  constructor(public payload: Array<object>) {}
}

export type PlaylistAction = SetPlaylist;
