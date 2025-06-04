insert into tiers
  (name, is_enabled, theme_color)
values
  ('Beginner', true, 'kiwi');

insert into levels
  (level_number, target_number, tier_id)
values
  (1, 8, 1);

insert into math_options
  (value, level_id)
values
  (-5, 1),
  (2, 1);

insert into grid_cells
  (grid_index, value, level_id)
values
  (7, 13, 1),
  (9, 6, 1);