import { FormFieldSetting } from 'settings/LayerDependsSettings';
import {
    activations,
    initializers,
    regularizers,
    constraints,
} from 'settings/LayerParamsSettings/Common';

export const DenseParams: Record<string, FormFieldSetting> = {
    units: {
        fieldType: 'input',
        required: true,
        label: 'Units',
        clarification: 'Positive integer, dimensionality of the output space',
        type: 'number',
    },
    activation: {
        fieldType: 'select',
        required: true,
        label: 'Activation function',
        clarification: 'If you don\'t specify anything, no activation is applied (ie. "linear" activation: a(x) = x)',
        options: activations,
    },
    use_bias: {
        fieldType: 'boolean',
        required: false,
        label: 'Use bias',
        clarification: 'Boolean, whether the layer uses a bias vector',
        default: false,
    },
    kernel_initializer: {
        fieldType: 'select',
        required: false,
        label: 'Kernel initializer',
        clarification: 'Initializer for the kernel weights matrix',
        options: initializers,
    },
    bias_regularizer: {
        fieldType: 'select',
        required: false,
        label: 'Bias regularizer',
        clarification: 'Regularizer function applied to the bias vector',
        options: regularizers,
    },
    activity_regularizer: {
        fieldType: 'select',
        required: false,
        label: 'Activity regularizer',
        clarification: 'Regularizer function applied to the output of the layer (its "activation")',
        options: regularizers,
    },
    kernel_constraint: {
        fieldType: 'select',
        required: false,
        label: 'Kernel constraint',
        clarification: 'Constraint function applied to the kernel weights matrix',
        options: constraints,
    },
    bias_constraint: {
        fieldType: 'select',
        required: false,
        label: 'Bias constraint',
        clarification: 'Constraint function applied to the bias vector',
        options: constraints,
    },
};
