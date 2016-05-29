import * as React from 'react'

export interface PropsInterface {
    /**
     * 回调响应的值
     */
    value?: string|number

    /**
     * 禁用
     */
    disabled?: boolean

    /**
     * 层级,普通是1,级联后一次递增
     */
    zIndex?: number

    [x: string]: any
}

export class Props implements PropsInterface {
    value = ''
    disabled = false
    zIndex = 1
}

export interface StateInterface {

}

export class State implements StateInterface {

}