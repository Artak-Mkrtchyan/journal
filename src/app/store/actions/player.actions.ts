import { Action } from '@ngrx/store';

export enum EPlayerActions {
  TogglePlayerStatus = '[Player] Change Player Status',
  SetCurrentTime = '[Player] Set Duration',
  SwitchSongStatus = '[Player] Change Song Status',
  LoadLocalFile = '[Player] Load Local File',
  SetVolume = '[Player] Set Volume',
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

export class LoadLocalFile implements Action {
  readonly type = EPlayerActions.LoadLocalFile;

  constructor(public payload: File) {}
}

export class SetVolume implements Action {
  readonly type = EPlayerActions.SetVolume;

  constructor(public payload: number) {}
}

export type PlayerActions =
  | SwitchSongStatus
  | TogglePlayerStatus
  | SetVolume
  | SetCurrentTime
  | LoadLocalFile;
