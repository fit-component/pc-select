import * as React from 'react'

export interface PropsInterface {
    /**
     * 选择后的回调
     * @param value
     */
    onChange?: (value?: number | string) => void

    /**
     * 是否可筛选
     */
    search?: boolean

    /**
     * 极简模式,适合在文本中做选择框
     */
    simple?: boolean

    /**
     * 选择值
     */
    value?: number | string

    /**
     * 初始值
     */
    defaultValue?: number | string

    [x: string]: any
}

export class Props implements PropsInterface {
    onChange = () => {
    }
    search = false
    simple = false
    value = ''
    defaultValue = ''

}

export interface StateInterface {
    open?: boolean
    value?: number | string
    searchValue?: number | string
}

export class State implements StateInterface {
    open = false
    searchValue = ''
}