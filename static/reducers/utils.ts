import { StateFieldKeyT, ApplicationStateT } from 'types';
import { UpdateStateDataActionT } from 'actions/formActions';

export function updateStateDataField<T extends StateFieldKeyT>(stateField: T) {
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
