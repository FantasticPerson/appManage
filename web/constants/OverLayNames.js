/**
 * Created by wdd on 2016/9/22.
 */
import ViewLoading from '../components/LoadingModal'
import AppConfigViewModal from '../components/appConfigView'
import AdminConfigView from '../components/adminConfigView'
import ConfirmModal from '../components/ConfirmModal'

export const VIEW_LOADING = 'view_loading';
export const APP_CONFIG_VIEW = 'app_config_view_modal';
export const ADMIN_CONFIG_VIEW　= 'admin_config_view';
export const CONFIRM_MODAL_VIEW　= 'confirm_modal_view';
export const overLayMap = {
    "view_loading":ViewLoading,
    "app_config_view_modal":AppConfigViewModal,
    "admin_config_view":AdminConfigView,
    "confirm_modal_view":ConfirmModal
};