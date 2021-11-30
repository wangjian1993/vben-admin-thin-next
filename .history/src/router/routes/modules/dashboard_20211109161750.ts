/*
 * @Author: max
 * @Date: 2021-10-19 18:19:54
 * @LastEditTime: 2021-11-09 16:17:19
 * @LastEditors: max
 * @Description:
 * @FilePath: /vben-admin-thin-next-main/src/router/routes/modules/dashboard.ts
 */
import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/workbench',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
    // 当前路由不再菜单显示
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: 'dashboard/workbench/index.vue',
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
};

export default dashboard;
