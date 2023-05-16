import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "home",
          affix: true
        }
      }
    ],
    meta: {
      roles: ["student", "teacher"]
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },

  {
    path: "/scholarship",
    component: Layout,
    redirect: "/scholarship/application",
    name: "scholarship",
    meta: {
      title: "奖学金管理",
      svgIcon: "scholarship",
      roles: ["student"]
    },
    children: [
      {
        path: "application",
        component: () => import("@/views/scholarship/application/index.vue"),
        redirect: "/scholarship/application/comprehensive-scholarship",
        name: "application",
        meta: {
          title: "奖学金申请"
        },
        children: [
          {
            path: "comprehensive-scholarship",
            component: () => import("@/views/scholarship/application/comprehensive-scholarship/index.vue"),
            name: "comprehensive-scholarship",
            meta: {
              title: "综合奖学金"
            }
          },
          {
            path: "other-scholarship",
            component: () => import("@/views/scholarship/application/other-scholarship/index.vue"),
            name: "other-scholarship",
            meta: {
              title: "其他奖学金"
            }
          }
        ]
      },
      {
        path: "status",
        component: () => import("@/views/scholarship/status/index.vue"),
        name: "status",
        meta: {
          title: "状态查询"
        }
      }
    ]
  },
  {
    path: "/thesis",
    component: Layout,
    redirect: "/thesis/index",
    meta: {
      roles: ["student"]
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/thesis/index.vue"),
        name: "thesis",
        meta: {
          title: "论文管理",
          svgIcon: "thesis"
        }
      }
    ]
  },
  {
    path: "/projects",
    component: Layout,
    redirect: "/projects/all",
    name: "projects",
    meta: {
      title: "项目管理",
      svgIcon: "project",
      roles: ["student"]
    },
    children: [
      {
        path: "all",
        component: () => import("@/views/projects/all/index.vue"),
        name: "all",
        meta: {
          title: "项目列表"
        }
      },
      {
        path: "mine",
        component: () => import("@/views/projects/mine/index.vue"),
        name: "mine",
        meta: {
          title: "我的项目"
        }
      }
    ]
  },
  {
    path: "/course",
    component: Layout,
    redirect: "/course/index",
    meta: {
      roles: ["student"]
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/course/index.vue"),
        name: "course",
        meta: {
          title: "选课管理",
          svgIcon: "course"
        }
      }
    ]
  },
  {
    path: "/exam",
    component: Layout,
    redirect: "/exam/index",
    meta: {
      roles: ["student"]
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/exam/index.vue"),
        name: "exam",
        meta: {
          title: "考试管理",
          svgIcon: "exam"
        }
      }
    ]
  },
  {
    path: "/information",
    component: Layout,
    redirect: "/information/index",
    meta: {
      roles: ["teacher"]
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/information/tinymce.vue"),
        name: "infomation",
        meta: {
          title: "信息发布",
          svgIcon: "info"
        }
      }
    ]
  },
  {
    path: "/post",
    component: Layout,
    redirect: "/post/:postId",
    // make the page not shown in the sidebar
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/:postId",
        component: () => import("@/views/post/index.vue"),
        name: "BlogPost",
        props: true,
        meta: {
          title: "详情"
        }
      }
    ]
  },
  {
    path: "/link",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "https://juejin.cn/post/7089377403717287972",
        component: () => {},
        name: "Link",
        meta: {
          title: "外链",
          svgIcon: "link"
        }
      }
    ]
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/element-plus",
    name: "Table",
    meta: {
      title: "表格",
      elIcon: "Grid",
      hidden: true
    },
    children: [
      {
        path: "element-plus",
        component: () => import("@/views/table/element-plus/index.vue"),
        name: "ElementPlus",
        meta: {
          title: "Element Plus",
          keepAlive: true
        }
      },
      {
        path: "vxe-table",
        component: () => import("@/views/table/vxe-table/index.vue"),
        name: "VxeTable",
        meta: {
          title: "Vxe Table",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/menu",
    component: Layout,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级菜单",
      svgIcon: "menu",
      hidden: true
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/menu/menu1/index.vue"),
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "menu1"
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/menu/menu1/menu1-1/index.vue"),
            name: "Menu1-1",
            meta: {
              title: "menu1-1"
            }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/menu/menu1/menu1-2/index.vue"),
            redirect: "/menu/menu1/menu1-2/menu1-2-1",
            name: "Menu1-2",
            meta: {
              title: "menu1-2"
            },
            children: [
              {
                path: "menu1-2-1",
                component: () => import("@/views/menu/menu1/menu1-2/menu1-2-1/index.vue"),
                name: "Menu1-2-1",
                meta: {
                  title: "menu1-2-1"
                }
              },
              {
                path: "menu1-2-2",
                component: () => import("@/views/menu/menu1/menu1-2/menu1-2-2/index.vue"),
                name: "Menu1-2-2",
                meta: {
                  title: "menu1-2-2"
                }
              }
            ]
          },
          {
            path: "menu1-3",
            component: () => import("@/views/menu/menu1/menu1-3/index.vue"),
            name: "Menu1-3",
            meta: {
              title: "menu1-3"
            }
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/menu/menu2/index.vue"),
        name: "Menu2",
        meta: {
          title: "menu2"
        }
      }
    ]
  },
  {
    path: "/hook-demo",
    component: Layout,
    redirect: "/hook-demo/use-fetch-select",
    name: "HookDemo",
    meta: {
      title: "hook 示例",
      elIcon: "Menu",
      alwaysShow: true,
      hidden: true
    },
    children: [
      {
        path: "use-fetch-select",
        component: () => import("@/views/hook-demo/use-fetch-select.vue"),
        name: "UseFetchSelect",
        meta: {
          title: "useFetchSelect"
        }
      },
      {
        path: "use-fullscreen-loading",
        component: () => import("@/views/hook-demo/use-fullscreen-loading.vue"),
        name: "UseFullscreenLoading",
        meta: {
          title: "useFullscreenLoading"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export let asyncRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
/** 重置路由 */
export function resetAsncRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    asyncRoutes = []
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
