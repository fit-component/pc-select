import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import $ from 'jquery'
import _ from 'lodash'
import './index.scss'
import './chosen.scss'

export default class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open       : false,
            value      : this.props.value || this.props.defaultValue,
            searchValue: ''
        }

        // 点击document
        this.handleDocumentClick = (event)=> {
            if (!this._isMounted)return
            if (!$.contains(this.dom, event.target)) {
                this.setState({
                    open: false
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.dom = ReactDOM.findDOMNode(this)
        $(document).on('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        this._isMounted = false
        $(document).off('click', this.handleDocumentClick)
    }

    // 选择框点击
    handleSelectClick() {
        this.setState({
            open: !this.state.open
        }, ()=> {
            if (this.state.open) {
                $(this.dom).find('#j-search').focus()
            }
        })
    }

    // 选择栏目点击
    handleClick(value) {
        this.setState({
            open : false,
            value: value
        }, ()=> {
            this.props.onChange(value)
        })
    }

    // 搜索框改变
    handleSearchChange(event) {
        this.setState({
            searchValue: event.target.value
        })
    }

    render() {
        const {className, width, search, placeholder, children, simple, label, labelWidth, addonLeft, addonRight, ...others} = this.props
        const classes = classNames({
            '_namespace'    : true,
            'form-container': !_.isEmpty(label),
            'form-inline'   : !_.isEmpty(addonLeft) || !_.isEmpty(addonRight),
            [className]     : className
        })

        let chosenDropStyle = {
            display: this.state.open ? null : 'none',
            left   : 0,
            width  : width
        }

        let chosenSingleClass = classNames({
            'chosen-single': true,
            'active'       : this.state.open
        })

        // 搜索框
        let Search = null
        if (search === true) {
            Search = (
                <div className="chosen-search">
                    <input id="j-search"
                           className="form-control search-input"
                           type="text"
                           value={this.state.searchValue}
                           autoComplete="off"
                           placeholder={placeholder}
                           onChange={this.handleSearchChange.bind(this)}/>
                </div>
            )
        }

        // 循环子元素,同时获取value,同时判断search
        let valueLabel = ""
        let Children = React.Children.map(children, (item, index)=> {
            let active = false
            if (item.props.value === this.state.value) {
                valueLabel = item.props.children
                active = true
            }

            if (_.isArray(item.props.children)) {
                item.props.children.map((childItem)=> {
                    if (childItem.props.value === this.state.value) {
                        valueLabel = childItem.props.children
                        active = true
                    }
                })
            }

            return React.cloneElement(item, {
                onClick    : this.handleClick.bind(this),
                key        : index,
                active     : active,
                activeValue: this.state.value,
                searchValue: this.state.searchValue
            })
        })

        let chosenContainerClass = classNames({
            'chosen-container'       : true,
            'chosen-container-single': true,
            'simple'                 : simple
        })

        others.style = others.style || {}
        others.style.width = others.style.width || width

        let SelectContent = (
            <div>
                <div className={chosenContainerClass}
                     style={{width:simple?null:width}}>
                    <a className={chosenSingleClass}
                       tabIndex="-1"
                       onClick={this.handleSelectClick.bind(this)}><span>{valueLabel}</span>
                        <div><b></b></div>
                    </a>

                    <div id="j-chosen"
                         className="chosen-drop"
                         style={chosenDropStyle}>
                        {Search ? Search : null}
                        <ul className="chosen-results">
                            {Children}
                        </ul>
                    </div>
                </div>
            </div>
        )

        if (!_.isEmpty(label)) {
            return (
                <div {...others}
                    className={classes}>
                    <label style={{width:labelWidth||null,marginRight:10}}>{label}</label>
                    {SelectContent}
                </div>
            )
        }

        if (!_.isEmpty(addonLeft) || !_.isEmpty(addonRight)) {
            return (
                <form {...others}
                    className={classes}>
                    <div className="form-group">
                        <div className="input-group">
                            {_.isEmpty(addonLeft) ? null :
                                <div className="input-group-addon">{addonLeft}</div>}
                            {SelectContent}
                            {_.isEmpty(addonRight) ? null :
                                <div className="input-group-addon">{addonRight}</div>}
                        </div>
                    </div>
                </form>
            )
        }

        return SelectContent
    }
}

Select.defaultProps = {
    // @desc 宽度
    width: 200,

    // @desc 选择后的回调
    onChange: (value)=> {
    },

    // @desc 是否可筛选
    search: false,

    // @desc 极简模式,适合在文本中做选择框
    simple: false,

    // @desc 值
    value: null,

    // @desc 初始值
    defaultValue: null
}