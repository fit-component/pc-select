import * as React from 'react'
import {Select, Option, OptGroup} from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <Select>
                <OptGroup label="管理员">
                    <Option value="a">小明</Option>
                    <Option value="b">小红</Option>
                    <Option value="c">小白</Option>
                </OptGroup>
                <OptGroup label="组员">
                    <Option value="d">小王</Option>
                    <Option value="e">小李</Option>
                    <Option value="f">小刚</Option>
                </OptGroup>
            </Select>
        )
    }
}