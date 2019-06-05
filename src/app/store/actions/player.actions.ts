import { Action } from '@ngrx/store';

export enum EPlayerActions {
  TogglePlayerStatus = '[Player] Change Player Status',
  SetCurrentTime = '[Player] Set Duration',
  SwitchSongStatus = '[Player] Change Song Status',
  PlaySong = '[Player] Play Song',
  StopSong = '[Player] Stop Song',
  // LoadLocalFile = '[Player] Load Local File',
  SetVolume = '[Player] Set Volume',
  LoadSong = '[Player] Load Song'
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

export class SetVolume implements Action {
  readonly type = EPlayerActions.SetVolume;

  constructor(public payload: number) {}
}

export type PlayerActions =
  | SwitchSongStatus
  | PlaySong
  | StopSong
  | TogglePlayerStatus
  | SetVolume
  | SetCurrentTime
  | LoadSong;
// | LoadLocalFile;
