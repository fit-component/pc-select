import * as React from 'react'

/**
 * 配置项
 */
export interface Options {
    /**
     * 值
     */
    key: number|string,

    /**
     * 显示字符串
     */
    value: number|string,

    /**
     * 子元素,二层深度以上子元素表示级联
     */
    children?: Array<Options>

    /**
     * 表示自己是分组,children不再表示级联,而是普通子元素,value key属性无效
     */
    groupValue?: string
}

/**
 * 级联元素配置项
 */
export interface cascaderOption {
    /**
     * 当前级联选中值
     */
    value: number|string

    /**
     * 级联配置
     */
    options: Array<Options>

    /**
     * 当前显示值,给级联完整路径在输入框显示时使用
     */
    labelValue?: string
}

export interface PropsInterface {
    /**
     * 选择后的回调
     * @param value
     */
    onChange?: (value?: number | string | Array<number|string>) => void

    /**
     * 级联是否为完整路径
     */
    cascaderFull?: boolean

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

    /**
     * 配置项,这个项目存在,将忽略对子元素 Option 处理
     */
    options?: Array<Options>

    [x: string]: any
}

export class Props implements PropsInterface {
    onChange = () => {
    }
    search = false
    simple = false
    value = ''
    defaultValue = ''
    options = new Array()
    cascaderFull = false
}

export interface StateInterface {
    open?: boolean
    value?: number | string
    searchValue?: number | string

    /**
     * 显示值
     */
    labelValue?: string

    /**
     * 存储了级联列表
     */
    cascader?: Array<cascaderOption>
}

export class State implements StateInterface {
    open = false
    searchValue = ''
    labelValue = ''
    cascader = new Array()
}