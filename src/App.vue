<template>
    <a-config-provider :locale="zhCN" class="h100">
        <a-layout>
            <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                <div class="content">
                    <div class="logo">{{name}}</div>
                    <a-menu
                        v-model:selectedKeys="selectedKeys"
                        theme="dark"
                        mode="horizontal"
                        :style="{ lineHeight: '42px' }"
                    >
                        <a-menu-item v-for="menuItem in menuOptions" :key="menuItem.key">
                            <router-link :to="menuItem.key">{{ menuItem.label }}</router-link>
                        </a-menu-item>
                    </a-menu>
                </div>
            </a-layout-header>
            <a-layout-content :style="{ marginTop: '42px' }">
                <div class="content" :style="{ padding: '24px', minHeight: '600px', boxSizing: 'border-box' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }"> xx @2021 xxx.com </a-layout-footer>
<!--            <a-modal></a-modal>-->
        </a-layout>
    </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useRouter } from 'vue-router'
import { getVersion } from '@/api'
const menuOptions = [
    {
        label: '首页',
        key: 'HelloWorld'
    }
]
export default defineComponent({
    setup() {
        getVersion()
        const router = useRouter()
        let showModal = ref(false)
        let flag = true
        router.beforeEach( (to, from, next) => {
            if (import.meta.env.PROD) {
                 getVersion().then((res) => {
                    // @ts-ignore
                    if (__APP_VERSION__ !== res.version) {
                        flag = false
                        Modal.warning({
                            title: '版本更新',
                            centered: true,
                            content: '有最新版本,请更新!',
                            onOk: () => {
                                window.location.reload()
                            }
                        })
                    }
                })
            }
            if(flag){
                next()
            }
        })
        return {
            selectedKeys: ref(['HelloWorld']),
            menuOptions,
            zhCN,
            showModal
        }
    }
})
</script>
<style>
html,
body,
#app {
    height: 100%;
}
</style>
<style scoped>
.logo {
    width: 120px;
    height: 24px;
    line-height: 24px;
    /*background: rgba(255, 255, 255, 0.2);*/
    margin: 8px 24px 8px 0;
    font-weight: bold;
    color: #fff;
    font-size: 15px;
    padding-left: 24px;
    float: left;
}

/*.logo {*/
/*    color: #fff;*/
/*    font-weight: bold;*/
/*    margin-right: 0;*/
/*    font-size: 15px;*/
/*    padding-left: 20px;*/
/*}*/
.ant-layout-header {
    /*max-width: 1200px;*/
}
/*.ant-layout-header,*/
/*.ant-menu {*/
/*    layout-header-background: #292961;*/
/*    height: 40px;*/
/*}*/
.ant-layout-footer {
    background: #fff;
}

.content {
    width: 1200px;
    margin: 0 auto;
}
</style>
