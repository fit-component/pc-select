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

    [x: string]: any
}

export class Props implements PropsInterface {
    value = ''
    disabled = false
}

export interface StateInterface {

}

export class State implements StateInterface {

}