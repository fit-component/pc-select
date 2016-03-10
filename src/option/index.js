import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import './index.scss'

const reg = (input)=> {
    let flags = 'g'
    return new RegExp(input, flags)
}

export default class Option extends React.Component {
    handleClick() {
        if (this.props.disabled)return
        this.props.onClick(this.props.value)
    }

    render() {
        const {className, active, disabled, searchValue, children, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            'active-result': true,
            'group-option': true,
            'active': active,
            'disabled': disabled,
            [className]: className
        })

        if (!_.isEmpty(searchValue)) {
            let regex = reg(searchValue)
            if (regex.test(children)) {
                let matchedString = children.replace(regex, '<span class="active">' + searchValue + '</span>')
                return (
                    <li onClick={this.handleClick.bind(this)}
                        {...others}
                        className={classes}
                        dangerouslySetInnerHTML={{__html: matchedString}}></li>
                )
            } else {
                return null
            }
        }

        return (
            <li {...others} onClick={this.handleClick.bind(this)}
                            className={classes}>{this.props.children}</li>
        )
    }
}

Option.defaultProps = {
    // @desc 是否处于激活状态
    active: false,

    // @desc 当前查询的值
    searchValue: '',

    // @desc 是否禁用
    disabled: false
}