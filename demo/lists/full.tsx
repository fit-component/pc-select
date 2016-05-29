import * as React from 'react'
import {Select} from '../../src'

const selects: any = {
    defaultValue: 'aa',
    options: [{
        key: 'a',
        value: '北京',
        children: [{
            groupValue: '常用',
            children: [{
                key: 'a1',
                value: '海淀区'
            }, {
                key: 'a2',
                value: '朝阳区'
            }]
        }, {
            groupValue: '其它',
            children: [{
                key: 'a11',
                value: '东城区',
                children: [{
                    key: 'ccc',
                    value: '一区'
                }, {
                    key: 'ddd',
                    value: '二区'
                }]
            }, {
                key: 'a22',
                value: '西城区'
            }]
        }]
    }, {
        key: 'b',
        value: '安徽',
        children: [{
            key: 'b1',
            value: '合肥市',
            children: [{
                key: 'b11',
                value: '庐阳区'
            }, {
                key: 'b12',
                value: '瑶海区'
            }]
        }, {
            key: 'b2',
            value: '芜湖市'
        }, {
            key: 'b3',
            value: '淮南市'
        }]
    }],
    onChange: (value: string|number)=> {
        console.log('级联选中:', value)
    }
}

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <Select {...selects} label="请选择城市"/>
        )
    }
}