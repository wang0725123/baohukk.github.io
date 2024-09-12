<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute();
const formData = reactive({
    userName: "",
    password: "",
});
const submit = () => {
    if (!formData.userName) {
        return ElMessage({
            message: "请输入账号",
            type: "warning",
        });
    }
    if (!formData.password) {
        return ElMessage({
            message: "请输入密码",
            type: "warning",
        });
    }
    const pwd = localStorage.getItem("pwd");
    if (
        formData.userName == "admin" &&
        (formData.password == pwd || formData.password == 123456)
    ) {
        router.push("/index");
        localStorage.setItem("token", "存在");
        localStorage.setItem("pwd", formData.password);
    } else {
        ElMessage.error("账号或密码错误!");
    }
};
</script>
<template>
    <div class="box">
        <div class="centerBox">
            <h3>守护最好坤坤真爱粉后台管理</h3>
            <el-form
                label-width="80px"
                class="elForm"
                :model="formData"
                :rules="rules"
                ref="ruleFormRef"
            >
                <el-form-item label="用户名">
                    <el-input v-model="formData.userName" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" show-password />
                </el-form-item>
                <el-form-item>
                    <div class="btn" @click="submit()">登录</div>
                </el-form-item>
            </el-form>
            <div class="waring">
                <span>账号为admin,初始密码为123456</span>
                <span>如果您忘记密码可重新输入初始密码进入系统</span>
            </div>
        </div>
        <!-- <img class="img1" src="../assets/ji.jpg" alt="" />
        <img class="img2" src="../assets/ji.jpg" alt="" /> -->
    </div>
</template>
<style lang="less" scoped>
.box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    // background: linear-gradient(
    //     135deg,
    //     rgba(38, 128, 247, 1) 38.89%,
    //     rgba(15, 189, 122, 1) 52.08%,
    //     rgba(7, 187, 171, 1) 77.77%
    // );
    background-color: #00b3ff;
    .centerBox {
        z-index: 100;
        position: relative;
        width: 400px;
        height: 400px;
        padding-top: 50px;
        background-color: #fff;
        border-radius: 10px;
        h3 {
            text-align: center;
        }
        ::v-deep .elForm {
            padding: 0 30px 0 0;
        }
        .btn {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: #2a82e4;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
        .waring {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
            color: #ccc;
        }
    }
    .img1 {
        position: absolute;
        left: 0;
        height: 100%;
    }
    .img2 {
        position: absolute;
        right: 0;
        height: 100%;
    }
}
</style>
