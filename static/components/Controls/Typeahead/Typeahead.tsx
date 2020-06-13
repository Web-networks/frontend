import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

import { TextInputForSuggest } from 'components/Controls/TextInputForSuggest/TextInputForSuggest';

import css from './Typeahead.module.css';

type AutosuggestProps = React.ComponentProps<typeof Autosuggest>;
type TextInputForSuggestProps = React.ComponentProps<typeof TextInputForSuggest>;

interface TypeaheadProps extends Omit<TextInputForSuggestProps, 'onChange'>, PopupContainerExtendProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export function Typeahead(props: TypeaheadProps): React.ReactElement {
    const { options, value, onChange, maxSuggestHeight, ...restInputProps } = props;
    const [suggestions, setSuggestions] = React.useState<string[]>(options);
    const [inputValue, setInputValue] = React.useState<string>(value || '');
    const [fieldRef, setFieldRef] = React.useState<HTMLDivElement | null>(null);
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
            maxSuggestHeight={maxSuggestHeight}
        >{children}</PopupContainer>,
    [fieldRef]);
    type InputProps = AutosuggestProps['inputProps'] & TextInputForSuggestProps;
    const inputProps: InputProps = {
        onChange: onInputChange,
        value: inputValue,
        inputRef: setFieldRef,
        ...restInputProps,
    };
    return (
        <div className={css.root}>
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

interface PopupContainerInjectedProps {
    containerProps: any;
    children: React.ReactNode;
    anchor: HTMLDivElement;
}

interface PopupContainerExtendProps {
    maxSuggestHeight?: number;
}

type PopupContainerProps = PopupContainerInjectedProps & PopupContainerExtendProps;

function PopupContainer(props: PopupContainerProps) {
    const { children, containerProps, anchor, maxSuggestHeight } = props;
    const domNode = document.body;
    const anchorWidth = getComputedStyle(anchor).width;
    const position = anchor.getBoundingClientRect();
    const suggestMaxHeight = maxSuggestHeight || 400;
    const stylesForPopup = {
        top: position.bottom + 'px',
        left: position.left + 'px',
        width: anchorWidth,
        'max-height': suggestMaxHeight + 'px',
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
