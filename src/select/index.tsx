import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import * as $ from 'jquery'
import * as _ from 'lodash'
import * as module from './module'
import Input from '../../../input/src'
import {others} from '../../../../common/transmit-transparently/src'
import Option from '../option'
import OptionGroup from '../opt-group'
import './index.scss'

export default class Select extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()
    private handleDocumentClick: any
    private _isMounted: boolean
    private dom: any
    /**
     * 第一级选择显示的值,只有级联全路径时候使用
     */
    private firstLabelValue: string|number

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
    handleClick(value: number|string, label: string, children?: Array<module.Options>, zIndex: number = 1) {
        // 如果没有 children,说明是最后一级了
        if (!children) {
            let newValue = this.state.value
            let newCascader = this.state.cascader
            // 将此级后的所有级联元素删除
            let deleteEndNumber = newCascader.length - zIndex + 1
            while (deleteEndNumber > 0) {
                newCascader.pop()
                deleteEndNumber = deleteEndNumber - 1
            }

            if (zIndex === 1) {
                // 如果是第一级级联,才设置 state.value
                newValue = value
                this.firstLabelValue = label
            } else {
                // 否则设置级联元素对应项的value
                newCascader[zIndex - 2].value = value
                newCascader[zIndex - 2].labelValue = label
            }

            this.setState({
                cascader: newCascader
            })

            // 如果级联显示完整路径,修改 labelValue 的值
            let labelValue = label
            if (this.props.cascaderFull) {
                const labelValueArray = [this.firstLabelValue]
                this.state.cascader.forEach(item=> {
                    labelValueArray.push(item.labelValue)
                })
                labelValue = labelValueArray.join(' / ')
            }

            this.setState({
                open: false,
                value: newValue,
                labelValue: labelValue
            }, () => {
                if (this.props.cascaderFull) {
                    // 级联显示完整路径
                    const pathArray = [this.state.value]
                    this.state.cascader.forEach(item=> {
                        pathArray.push(item.value)
                    })
                    this.props.onChange(pathArray)
                } else {
                    this.props.onChange(value)
                }
            })
        } else {
            // 有 children,说明还有级联, zIndex 表示级联层级,最外层是 1,那么第一层级联就是 2
            let newCascader = this.state.cascader

            if (zIndex === 1) {
                // 如果是第一级级联,设置 state.value
                this.firstLabelValue = label
                this.setState({
                    value: value
                })
            } else {
                // 否则设置级联元素对应项的value
                let newCascader = this.state.cascader
                newCascader[zIndex - 2].value = value
                newCascader[zIndex - 2].labelValue = label
                this.setState({
                    cascader: newCascader
                })
            }

            // 因为点击选项,但后面还有,因此没点完,将labelValue设置为空
            this.setState({
                labelValue: ''
            })

            // 在级联后追加
            if (newCascader.length = zIndex - 1) {
                newCascader.push({
                    value: '',
                    options: children
                })
            } else {
                // 改写已有级联,删除后面的数组
                newCascader[zIndex - 1] = {
                    value: value,
                    options: children
                }
                // 先有级联层级比当前 zIndex 大多少,全都 pop 掉
                let deleteEndNumber = newCascader.length - zIndex
                while (deleteEndNumber > 0) {
                    newCascader.pop()
                    deleteEndNumber = deleteEndNumber - 1
                }
            }
            this.setState({
                cascader: newCascader
            })
        }
    }

    // 搜索框改变
    handleSearchChange(event: any) {
        this.setState({
            searchValue: event.target.value
        })
    }

    /**
     * 设置初始化labelValue
     */
    handleSetLabelValue(labelValue: string) {
        this.setState({
            labelValue: labelValue
        })
    }

    getOptionChildren() {
        let chosenDropStyle = {
            display: this.state.open ? null : 'none',
            left: 0
        }

        // 循环子元素,同时获取value,同时判断search
        let Children = React.Children.map(this.props['children'], (item: React.ReactElement<any>, index: number) => {
            let active = false
            if (item.props.value === this.state.value) {
                active = true
            }

            if (_.isArray(item.props.children)) {
                item.props.children.map((childItem: React.ReactElement<any>) => {
                    if (childItem.props.value === this.state.value) {
                        active = true
                    }
                })
            }

            return React.cloneElement(item, {
                onClick: this.handleClick.bind(this),
                key: index,
                active: active,
                setLabelValue: this.handleSetLabelValue.bind(this),
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

        return (
            <div id="j-chosen"
                 className="chosen-drop"
                 style={chosenDropStyle}>
                {Search}
                <ul className="chosen-results">
                    {Children}
                </ul>
            </div>
        )
    }

    getOptionChildrenByOptions() {
        let chosenDropStyle = {
            display: this.state.open ? null : 'none',
            left: 0
        }

        let OptionChildren = this.props.options.map((item, index)=> {
            return this.getOptionItemByType(item, index, this.state.value, 1)
        })

        // 追加渲染级联元素
        const CascaderChildrens = this.state.cascader.map((item, index)=> {
            const options = item.options.map((childrenItem, childrenItemIndex)=> {
                return this.getOptionItemByType(childrenItem, childrenItemIndex, item.value, index + 2)
            })
            return (
                <ul key={index}
                    className="chosen-results">
                    {options}
                </ul>
            )
        })

        return (
            <div id="j-chosen"
                 className="chosen-drop"
                 style={chosenDropStyle}>

                <div className="flex-option-container">
                    <ul className="chosen-results">
                        {OptionChildren}
                    </ul>
                    {CascaderChildrens}
                </div>
            </div>
        )
    }

    /**
     * 根据一个 Option 元素类型返回对应ReactElement
     */
    getOptionItemByType(item: module.Options, key: number, activeValue: string|number, zIndex: number = 1): React.ReactElement<any> {
        if (item.groupValue) {
            // 是一个分组
            const GroupChildren = item.children.map((item, index)=> {
                return this.getOptionItemByType(item, index, activeValue, zIndex)
            })
            return (
                <OptionGroup key={key}
                             ignoreChildren={true}
                             label={item.groupValue}>{GroupChildren}</OptionGroup>
            )
        }

        // option 元素
        let active = false
        if (item.key === activeValue) {
            active = true
        }

        return (
            <Option key={key}
                    value={item.key}
                    onClick={this.handleClick.bind(this)}
                    active={active}
                    zIndex={zIndex}
                    optChildren={item.children}
                    setLabelValue={this.handleSetLabelValue.bind(this)}
                    activeValue={this.state.value}
                    searchValue={this.state.searchValue}>{item.value}</Option>
        )
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

        let renderChosen: React.ReactElement<any>
        if (this.props.options.length === 0) {
            renderChosen = this.getOptionChildren.call(this)
        } else {
            renderChosen = this.getOptionChildrenByOptions.call(this)
        }

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
                value={this.state.labelValue}
                rightRender={this.dropIconRender.bind(this)}
                innerRender={renderChosen}/>
        )
    }
}