import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as IE from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui: ui.State,
   auth: auth.State,
   ingresoEngreso: IE.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
   ingresoEngreso: IE.ingresoEgresoReducer
}
