import { IGridCell, IMathOption } from "./ILevelDTO";

export interface ILevelState {
  levelGrid: IGridCell[];
  mathOptions: IMathOption[];
}