import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import * as $ from 'jquery'
import * as _ from 'lodash'
import * as module from './module'
import Input from '../../../input/src'
import {others} from '../../../../common/transmit-transparently/src'
import './index.scss'

export default class Select extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()
    private handleDocumentClick: any
    private _isMounted: boolean
    private dom: any

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            value: this.props.value !== '' ? this.props.value : this.props.defaultValue
        })

        // 点击document
        this.handleDocumentClick = (event: any) => {
            if (!this._isMounted) return
            if (!$.contains(this.dom, event.target)) {
                this.setState({
                    open: false
                })
            }
        }
    }

    componentWillReceiveProps(nextProps: module.PropsInterface) {
        if ('value' in nextProps && nextProps.value !== null) {
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
        }, () => {
            if (this.state.open) {
                $(this.dom).find('#j-search').focus()
            }
        })
    }

    // 选择栏目点击
    handleClick(value: number|string) {
        this.setState({
            open: false,
            value: value
        }, () => {
            this.props.onChange(value)
        })
    }

    // 搜索框改变
    handleSearchChange(event: any) {
        this.setState({
            searchValue: event.target.value
        })
    }

    innerRender() {
        let chosenDropStyle = {
            display: this.state.open ? null : 'none',
            left: 0
        }

        // 循环子元素,同时获取value,同时判断search
        let valueLabel = ""
        let Children = React.Children.map(this.props['children'], (item: React.ReactElement<any>, index: number) => {
            let active = false
            if (item.props.value === this.state.value) {
                valueLabel = item.props.children
                active = true
            }

            if (_.isArray(item.props.children)) {
                item.props.children.map((childItem: React.ReactElement<any>) => {
                    if (childItem.props.value === this.state.value) {
                        valueLabel = childItem.props.children
                        active = true
                    }
                })
            }

            return React.cloneElement(item, {
                onClick: this.handleClick.bind(this),
                key: index,
                active: active,
                activeValue: this.state.value,
                searchValue: this.state.searchValue
            })
        })

        // 搜索框
        let Search: React.ReactElement<any> = null
        if (this.props.search) {
            Search = (
                <div className="chosen-search">
                    <Input id="j-search"
                           className="search-input"
                           label=""
                           placeholder="搜索.."
                           autoComplete="off"
                           onChange={this.handleSearchChange.bind(this) }/>
                </div>
            )
        }

        return {
            renderChosen: (
                <div id="j-chosen"
                     className="chosen-drop"
                     style={chosenDropStyle}>
                    {Search ? Search : null}
                    <ul className="chosen-results">
                        {Children}
                    </ul>
                </div>
            ),
            label: valueLabel
        }
    }

    dropIconRender() {
        return <i className="fit-select-drop"/>
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className'],
            'simple': this.props.simple
        })

        const {renderChosen, label} = this.innerRender.call(this)

        let extProps: any = {}

        // 给精简模式用的额外字段
        if (this.props.simple) {
            extProps.label = ''
            extProps.placeholder = ''
        }

        // 给搜索模式用的额外字段
        if (this.props.search) {
            extProps.highlightLine = false
        }

        return (
            <Input {...others(new module.Props(), this.props, ['children']) }
                {...extProps}
                onClick={this.handleSelectClick.bind(this) }
                className={classes}
                value={label}
                rightRender={this.dropIconRender.bind(this)}
                innerRender={renderChosen}/>
        )
    }
}