import * as React from 'react'

export interface PropsInterface {
    /**
     * 分组的标签名
     */
    label: string

    /**
     * 不对子元素透传配置,变量配置时开启
     */
    ignoreChildren?: boolean

    [x: string]: any
}

export class Props implements PropsInterface {
    label = '分组'
    ignoreChildren = false
}

export interface StateInterface {

}

export class State implements StateInterface {

}