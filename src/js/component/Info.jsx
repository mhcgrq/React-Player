import React from 'react';
import PropTypes from 'prop-types';

export default function Info(props) {
    return (
        <div id="info">
            <img className="cover" src={props.cover} role="presentation" />
            <p className="title">{props.title}</p>
        </div>
    );
}

Info.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
};

Info.defaultProps = {
    cover: '/dist/img/bg.png',
};
