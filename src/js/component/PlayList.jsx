import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

export default function PlayList(props) {
    const items = props.suggestions.length === 0
        ? props.playList
        : props.suggestions;
    return (
        <List
            compId="playlist"
            buttonClassName="playlist-button"
            iconCode="&#xe790;"
            itemClassName="playlist-item"
            items={items}
            handleInputChange={props.handleInputChange}
            handleSelect={props.handleSelect}
            inputValue={props.inputValue}
            placeholder="查找"
        />
    );
}

PlayList.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })),
    handleInputChange: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
    playList: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    })).isRequired,
};

PlayList.defaultProps = {
    suggestions: [],
    inputValue: '',
};
