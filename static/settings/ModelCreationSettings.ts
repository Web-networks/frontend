/* eslint-disable max-len */

interface ModelCreationSettingsT {
    [fieldName: string]: {
        fieldType: 'typeahead';
        required: boolean;
        label: string;
        clarification?: string;
        options: string[];
    };
}

export const ModelCreationSettings: ModelCreationSettingsT = {
    loss: {
        fieldType: 'typeahead',
        required: true,
        label: 'Loss function',
        clarification: 'The purpose of loss functions is to compute the quantity that a model should seek to minimize during training.',
        options: [
            'mean_squared_error',
            'mean_absolute_error',
            'mean_absolute_percentage_error',
            'mean_squared_logarithmic_error',
            'squared_hinge',
            'hinge',
            'categorical_hinge',
            'logcosh',
            'huber_loss',
            'categorical_crossentropy',
            'sparse_categorical_crossentropy',
            'binary_crossentropy',
            'kullback_leebler_divergence',
            'poisson',
            'cosine_proximity',
            'is_categorical_crossentropy',
        ],
    },
    optimizer: {
        fieldType: 'typeahead',
        required: true,
        label: 'Optimizer function',
        clarification: 'Optimizers update the weight parameters to minimize the loss function.',
        options: [
            'sgd',
            'RMSprop',
            'Adagrad',
            'Adadelta',
            'Adam',
            'Adamax',
            'Nadam',
        ],
    },
    metrics: {
        fieldType: 'typeahead',
        required: true,
        label: 'Metrics function',
        clarification: 'A metric is a function that is used to judge the performance of your model.',
        options: [
            'accuracy',
            'binary_accuracy',
            'categorical_accuracy',
            'sparse_categorical_accuracy',
            'top_k_categorical_accuracy',
            'sparse_top_k_categorical_accuracy',
            'cosine_proximity',
            'clone_metrics',
        ],
    },
};
