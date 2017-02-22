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
        this.state = {//http://pic51.nipic.com/file/20141023/2531170_115622554000_2.jpg
            imageUrl:'',
            imageMarginT:0,
            imageMarginL:0,
            display:'none'
        };
    }

    render(){
        const {data,userList} = this.props;
        const {imageUrl,imageMarginT,imageMarginL,display} = this.state;
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
                                <img style={{display:display,marginLeft:imageMarginL+'px',marginTop:imageMarginT+'px'}} id="preview_image" ref="icon_img" src={imageUrl} onLoad={()=>{
                                    this.setImageSize()}}/>
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
                    </div>
                    <div className="devide_line"></div>
                    <div className="app_config_middle_container">
                        <div className="app_config_middle_left" style={{marginLeft:'30px'}}>
                            <div>
                                <p className="app_config_middle_text">{'应用名称：'}</p>
                                <input ref={'appName'} defaultValue={(data && data.name) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'IOS下载地址：'}</div>
                                <input ref={'iosUrl'} defaultValue={(data && data.iosApp) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'安卓下载地址：'}</div>
                                <input ref={'andUrl'} defaultValue={(data && data.andApp) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'PC单点登陆地址：'}</div>
                                <input ref={'pcUrl'} defaultValue={(data && data.loginEntrance) || ''} className="config_input" type="text"/>
                            </div>
                        </div>
                        <div className="app_config_middle_right">
                            <div>
                                <div className="app_config_middle_text">{'应用类型：'}</div>
                                <select ref={'appType'} defaultValue={(data && data.type) || '0'} className="config_input">
                                    <option value='0'>{'原生应用'}</option>
                                    <option value='1'>{'H5应用'}</option>
                                    <option value='2'>{'外部应用'}</option>
                                </select>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'IOS入口：'}</div>
                                <input ref={'iosEntrance'} defaultValue={(data && data.iosEntrance) || ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'安卓入口：'}</div>
                                <input ref={'andEntrance'} defaultValue={(data && data.andEntrance)|| ''} className="config_input" type="text"/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <div className="app_config_middle_text">{'PC入口：'}</div>
                                <input ref={'pcEntrance'} defaultValue={(data && data.pcEntrance) || ''} className="config_input" type="text"/>
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

    componentDidMount(){
        const {data} = this.props;
        console.log('data.icon:'+data.icon);
        this.setState({imageUrl:data.icon});
    }

    setImageSize(){
        const {icon_img} = this.refs;
        const {width,height} = icon_img;
        let scale = 1;
        if(width > 130 || height > 130){
            scale = 130 / width > 130 / height ? 130 /height : 130 / width;
        }
        this.setState({imageMarginT:(130-height*scale)/2,imageMarginL:(130-width*scale)/2,display:''})
    }

    onSelectChange(e){
        let file = e.target;
        if(!file.files || !file.files[0]){
            return;
        }
        let formData = new FormData();
        formData.append('appIcon',file.files[0]);
        this.props.dispatch(uploadPng(formData,this.onUploadImageCb.bind(this)));
    }

    onUploadImageCb(data){
        this.setState({imageUrl:data.data.appIcon});
    }

    onConfirmClick(){
        const {data} = this.props;
        const {imageUrl} = this.state;
        const {appName,iosUrl,andUrl,pcUrl,appType,iosEntrance,andEntrance,pcEntrance} = this.refs;
        let dataArr = 'name='+appName.value;
        dataArr = dataArr + '&icon='+imageUrl;
        dataArr = dataArr + '&iosApp='+iosUrl.value;
        dataArr = dataArr + '&iosEntrance='+iosEntrance.value;
        dataArr = dataArr + '&andApp='+andUrl.value;
        dataArr = dataArr + '&andEntrance='+andEntrance.value;
        dataArr = dataArr + '&pcEntrance='+ pcEntrance.value;
        dataArr = dataArr + '&loginEntrance='+pcUrl.value;
        dataArr = dataArr + '&type='+appType.value;
        if(!data) {
            this.props.dispatch(addApp(dataArr, this.onAddOrUpdateCb.bind(this)));
        } else {
            dataArr = dataArr + '&id='+data.id;
            this.props.dispatch(updateApp(dataArr, this.onAddOrUpdateCb.bind(this)));
        }
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