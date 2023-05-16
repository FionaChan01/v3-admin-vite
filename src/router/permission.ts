import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage } from "element-plus"
import { whiteList } from "@/config/white-list"
import { constantRoutes, asyncRoutes } from "@/router"
import { getToken } from "@/utils/cache/cookies"
import { getRole } from "@/api/login"
import asyncRouteSettings from "@/config/async-route"
import NProgress from "nprogress"
import qs from "qs"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      if (userStore.role === "") {
        const data = qs.stringify({ token: getToken() })
        await getRole(data).then((res) => {
          userStore.setRole(res.data.role)
          constantRoutes.forEach((item) => {
            if (item.meta.hidden || item.meta.roles.includes(res.data.role)) {
              asyncRoutes.push(item)
            }
          })
        })
        // 如果已经登录，并准备进入 Login 页面，则重定向到主页
        next({ path: "/" })
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    // 如果没有 Token
    console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
