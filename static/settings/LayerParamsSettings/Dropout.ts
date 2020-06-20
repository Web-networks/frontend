import { FormFieldSetting } from 'settings/LayerDependsSettings';

/* eslint-disable max-len */
export const DropoutParams: Record<string, FormFieldSetting> = {
    rate: {
        fieldType: 'input',
        type: 'number',
        required: true,
        label: 'Rate',
        clarification: 'Fraction of the input units to drop',
    },
    noise_shape: {
        fieldType: 'input',
        type: 'number',
        required: true,
        label: 'Noise shape',
        step: 0.1,
        min: 0,
        max: 1,
        clarification: '1D integer tensor representing the shape of the binary dropout mask that will be multiplied with the input',
    },
    seed: {
        fieldType: 'input',
        type: 'number',
        required: false,
        label: 'Seed',
        clarification: 'A Python integer to use as random seed',
    },
};
