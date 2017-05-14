import React from 'react';
import PropTypes from 'prop-types';

export default function Progress(props) {
    return (
        <div id="progress">
            <span className="time-elapsed">{props.elapsed}</span>
            <span className="time-total">{props.total}</span>
            <progress value={props.position} max="1" />
        </div>
    );
}

Progress.propTypes = {
    elapsed: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
};
