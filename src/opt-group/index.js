import React from 'react'
import classNames from 'classnames'

export default class OptGroup extends React.Component {
    render() {
        const {className, children, value, activeValue, onClick, searchValue, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            'mobile': true,
            'phone': true,
            [className]: className
        })

        // 循环子元素
        let Children = React.Children.map(children, (item, index)=> {
            let active = false
            if (item.props.value === activeValue) {
                active = true
            }

            return React.cloneElement(item, Object.assign({}, item.props, {
                onClick: onClick,
                key: index,
                active: active,
                searchValue: searchValue
            }))
        })

        return (
            <div {...others} className={classes}>
                <li className="group-result">{this.props.label}</li>
                {Children}
            </div>
        )
    }
}

OptGroup.defaultProps = {
    // @desc 样式
    style: {},

    // @desc 查询值
    searchValue: ''
}