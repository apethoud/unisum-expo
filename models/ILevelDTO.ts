export interface ILevel {
  id: number;
  tier_id: number;
  level_number: number;
  target_number: number;
}

export interface IGridCell {
  id?: number;
  level_id?: number;
  grid_index: number;
  value: number | null;
  is_selected: boolean;
}

export interface IMathOption {
  id: number;
  level_id?: number;
  value: number;
  is_available: boolean;
}

export interface ILevelDTO extends ILevel {
  grid_cells: IGridCell[];
  math_options: IMathOption[];
}

export interface ITier {
  id: number;
  name: string;
  is_enabled: boolean;
  theme_color: string;
}
