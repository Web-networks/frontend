import { StateFieldKeyT, ApplicationStateT } from 'types';
import { UpdateStateDataActionT } from 'actions/formActions';
import { FetchableActionT, FailureFetchActionT, SuccesFetchActionT } from 'actions/utils';
import { StateFieldT } from 'types/utilityTypes';

export function updateStateDataFieldReducer<T extends StateFieldKeyT>(stateField: T) {
    return (state: ApplicationStateT[T], action: UpdateStateDataActionT<T>): ApplicationStateT[T] => {
        const { stateField: actionField, data } = action.payload;
        if (actionField !== stateField) {
            return state;
        }
        return {
            ...state,
            data: {
                ...state.data,
                ...data,
            },
        };
    };
}

export function getFetchReducers(actionType: FetchableActionT) {
    return {
        [actionType.REQUEST_START]: (state: StateFieldT) => ({
            ...state,
            pending: true,
        }),

        [actionType.REQUEST_FAILURE]: (state: StateFieldT, action: FailureFetchActionT) => {
            const { message } = action.payload;
            return {
                ...state,
                error: message,
            };
        },

        [actionType.REQUEST_SUCCESS]: (state: StateFieldT, action: SuccesFetchActionT) => {
            const { body } = action.payload;
            return {
                ...state,
                data: body,
            };
        },

        [actionType.REQUEST_END]: (state: StateFieldT) => ({
            ...state,
            pending: false,
        }),
    };
}
