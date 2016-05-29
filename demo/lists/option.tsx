import * as React from 'react'
import {Select} from '../../src'

const selects: any = {
    defaultValue: 'aa',
    options: [{
        key: 'a',
        value: '小明'
    }, {
        key: 'b',
        value: '小红'
    }, {
        key: 'c',
        value: '小白'
    }, {
        key: 'd',
        value: '小王'
    }, {
        key: 'e',
        value: '小李'
    }, {
        groupValue: '其它',
        children: [{
            key: 'aa',
            value: '小黑'
        }, {
            key: 'bb',
            value: '小天'
        }]
    }]
}

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <Select {...selects}/>
        )
    }
}