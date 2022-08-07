import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@views/home-page.vue";
import DepositPage from "@views/deposit-page.vue";
import SwapPage from "@views/swap-page.vue";

const NotFound = () => import("@views/not-found.vue");
const AdminHomePage = () => import("@views/admin/home-page.vue");
const DepositAdmin = () => import("@views/admin/tabs/deposit-admin.vue");
const TransactionAdmin = () =>
    import("@views/admin/tabs/transaction-admin.vue");
const UserNotification = () => import("@views/user-notification.vue");
const CurrenciesAdmin = () => import("@views/admin/tabs/currencies-admin.vue");
const SettingsAdmin = () => import("@views/admin/tabs/settings-admin.vue");
const UserProfile = () => import("@views/user-profile.vue");

const routes: RouteRecordRaw[] = [
    { path: "/", component: HomePage, name: "home-page" },
    { path: "/deposit", name: "deposit-page", component: DepositPage },
    { path: "/swap", name: "swap-page", component: SwapPage },
    {
        path: "/admin",
        component: AdminHomePage,
        children: [
            { path: "", name: "admin-home-page", component: DepositAdmin },
            { path: "deposit", name: "admin.deposit", component: DepositAdmin },
            {
                path: "transaction",
                name: "admin.transaction",
                component: TransactionAdmin,
            },
            {
                path: "currencies",
                name: "admin.currencies",
                component: CurrenciesAdmin,
            },
            {
                path: "settings",
                name: "admin.settings",
                component: SettingsAdmin,
            },
        ],
    },
    {
        path: "/notification",
        name: "user-notification",
        component: UserNotification,
    },
    { path: "/profile", name: "user-profile", component: UserProfile },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
