import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import './index.scss'

export default class OptGroup extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    handleOptionClick(value: number|string, label: string) {
        this.props['onClick'](value, label)
    }

    setLabelValue(labelValue: string) {
        this.props['setLabelValue'](labelValue)
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        // 循环子元素
        let Children: React.ReactNode = this.props.children

        if (!this.props.ignoreChildren) {
            Children = React.Children.map(this.props['children'], (item: React.ReactElement<any>, index: number)=> {
                let active = false
                if (item.props.value === this.props['activeValue']) {
                    active = true
                }

                return React.cloneElement(item, Object.assign({}, item.props, {
                    onClick: this.handleOptionClick.bind(this),
                    key: index,
                    active: active,
                    setLabelValue: this.setLabelValue.bind(this),
                    activeValue: this.props['activeValue'],
                    searchValue: this.props['searchValue']
                }))
            })
        }

        return (
            <div className={classes}>
                <li className="group-result">{this.props.label}</li>
                {Children}
            </div>
        )
    }
}