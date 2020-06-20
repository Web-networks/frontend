import { DenseParams } from 'settings/LayerParamsSettings/Dense';
import { DropoutParams } from 'settings/LayerParamsSettings/Dropout';
import { Conv2DParams } from 'settings/LayerParamsSettings/Conv2D';
import { MaxPool2DParams } from 'settings/LayerParamsSettings/MaxPool2D';

export type LayerType = 'Dense'
| 'Dropout'
| 'Conv2D'
| 'Flatten'
| 'MaxPooling2D';
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

export type FieldType = 'select' | 'input' | 'boolean' | 'array';

export interface FormFieldSetting {
    fieldType: FieldType;
    required: boolean;
    label: string;
    clarification?: string;
    options?: string[];
    default?: any;

    // input type
    type?: string;

    // for number field
    step?: number;
    min?: number;
    max?: number;

    // for array of numbers field
    length?: number;
}

type LayerDependsSettings = Record<LayerType, Record<string, FormFieldSetting>>;

export const LayerDependsSettings: LayerDependsSettings = {
    Dense: DenseParams,
    Dropout: DropoutParams,
    Conv2D: Conv2DParams,
    Flatten: {},
    MaxPooling2D: MaxPool2DParams,
};
