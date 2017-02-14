/**
 * Created by wdd on 2017/2/10.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'
import {removeOverLayByName,showLoading,removeLoading} from '../actions/view'
import {uploadPng,addApp,updateApp,getAppList} from '../actions/appList'
import * as OverLayNames from '../constants/OverLayNames'

export default class AppConfigViewModal extends Component{
    constructor(){
        super();
        this.state = {imageUrl:''};
    }

    render(){
        const {data,userList} = this.props;
        console.log(data);
        const {imageUrl} = this.state;
        return (
            <BaseModal>
                <div className="app_config_container">
                    <div className="app_config_header">
                        <div className="app_config_header_title">{'应用配置'}</div>
                    </div>
                    <div className="app_config_up_container">
                        <div className="app_config_up_left_container">
                            <div className="app_config_yytb">{'应用图标:'}</div>
                            <div className="app_config_pic_con">{'没有预览可用'}</div>
                            <div className="app_config_pic_con_2">
                                <img id="preview_image" src={imageUrl}/>
                            </div>
                            <div className="app_config_msg_con">
                                <p className="app_config_space_size_msg">{'尺寸：144*144'}</p>
                                <p className="app_config_type_msg">{'png格式'}</p>
                                <p className="app_config_size_msg">{'25K大小以内'}</p>
                                <div className="app_config_img_upload_btn">{'上传logo'}</div>
                                <input type="file" onChange={(e)=>{
                                    this.onSelectChange(e);
                                }} className="app_config_img_upload_btn"/>
                            </div>
                        </div>
                        <div className="app_config_up_right_container">
                            <p className="app_config_name_input_text">{'应用名称：'}</p>
                            <input ref={'appName'} className="app_config_name_input" type="text"/>
                        </div>
                    </div>
                    <div className="devide_line"></div>
                    <div className="app_config_middle_container">
                        <div className="app_config_middle_left">
                            <div>
                                <div className="app_config_middle_text">{'应用类型：'}</div>
                                <select ref={'appType'} style={{height:'26px',width:'174px'}} className="config_input">
                                    <option value="0">{'0'}</option>
                                    <option value="1">{'1'}</option>
                                    <option value="2">{'2'}</option>
                                </select>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div className="app_config_middle_text">{'安卓入口：'}</div>
                                <input ref={'andEntrance'} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div className="app_config_middle_text">{'Pc入口：'}</div>
                                <input ref={'pcEntrance'} className="config_input" type="text"/>
                            </div>
                        </div>
                        <div className="app_config_middle_right">
                            <div>
                                <div className="app_config_middle_text">{'下载地址：'}</div>
                                <input ref={'downloadUrl'} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div className="app_config_middle_text">{'Ios入口：'}</div>
                                <input ref={'iosEntrance'} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div className="app_config_middle_text">{'单点登录入口：'}</div>
                                <input ref={'singleEntrance'} className="config_input" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="app_config_btn_container">
                        <div className="app_config_btn_confirm" onClick={()=>{this.onConfirmClick()}}>{'确定'}</div>
                        <div className="app_config_btn_cancel" onClick={()=>{this.onCancelClick()}}>{'取消'}</div>
                    </div>
                </div>
            </BaseModal>
        )
    }

    onSelectChange(e){
        let file = e.target;
        if(!file.files || !file.files[0]){
            return;
        }
        let reader = new FileReader();
        reader.onload = function(){
            console.log(reader.result);
            this.props.dispatch(uploadPng(reader.result,this.onUploadImageCb.bind(this)));
            this.setState({imageUrl:reader.result})
        }.bind(this);
        reader.onerror=function(evt){
            console.log(evt);
        };
        reader.readAsDataURL(file.files[0]);
    }

    onUploadImageCb(){

    }

    onConfirmClick(){
        const {appName,appType,andEntrance,pcEntrance,downloadUrl,iosEntrance,singleEntrance} = this.refs;
        let dataArr = {};
        dataArr.name = appName.value;
        dataArr.icon = '';
        dataArr.iosApp = iosEntrance.value;
        dataArr.iosEntrance = iosEntrance.value;
        dataArr.andApp = andEntrance.value;
        dataArr.andEntrance = andEntrance.value;
        dataArr.pcEntrance = pcEntrance.value;
        dataArr.loginEntrance = singleEntrance.value;
        this.props.dispatch(showLoading());
        this.props.dispatch(addApp(dataArr,this.onAddOrUpdateCb.bind(this)));
    }

    onAddOrUpdateCb(){
        this.props.dispatch(removeOverLayByName(OverLayNames.APP_CONFIG_VIEW));
        this.props.dispatch(removeLoading());
        this.props.dispatch(getAppList());

    }

    onCancelClick(){
        this.props.dispatch(removeOverLayByName(OverLayNames.APP_CONFIG_VIEW))
    }
}