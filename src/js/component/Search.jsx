import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

export default function Search(props) {
    return (
        <List
            compId="search"
            buttonClassName="search-button"
            iconCode="&#x343b;"
            itemClassName="search-item"
            items={props.suggestions}
            handleInputChange={props.handleInputChange}
            handleSelect={props.handleSelect}
            inputValue={props.inputValue}
        />
    );
}

Search.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
};

Search.defaultProps = {
    inputValue: '',
};
