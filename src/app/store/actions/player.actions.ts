import { Action } from '@ngrx/store';

export enum EPlayerActions {
  TogglePlayerStatus = '[Player] Change Player Status',
  SetCurrentTime = '[Player] Set Duration',
  SwitchSongStatus = '[Player] Change Song Status',
  PlaySong = '[Player] Play Song',
  StopSong = '[Player] Stop Song',
  // LoadLocalFile = '[Player] Load Local File',
  SetVolume = '[Player] Set Volume',
  LoadSong = '[Player] Load Song',
  SetCurrentPlaylistIndex = '[Player] Set Current Index',
  SetMaxPlaylistIndex = '[Player] Set Max Index',
  NextSong = '[Player] Next Song',
  PreviousSong = '[Player] Previous Song',
  SetActivePlaylist = '[Player] Set Active Playlist'
}

export class SetActivePlaylist implements Action {
  readonly type = EPlayerActions.SetActivePlaylist;

  constructor(public playlist: object) {}
}

export class TogglePlayerStatus implements Action {
  readonly type = EPlayerActions.TogglePlayerStatus;
}

export class SetCurrentTime implements Action {
  readonly type = EPlayerActions.SetCurrentTime;

  constructor(public payload: number) {}
}

export class SwitchSongStatus implements Action {
  readonly type = EPlayerActions.SwitchSongStatus;
}

export class PlaySong implements Action {
  readonly type = EPlayerActions.PlaySong;
}

export class StopSong implements Action {
  readonly type = EPlayerActions.StopSong;
}

export class NextSong implements Action {
  readonly type = EPlayerActions.NextSong;
}

export class PreviousSong implements Action {
  readonly type = EPlayerActions.PreviousSong;
}

// export class LoadLocalFile implements Action {
//   readonly type = EPlayerActions.LoadLocalFile;

//   constructor(public payload: object) {}
// }

export class LoadSong implements Action {
  readonly type = EPlayerActions.LoadSong;

  constructor(
    public payload: {
      albumId?: string;
      albumName?: string;
      artistName?: string;
      name: string;
      musicSrc: ArrayBuffer | string;
    }
  ) {}
}

export class SetCurrentPlaylistIndex implements Action {
  readonly type = EPlayerActions.SetCurrentPlaylistIndex;

  constructor(public payload: number) {}
}

export class SetMaxPlaylistIndex implements Action {
  readonly type = EPlayerActions.SetMaxPlaylistIndex;

  constructor(public typeIndex: string, public maxIndex: number) {}
}

export class SetVolume implements Action {
  readonly type = EPlayerActions.SetVolume;

  constructor(public payload: number) {}
}

export type PlayerActions =
  | SwitchSongStatus
  | PlaySong
  | StopSong
  | NextSong
  | PreviousSong
  | TogglePlayerStatus
  | SetVolume
  | SetCurrentTime
  | LoadSong
  | SetActivePlaylist
  | SetCurrentPlaylistIndex
  | SetMaxPlaylistIndex;
// | LoadLocalFile;
