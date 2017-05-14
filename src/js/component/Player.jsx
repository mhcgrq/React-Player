import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Player extends PureComponent {
    static propTypes = {
        loopState: PropTypes.func.isRequired,
        backward: PropTypes.func.isRequired,
        togglePlayState: PropTypes.func.isRequired,
        forward: PropTypes.func.isRequired,
        randomState: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            loop: '&#xe605;',
            backward: '&#xf0069;',
            play: '&#xe601;',
            forward: '&#xf006a;',
            random: '&#xe67c;',
            forwardClassName: 'iconfont',
            backwardClassName: 'iconfont',
            loopClassName: 'iconfont',
            randomClassName: 'iconfont',
            playClassName: 'iconfont',
        };
    }
    handleLoop = () => {
        if (this.state.loop === '&#xe605;') {
            this.setState({
                loop: '&#xe603;',
                loopClassName: 'iconfont active',
            });
        } else {
            this.setState({
                loop: '&#xe605;',
                loopClassName: 'iconfont',
            });
        }
    }
    handleBackwardMouseDown = () => {
        this.setState({ backwardClassName: 'iconfont active' });
    }
    handleBackwardMouseUp = () => {
        this.setState({ backwardClassName: 'iconfont' });
    }
    handlePlay = () => {
        if (this.state.play === '&#xe601;') {
            this.setState({ play: '&#xe600;' });
        } else {
            this.setState({ play: '&#xe601;' });
        }
    }
    handleForwardMouseDown = () => {
        this.setState({ forwardClassName: 'iconfont active' });
    }
    handleForwardMouseUp = () => {
        this.setState({ forwardClassName: 'iconfont' });
    }
    handleRandomClick = () => {
        if (this.state.randomClassName === 'iconfont active') {
            this.setState({ randomClassName: 'iconfont' });
        } else {
            this.setState({ randomClassName: 'iconfont active' });
        }
    }
    render() {
        return (
            <div id="player">
                <button className="loop" onClick={this.props.loopState}>
                    <i
                        className={this.state.loopClassName}
                        onClick={this.handleLoop}
                        dangerouslySetInnerHTML={{ __html: this.state.loop }}
                    />
                </button>
                <button className="backward" onClick={this.props.backward}>
                    <i
                        className={this.state.backwardClassName}
                        onMouseDown={this.handleBackwardMouseDown}
                        onMouseUp={this.handleBackwardMouseUp}
                        dangerouslySetInnerHTML={{ __html: this.state.backward }}
                    />
                </button>
                <button className="play" onClick={this.props.togglePlayState}>
                    <i
                        className="iconfont"
                        onClick={this.handlePlay}
                        dangerouslySetInnerHTML={{ __html: this.state.play }}
                    />
                </button>
                <button className="forward" onClick={this.props.forward}>
                    <i
                        className={this.state.forwardClassName}
                        onMouseDown={this.handleForwardMouseDown}
                        onMouseUp={this.handleForwardMouseUp}
                        dangerouslySetInnerHTML={{ __html: this.state.forward }}
                    />
                </button>
                <button className="random" onClick={this.props.randomState}>
                    <i
                        className={this.state.randomClassName}
                        onClick={this.handleRandomClick}
                        dangerouslySetInnerHTML={{ __html: this.state.random }}
                    />
                </button>
            </div>
        );
    }
}
