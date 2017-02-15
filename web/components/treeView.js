/**
 * Created by wdd on 2017/2/10.
 */
import React,{Component} from 'react';
import 'rc-tree/assets/index.css'
import Tree,{TreeNode} from 'rc-tree';
import {generateTreeViewData} from '../utils/data-helper'

export default class TreeView extends Component{
    constructor(){
        super();
        this.state={
            defaultExpandedKeys: [],
            defaultSelectedKeys: [],
            defaultCheckedKeys: [],
            switchIt:true
        };
        this.checkKeys = [];
    }

    onExtend(){

    }

    onSelect(selectedKeys, info){
        console.log(info.node.props.eventKey);
        // this.selKey = info.node.props.eventKey;
    }

    onCheck(checkedKeys, info){
        this.checkKeys = checkedKeys;
    }

    getCheclKeys(){
        return this.checkKeys;
    }

    render(){
        const {data} = this.props;
        let resultData = generateTreeViewData(data);
        let funcExpand = this.onExtend.bind(this);
        let funcCheck = this.onCheck.bind(this);
        let funcSelect = this.onSelect.bind(this);
        let treeNodes = resultData.map((item)=>{
            let childNode = item.emps.map((item2)=>{
                return <TreeNode title={item2.name} key={item2.userId}/>
            });
            return <TreeNode title={item.dep.dname} key={item.dep.did}>{childNode}</TreeNode>
        });
        return (
            <Tree
                className="myCls" showLine checkable defaultExpandAll
                defaultExpandedKeys={this.state.defaultExpandedKeys}
                onExpand={funcExpand}
                defaultSelectedKeys={this.state.defaultSelectedKeys}
                defaultCheckedKeys={this.state.defaultCheckedKeys}
                onSelect={funcSelect} onCheck={funcCheck}
            >
                <TreeNode title="中威" key="中威">
                    {treeNodes}
                </TreeNode>
            </Tree>
        )
    }
}