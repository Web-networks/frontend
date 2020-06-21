export const initializers = [
    'RandomNormal',
    'RandomUniform',
    'TruncatedNormal',
    'Zeros',
    'Ones',
    'GlorotNormal',
    'GlorotUniform',
    'Identity',
    'Orthogonal',
    'Constant',
    'VarianceScaling',
];

export const activations = [
    'relu',
    'sigmoid',
    'softmax',
    'softplus',
    'softsign',
    'tanh',
    'selu',
    'elu',
    'exponential',
];

export const regularizers = [
    'L1',
    'L2',
    'l1_l2',
];

export const constraints = [
    'MaxNorm',
    'MinMaxNorm',
    'NonNeg',
    'UnitNorm',
    'RadialConstraint',
];

export const padding = [
    'valid',
    'same',
];
