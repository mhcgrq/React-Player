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
            isWrapperActive: false,
            isIconActive: false,
        };
    }
    componentDidMount() {
        window.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
    }
    handleIconMouseDown = () => {
        if (!this.state.isWrapperActive) {
            this.setState({ isIconActive: true });
        }
    }
    handleIconMouseUp = () => {
        if (!this.state.compClassName) {
            this.setState({ isIconActive: false });
        }
    }
    handleLiMouseDown = (e) => {
        e.target.className = 'active';
    }
    handleLiMouseUp = (e) => {
        e.target.className = '';
        this.setState({
            isWrapperActive: false,
        });
    }
    handleClick = (e) => {
        const wrapper = document.querySelector(`#${this.props.compId}`);
        const thisNodeChildren = Array.prototype.slice.call(wrapper.querySelectorAll('*'));
        if (thisNodeChildren.indexOf(e.target) === -1 && e.target !== wrapper) {
            this.setState({ isWrapperActive: false });
        }
    }
    toggleWrapperActive = () => {
        this.toggleState('isWrapperActive');
    }
    toggleIconActive = () => {
        this.toggleState('isIconActive');
    }
    toggleState = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        return (
            <div
                id={this.props.compId}
                className={`list ${this.state.isWrapperActive ? 'active' : ''}`}
            >
                <button className={`${this.props.buttonClassName} list-button`} onClick={this.toggleWrapperActive}>
                    <i
                        onMouseDown={this.toggleIconActive}
                        onMouseUp={this.toggleIconActive}
                        className={`iconfont ${this.state.isIconActive ? 'active' : ''}`}
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
