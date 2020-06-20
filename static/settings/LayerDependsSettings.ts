import { DenseParams } from 'settings/LayerParamsSettings/Dense';
import { DropoutParams } from 'settings/LayerParamsSettings/Dropout';

export type LayerType = 'Dense'
| 'Dropout';
/* | 'Activation'
| 'Dropout'
| 'Conv1D'
| 'Conv2D'
| 'MaxPooling1D'
| 'MaxPooling2D'
| 'AveragePooling1D'
| 'AveragePooling2D'
| 'SimpleRnn'
| 'LSTM'
| 'Embedding'
| 'BatchNormalization'; */

export type FieldType = 'select' | 'string' | 'number' | 'boolean';

export interface FormFieldSetting {
    fieldType: FieldType;
    required: boolean;
    label: string;
    clarification?: string;
    options?: string[];
    default?: boolean | string;

    step?: number;
    min?: number;
    max?: number;
}

type LayerDependsSettings = Record<LayerType, Record<string, FormFieldSetting>>;

export const LayerDependsSettings: LayerDependsSettings = {
    Dense: DenseParams,
    Dropout: DropoutParams,
};
