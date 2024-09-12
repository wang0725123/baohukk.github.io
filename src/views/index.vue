<script setup>
import { onMounted, ref, reactive, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const route = useRoute();

import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
const handleOpen = (key, keyPath) => {
    // console.log("打开", key, keyPath);
};
const handleClose = (key, keyPath) => {
    // console.log(key, keyPath);
};
const activeMenuItem = (keyPath) => {
    // console.log(keyPath);
    router.push(keyPath.index);
};
const dialogVisible = ref(false);
const handleCommand = (command) => {
    if (command == 2) {
        ElMessageBox.confirm("确认退出登录吗?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
        }).then(() => {
            router.push("/login");
            // localStorage.removeItem("token");
        });
    } else if (command == 1) {
        dialogVisible.value = true;
    }
};
const oldpwd = localStorage.getItem("pwd");
const passwordData = reactive({
    oldPasswod: "",
    newPassword: "",
});
const editPwd = () => {
    console.log(oldpwd);
    if (!passwordData.oldPasswod) {
        return ElMessage({
            message: "请输入旧密码",
            type: "warning",
        });
    }
    if (!passwordData.newPassword) {
        return ElMessage({
            message: "请输入新密码",
            type: "warning",
        });
    }
    if (passwordData.oldPasswod != oldpwd) {
        return ElMessage({
            message: "请输入正确的旧密码",
            type: "warning",
        });
    }
    localStorage.setItem("pwd", passwordData.newPassword);
    router.push("/login");
};

const localStorageValue = ref(localStorage.getItem("token") || "");

// 定义一个轮询函数来监听localStorage的变化
let pollingTimerId = null;

const startPolling = () => {
    pollingTimerId = setInterval(() => {
        const newValue = localStorage.getItem("token");
        if (newValue !== localStorageValue.value) {
            // localStorageValue.value = newValue;
            router.push("/login");
        }
    }, 1000);
};

// 停止轮询
const stopPolling = () => {
    if (pollingTimerId) {
        clearInterval(pollingTimerId);
        pollingTimerId = null;
    }
};

// 监听localStorageValue变化，并更新localStorage
watch(localStorageValue, (newValue) => {
    localStorage.setItem("token", newValue);
});

onMounted(() => {
    startPolling();
});
onUnmounted(() => {
    stopPolling();
});
</script>
<template>
    <div class="box">
        <div class="top">
            <div class="text">守护最好坤坤真爱粉后台管理</div>
            <div class="dropdownBox">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        功能操作<el-icon class="el-icon--right"
                            ><arrow-down
                        /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="1"
                                >修改密码</el-dropdown-item
                            >
                            <el-dropdown-item command="2"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="content">
            <div class="sidbar">
                <el-menu
                    default-active="/index"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-sub-menu index="/index">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>一级</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/home" @click="activeMenuItem"
                                >home页</el-menu-item
                            >
                            <el-menu-item index="/about" @click="activeMenuItem"
                                >about页</el-menu-item
                            >
                        </el-menu-item-group>

                        <el-sub-menu index="1-4">
                            <template #title>二级</template>
                            <el-menu-item index="/text" @click="activeMenuItem"
                                >text页</el-menu-item
                            >
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="main">
                <router-view />
            </div>
        </div>
        <el-dialog v-model="dialogVisible" title="修改密码" width="500" center>
            <el-form label-width="80px" class="elForm">
                <el-form-item label="旧密码">
                    <el-input v-model="passwordData.oldPasswod" />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                        v-model="passwordData.newPassword"
                        show-password
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editPwd">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
.box {
    height: 100%;
    background-color: #f6f6f6;
    .top {
        height: 70px;
        padding: 0 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        background: linear-gradient(to right, #00b3ff, #48b1e0);
        .text {
            font-weight: 700;
        }
    }
    .content {
        display: flex;
        height: calc(100% - 70px);
    }
    .sidbar {
        width: 200px;
        height: 100%;
        background-color: #fff;
    }
    .main {
        width: calc(100% - 200px);
        height: 100%;
        padding: 1rem 1rem;
        background-color: #f6f6f6;
    }
}
</style>
