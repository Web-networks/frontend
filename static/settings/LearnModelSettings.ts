import { FormFieldSetting } from 'settings/types';

type GroupT = 'input' | 'output';
type LearnModelSettingsT = Record<GroupT, Record<string, FormFieldSetting>>;

export const LearnModelSettings: LearnModelSettingsT = {
    input: {
        type: {
            fieldType: 'select',
            label: 'Datasets type',
            options: ['builtin_dataset'],
            required: true,
            clarification: 'Type of dataset',
        },
        dataset: {
            fieldType: 'select',
            label: 'Dataset',
            options: ['mnist'],
            required: true,
            clarification: 'Choose dataset for learning process',
        },
        dimensions: {
            fieldType: 'array',
            label: 'Dimensions',
            length: 2,
            type: 'number',
            min: 0,
            required: true,
            clarification: 'Input dimensions',
        },
        channels: {
            fieldType: 'input',
            label: 'Number of channels',
            length: 2,
            type: 'number',
            min: 1,
            max: 3,
            required: true,
            clarification: 'Image channels',
        },
    },
    output: {
        type: {
            fieldType: 'select',
            label: 'Output type',
            options: ['integer'],
            required: true,
            clarification: 'Type of output result',
        },
        range: {
            fieldType: 'array',
            label: 'Range',
            length: 2,
            type: 'number',
            required: true,
            clarification: 'Output range answer',
        },
    },
};
