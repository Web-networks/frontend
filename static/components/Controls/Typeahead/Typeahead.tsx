import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

import { TextInputForSuggest } from 'components/Controls/TextInputForSuggest/TextInputForSuggest';

import css from './Typeahead.module.css';

interface TypeaheadProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

type AutosuggestProps = React.ComponentProps<typeof Autosuggest>;
type TextInputForSuggestProps = React.ComponentProps<typeof TextInputForSuggest>;

export function Typeahead(props: TypeaheadProps): React.ReactElement {
    const { options, value, onChange, label, placeholder } = props;
    const [suggestions, setSuggestions] = React.useState<string[]>(options);
    const [inputValue, setInputValue] = React.useState<string>(value || '');
    const [fieldRef, setFieldRef] = React.useState<HTMLDivElement | null>(null);
    // React.useEffect(() => { setInputValue(value); }, [value]);
    const onInputChange = React.useCallback((_, { newValue }) => {
        setInputValue(newValue);
    }, [setInputValue]);
    const onSuggestionSelected = React.useCallback((_, { suggestion }) => {
        onChange(suggestion);
    }, [onChange]);
    const onSuggestionsFetchRequested = React.useCallback<AutosuggestProps['onSuggestionsFetchRequested']>(
        ({ value }) => setSuggestions(options.filter(str => str.includes(value))), [options],
    );
    const shouldRenderSuggestions = React.useCallback(() => true, []);
    const onSuggestionsClearRequested = React.useCallback(() => [], []);
    const getSuggestionValue = React.useCallback(suggestion => suggestion, []);
    const renderSuggestionsContainer = React.useCallback(({ containerProps, children }) =>
        fieldRef && <PopupContainer
            anchor={fieldRef}
            containerProps={containerProps}
        >{children}</PopupContainer>,
    [fieldRef]);
    type InputProps = AutosuggestProps['inputProps'] & TextInputForSuggestProps;
    const inputProps: InputProps = {
        onChange: onInputChange,
        value: inputValue,
        label,
        placeholder,
    };
    return (
        <div
            className={css.root}
            ref={setFieldRef}
        >
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                inputProps={inputProps}
                shouldRenderSuggestions={shouldRenderSuggestions}
                renderSuggestionsContainer={renderSuggestionsContainer}
                renderSuggestion={OptionItem}
                renderInputComponent={TextInputForSuggest}
                onSuggestionSelected={onSuggestionSelected}
            />
        </div>
    );
}

interface PopupContainerProps {
    containerProps: any;
    children: React.ReactNode;
    anchor: HTMLDivElement;
}

function PopupContainer(props: PopupContainerProps) {
    const { children, containerProps, anchor } = props;
    const domNode = document.body;
    const anchorWidth = getComputedStyle(anchor).width;
    const position = anchor.getBoundingClientRect();
    const stylesForPopup = {
        top: position.bottom + 'px',
        left: position.left + 'px',
        width: anchorWidth,
    };
    return ReactDOM.createPortal(
        <div {...containerProps} className={classnames(css.popup, 'popup')} style={stylesForPopup}>
            {children}
        </div>,
        domNode,
    );
}

function OptionItem(suggestion: string, { isHighlighted }: { isHighlighted: boolean }) {
    return (
        <div className={classnames(css.selectItem, { [css.highlighted]: isHighlighted })}>{suggestion}</div>
    );
}
