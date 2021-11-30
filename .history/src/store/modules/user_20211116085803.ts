import type { UserInfo } from '/#/store';
import type { Menu } from '/@/router/types';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, ROUTER_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache, clearAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
// import { RouteRecordRaw } from 'vue-router';
// import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { h } from 'vue';
import dashboard from '/@/router/routes/modules/dashboard';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  menuList: Menu[];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    //菜单
    menuList: [],
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setAppMenu(menuList: Menu[]) {
      this.menuList = menuList;
      setAuthCache(ROUTER_KEY, menuList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { mode, ...loginParams } = params;
        const { headers, data } = await loginApi(loginParams, mode);
        const { token } = headers;
        const info = data;
        // save token
        this.setToken(token);
        //路由格式化
        this.recursion(info.data.userModules);
        info.data.userModules.forEach((item) => {
          if (item.component == '' || !item.component) {
            item.component = 'LAYOUT';
            item.redirect = '';
            item.meta.title = item.name;
            item.redirect = item.children[0].path;
          }
          if (item.name !== 'Dashboard') {
            info.data.userModules.push(dashboard);
          }
        });

        this.setUserInfo(info.data);
        // 4、获取路由配置并动态添加路由配置
        const permissionStore = usePermissionStore();
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((item) => {
          console.log(item);
          router.addRoute(item);
        });
        return info.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    //递归遍历路由数据
    recursion(node: any) {
      for (const i in node) {
        if (!node[i].meta.title && node[i].meta.title == undefined) {
          node[i].meta.title = node[i].name;
        }
        node[i].meta.icon = 'ant-design:' + node[i].meta.icon + '-outline';
        if (node[i].children) {
          //存在子节点就递归
          this.recursion(node[i].children);
        }
      }
    },
    // async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
    //   console.log('goHome', goHome);
    //   if (!this.getToken) return null;
    //   // get user info
    //   const sessionTimeout = this.sessionTimeout;
    //   if (sessionTimeout) {
    //     this.setSessionTimeout(false);
    //   } else {
    //     const permissionStore = usePermissionStore();
    //     if (!permissionStore.isDynamicAddedRoute) {
    //       const routes = await permissionStore.buildRoutesAction();
    //       routes.forEach((route) => {
    //         router.addRoute(route as unknown as RouteRecordRaw);
    //       });
    //       router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
    //       permissionStore.setDynamicAddedRoute(true);
    //     }
    //     goHome && (await router.replace(this.userInfo || PageEnum.BASE_HOME));
    //   }
    //   return this.userInfo;
    // },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = getAuthCache<UserInfo>(USER_INFO_KEY);
      console.log(userInfo);
      // const { roles = [] } = ;
      // if (isArray(roles)) {userInfo
      //   const roleList = roles.map((item) => item.value) as RoleEnum[];
      //   this.setRoleList(roleList);
      // } else {
      //   userInfo.roles = [];
      //   this.setRoleList([]);
      // }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      clearAuthCache(true);
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
