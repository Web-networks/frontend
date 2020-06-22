import { FormFieldSetting } from 'settings/types';

/* eslint-disable max-len */
export const MaxPool2DParams: Record<string, FormFieldSetting> = {
    pool_size: {
        fieldType: 'array',
        required: true,
        label: 'Pool size',
        clarification: 'Downsamples the input representation by taking the maximum value over the window defined by pool_size for each dimension along the features axis',
        length: 2,
        min: 1,
        type: 'number',
        // default: [2, 2],
    },
    strides: {
        fieldType: 'array',
        required: true,
        label: 'Strides',
        clarification: 'The window is shifted by strides in each dimension',
        length: 2,
        min: 1,
        type: 'number',
        // default: [2, 2],
    },
};
