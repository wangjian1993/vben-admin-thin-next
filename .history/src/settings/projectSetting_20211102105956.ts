/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-11-02 10:59:55
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/settings/projectSetting.ts
 */
import type { ProjectConfig } from '/#/config';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  showSettingButton: true,
  showDarkModeToggle: true,
  settingButtonPosition: 'auto',
  permissionMode: 'BACK',
  permissionCacheType: 1,
  sessionTimeoutProcessing: 0,
  themeColor: '#0960bd',
  grayMode: false,
  colorWeak: false,
  fullContent: false,
  contentMode: 'full',
  showLogo: true,
  showFooter: false,
  headerSetting: {
    bgColor: '#151515',
    fixed: true,
    show: true,
    theme: 'dark',
    useLockPage: true,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true,
  },
  menuSetting: {
    bgColor: '#001529',
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: 'inline',
    type: 'mix',
    theme: 'dark',
    split: true,
    topMenuAlign: 'center',
    trigger: 'HEADER',
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: 'click',
    mixSideFixed: false,
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: 'fade-slide',
    openPageLoading: true,
    openNProgress: true,
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: false,
  showBreadCrumbIcon: false,
  useErrorHandle: false,
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,
  removeAllHttpPending: false,
};

export default setting;
