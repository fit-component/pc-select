import * as React from 'react'
import {Select, Option} from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                请选择
                <Select value="b"
                        style={{width:60}}
                        simple>
                    <Option value="a">小明</Option>
                    <Option value="b">小红</Option>
                    <Option value="c">小白</Option>
                    <Option value="d">小王</Option>
                    <Option value="e">小李</Option>
                    <Option value="f">小刚</Option>
                </Select>
                其中的一项?
            </div>
        )
    }
}