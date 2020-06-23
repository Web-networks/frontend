import { FormFieldSetting } from 'settings/types';
import { activations } from 'settings/LayerParamsSettings/Common';

/* eslint-disable max-len */
export const Conv2DParams: Record<string, FormFieldSetting> = {
    filters: {
        fieldType: 'input',
        type: 'number',
        label: 'Filters',
        clarification: 'Integer, the dimensionality of the output space',
        min: 1,
        required: true,
        // default: 1,
    },
    kernel_size: {
        fieldType: 'array',
        required: true,
        label: 'Kernel size',
        clarification: 'An integer or tuple/list of 2 integers, specifying the height and width of the 2D convolution window',
        length: 2,
        type: 'number',
        min: 1,
        // default: [3, 3],
    },
    padding: {
        fieldType: 'select',
        required: true,
        label: 'Padding',
        clarification: 'Padding is a special form of masking were the masked steps are at the start or at the beginning of a sequence',
        options: ['valid', 'same'],
    },
    activation: {
        fieldType: 'select',
        required: false,
        label: 'Activation function',
        clarification: 'If you don\'t specify anything, no activation is applied (ie. "linear" activation: a(x) = x)',
        options: activations,
    },
};
