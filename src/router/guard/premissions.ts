import router from "@/router"
import { useUserStore } from "@/store"
import { usePermissionStore } from "@/store"
const whiteRoutes: string[] = ["/login", "/404", "/403", "/500"]

import NProgress from "nprogress"
import "nprogress/nprogress.css"
NProgress.configure({ showSpinner: false })

export function usePermissionGuard() {
	router.beforeEach(async (to, from) => {
		NProgress.start()
		document.title = (to.meta?.title || "UMS").toString()
		if (whiteRoutes.includes(to.path)) {
			NProgress.done()
			return true
		}
		const userStore = useUserStore()
		const token = userStore.getToken
		if (!token) {
			NProgress.done()
			return {
				path: "/login",
				query: {
					redirect: to.fullPath,
				},
			}
		}
		const userPermissionStore = usePermissionStore()
		if (userPermissionStore.isEmptyPermissionRoute()) {
			await userPermissionStore.initPermissionRoutes()
			return { ...to, replace: true }
		}
		return true
	})

	router.afterEach(() => {
		NProgress.done()
		// NProgress.inc(0.5)
	})
}
