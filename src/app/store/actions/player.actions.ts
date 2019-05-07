import { Action } from '@ngrx/store';

export enum EPlayerActions {
  StartPlayer = '[Player] Start',
  StopPlayer = '[Player] Stop',
  OpenPlayer = '[Player] Open Player',
  ClosePlayer = '[Player] Close Player'
}

export class OpenPlayer implements Action {
  readonly type = EPlayerActions.OpenPlayer;
}

export class ClosePlayer implements Action {
  readonly type = EPlayerActions.ClosePlayer;
}

export class StartPlayer implements Action {
  readonly type = EPlayerActions.StartPlayer;
}

export class StopPlayer implements Action {
  readonly type = EPlayerActions.StopPlayer;
}

export type PlayerActions = StopPlayer | StartPlayer | OpenPlayer | ClosePlayer;
