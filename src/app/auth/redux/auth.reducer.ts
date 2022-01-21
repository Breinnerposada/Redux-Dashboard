import { createReducer, on } from '@ngrx/store';
import { User as usuario} from '../../models/user.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user : usuario;
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(unSetUser, () => ({ user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
