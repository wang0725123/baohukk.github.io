<script setup>
import { reactive, ref, onMounted } from "vue";
import { getData } from "../api/index";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const tableData = ref([]);
const totlaNum = ref(null);
let input = ref(null);
onMounted(async () => {
    const { total, list, code } = await getData({
        pageSize: 10,
        pageNum: 1,
    });
    if (code === 200) {
        tableData.value = list;
        totlaNum.value = total;
    }
});
</script>
<template>
    <div class="indexBox">
        <div class="heardBox">
            <el-row style="width: 100%; flex: 1">
                <el-col :span="5"
                    ><el-input
                        v-model="input"
                        style="width: 240px"
                        placeholder="请输入ikun"
                /></el-col>
                <el-col :span="4"
                    ><el-button type="primary">搜索</el-button>
                    <el-button type="warning">重置</el-button></el-col
                >
            </el-row>
            <div class="rightBtn">
                <el-button type="primary">新增ikun</el-button>
                <el-button type="danger">删除ikun</el-button>
            </div>
        </div>
        <div class="indexContent">
            <div class="table-data">
                <el-table
                    :data="tableData"
                    height="100%"
                    style="width: 100%"
                    border
                >
                    <el-table-column prop="title" label="真爱粉名称" width="" />
                    <el-table-column prop="date" label="ikun年数" />
                    <el-table-column prop="link" label="真爱粉网址" width="" />
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                    layout="prev, pager, next"
                    :total="tableData.length"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.indexBox {
    height: 100%;
    background-color: #f6f6f6;
    .heardBox {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        background-color: #fff;
        margin-bottom: 20px;
        .rightBtn {
            width: 350px;
            display: flex;
            justify-content: flex-end;
        }
    }
    .indexContent {
        display: flex;
        flex-direction: column;
        height: calc(100% - 70px - 20px);
        padding: 20px 20px 0;
        background-color: #fff;
        .table-data {
            flex: 1;
            overflow-y: auto;
        }
        .page {
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
}
</style>
