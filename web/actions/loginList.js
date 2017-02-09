/**
 * Created by wdd on 2017/2/8.
 */
import * as MockData from '../constants/mockData'
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';
import * as myFetch from '../utils/mFetch'
import * as AdpterURL from '../constants/AdpterURL';
import {createRemoteOnlyDAO} from '../middleware/dal'

export function getLoginList(index,cb = null){
    if(MockData.useMock) {
        return (dispatch)=> {
            dispatch(actionHelper.createPayloadAction(ActionTypes.update_login_list, MockData.mockAppList));
            if(cb) {
                cb();
            }
        };
    }
    return createRemoteOnlyDAO({
        fromRemote:function () {
            return myFetch.fetch_get_with_params(AdpterURL.GET_LOGIN_LIST,[{'key':'page',value:index}]);
        },
        onEnd: function(data) {
            if(!actionHelper.isError(data)) {
                this.dispatch(actionHelper.createPayloadAction(ActionTypes.update_login_list, data));
            }
        }
    },cb);
}