import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { LearnModelSettings } from 'settings/LearnModelSettings';
import { FormUIPropsT } from 'types/formTypes';
import { FieldComponents } from 'settings/controls';


import css from './LearnModelFormDeclaration.module.css';

interface LearnModelFormDeclarationProps extends FormUIPropsT {
    closeForm: () => void;
}


function LearnModelFormDeclarationComponent(props: LearnModelFormDeclarationProps): React.ReactElement {
    const { submitForm, closeForm, isReadyToSubmit } = props;
    return (
        <Form>
            {Object.keys(LearnModelSettings.input).map(paramName => {
                const setting = LearnModelSettings.input[paramName];
                const Control = FieldComponents[setting.fieldType];
                const fieldName = `input.${paramName}`;
                const { default: settingDefault, required, ...restProps } = setting;
                return (
                    <Control
                        key={fieldName}
                        fieldName={fieldName}
                        defaultValue={settingDefault}
                        isRequired={required}
                        {...restProps}
                    />
                );
            })}
            {Object.keys(LearnModelSettings.output).map(paramName => {
                const setting = LearnModelSettings.output[paramName];
                const Control = FieldComponents[setting.fieldType];
                const fieldName = `output.${paramName}`;
                const { default: settingDefault, required, ...restProps } = setting;
                return (
                    <Control
                        key={fieldName}
                        fieldName={fieldName}
                        defaultValue={settingDefault}
                        isRequired={required}
                        {...restProps}
                    />
                );
            })}
            <div className={css.buttons}>
                <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                <Button
                    variant='success'
                    onClick={submitForm}
                    disabled={!isReadyToSubmit}>{'Start learn'}</Button>
            </div>
        </Form>
    );
}

export const LearnModelFormDeclaration = createSpaForm(LearnModelFormDeclarationComponent);
