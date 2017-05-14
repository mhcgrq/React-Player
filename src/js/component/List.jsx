import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class List extends PureComponent {
    static propTypes = {
        compId: PropTypes.string.isRequired,
        buttonClassName: PropTypes.string.isRequired,
        iconCode: PropTypes.string.isRequired,
        itemClassName: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
        })).isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleSelect: PropTypes.func.isRequired,
        inputValue: PropTypes.string,
        placeholder: PropTypes.string,
    };
    static defaultProps = {
        inputValue: '',
        placeholder: '',
    };
    constructor(props) {
        super(props);
        this.state = {
            compClassName: 'list',
            iconClassName: 'iconfont',
        };
    }
    componentDidMount() {
        window.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
    }
    handleButtonClick = () => {
        if (this.state.compClassName === 'list') {
            this.setState({
                compClassName: 'list active',
            });
        } else {
            this.setState({
                compClassName: 'list',
            });
        }
    }
    handleIconMouseDown = () => {
        if (this.state.compClassName === '') {
            this.setState({ iconClassName: 'iconfont active' });
        }
    }
    handleIconMouseUp = () => {
        if (this.state.compClassName === '') {
            this.setState({ iconClassName: 'iconfont' });
        }
    }
    handleLiMouseDown = (e) => {
        e.target.className = 'active';
    }
    handleLiMouseUp = (e) => {
        e.target.className = '';
        this.setState({
            compClassName: 'list',
        });
    }
    handleClick = (e) => {
        const thisNodeChildren = Array.prototype.slice.call(this.wrapper.querySelectorAll('*'));
        if (thisNodeChildren.indexOf(e.target) === -1 && e.target !== this.wrapper) {
            this.setState({ compClassName: 'list' });
        }
    }
    render() {
        return (
            <div
                id={this.props.compId}
                className={this.state.compClassName}
                ref={(ref) => { this.wrapper = ref; }}
            >
                <button className={this.props.buttonClassName + ' list-button'} onClick={this.handleButtonClick}>
                    <i
                        onMouseDown={this.handleIconMouseDown}
                        onMouseUp={this.handleIconMouseUp}
                        className={this.state.iconClassName}
                        dangerouslySetInnerHTML={{ __html: this.props.iconCode }}
                    />
                </button>
                <input
                    value={this.props.inputValue}
                    type="text"
                    onChange={this.props.handleInputChange}
                    placeholder={this.props.placeholder}
                />
                <ul id={this.props.itemClassName} className="list-item" onClick={this.props.handleSelect}>
                    {
                        this.props.items.map(item => (
                            <li
                                key={item.title}
                                onMouseDown={this.handleLiMouseDown}
                                onMouseUp={this.handleLiMouseUp}
                            >
                                {item.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
