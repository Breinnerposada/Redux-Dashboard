import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "../../models/ingreso-egresos.model";

export const setItem = createAction(
  '[ingresoEgreso] setItem',
  props<{items: IngresoEgreso[]}>()
);
export const unSetItem = createAction(
  '[ingresoEgreso] unSetItem'
);
