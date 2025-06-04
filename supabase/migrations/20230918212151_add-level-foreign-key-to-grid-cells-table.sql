alter table "public"."grid_cells" add column "level_id" bigint;

alter table "public"."grid_cells" add constraint "grid_cells_level_id_fkey" FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE not valid;

alter table "public"."grid_cells" validate constraint "grid_cells_level_id_fkey";


