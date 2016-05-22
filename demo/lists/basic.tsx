import * as React from 'react'
import {Select, Option} from '../../src'

export default class Demo extends React.Component <any,any> {
    handleChange(value: any) {
        console.log('基础用法', value)
    }

    render() {
        return (
            <div>
                <Select value="b"
                        onChange={this.handleChange.bind(this)}>
                    <Option value="a">小明</Option>
                    <Option value="b">小红</Option>
                    <Option value="c">小白</Option>
                    <Option value="d">小王</Option>
                    <Option value="e">小李</Option>
                    <Option value="f">小刚</Option>
                </Select>

                <Select value="b"
                        label="请选择"
                        onChange={this.handleChange.bind(this)}>
                    <Option value="a">1</Option>
                    <Option value="b">2</Option>
                    <Option value="c">3</Option>
                    <Option value="d">4</Option>
                    <Option value="e">5</Option>
                    <Option value="f">6</Option>
                    <Option value="g">7</Option>
                    <Option value="h">8</Option>
                    <Option value="i">9</Option>
                    <Option value="j">10</Option>
                    <Option value="k">11</Option>
                    <Option value="l">12</Option>
                </Select>
            </div>
        )
    }
}