/**
 * Created by wdd on 2017/2/14.
 */
import * as MockData from '../constants/mockData'
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';
import * as myFetch from '../utils/mFetch';
import * as AdapterURL from '../constants/AdpterURL';
import {createRemoteOnlyDAO} from '../middleware/dal';

export function getAppList(cb){
    if(MockData.useMock){
        return (dispatch)=>{
            dispatch(actionHelper.createPayloadAction(ActionTypes.update_app_list,MockData.appList));
            if(cb){
                cb();
            }
        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_get_with_params(AdapterURL.GET_APP_LIST);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                    this.dispatch(actionHelper.createPayloadAction(ActionTypes.update_app_list, data.data || []));
                }
            }
        },cb);
    }
}

export function uploadPng(data,cb){
    console.log('upload png');
    if(MockData.useMock){
        cb('');
        return (dispatch)=>{

        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_post_png(AdapterURL.POST_POST_ICON,data);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                }
            }
        },cb);
    }
}

export function updateApp(data,cb){
    if(MockData.useMock){
        cb();
        return (dispatch)=>{

        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_post_png(AdapterURL.POST_UPDATE_APP,data);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                }
            }
        },cb);
    }
}

export function addApp(data,cb){
    cb();
    if(MockData.useMock){
        return (dispatch)=>{

        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_post(AdapterURL.POST_CREATE_APP,data);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                }
            }
        },cb);
    }
}

export function delApp(data,cb){
    cb();
    if(MockData.useMock){
        return (dispatch)=>{

        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_post_png(AdapterURL.POST_DELETE_APP,data);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                }
            }
        },cb);
    }
}

export function getUserList(cb){
    if(MockData.useMock){
        return (dispatch)=>{
            dispatch(actionHelper.createPayloadAction(ActionTypes.update_user_list,MockData.userList2));
            if(cb){
                cb();
            }
        }
    } else {
        return createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_get_with_params(AdapterURL.GET_USER_LIST);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                    this.dispatch(actionHelper.createPayloadAction(ActionTypes.update_user_list, data.data || []));
                }
            }
        },cb);
    }
}

export function AssignUserList(data,cb){
    if(MockData.useMock){
        if(cb){
            cb();
        }
        return (dispatch)=>{

        }
    }
    else {
        return  createRemoteOnlyDAO({
            fromRemote:function () {
                return myFetch.fetch_get_with_params(AdapterURL.POST_ASSIGN_ADMIN);
            },
            onEnd: function(data) {
                if(!actionHelper.isError(data)) {
                }
            }
        },cb);
    }
}