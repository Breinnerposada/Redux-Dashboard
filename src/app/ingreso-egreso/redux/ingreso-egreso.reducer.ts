import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egresos.model';
import { setItem, unSetItem } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState{
  ingresoEgreso: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItem, (state, { items }) => ({ ...state, items: [...items]})),
    on(unSetItem, (state) => ({ ...state, items: []})),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
