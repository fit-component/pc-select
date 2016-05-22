import * as React from 'react'

export interface PropsInterface {
    /**
     * 分组的标签名
     */
    label:string

    [x: string]: any
}

export class Props implements PropsInterface {
    label = '分组'
}

export interface StateInterface {

}

export class State implements StateInterface {

}