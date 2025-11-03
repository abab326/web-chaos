<template>
  <div class="element-demo">
    <h2>Element Plus 示例</h2>

    <!-- 按钮示例 -->
    <div class="demo-block">
      <h3>按钮</h3>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="info">信息按钮</el-button>
    </div>

    <!-- 表单示例 -->
    <div class="demo-block">
      <h3>表单</h3>
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格示例 -->
    <div class="demo-block">
      <h3>表格</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>

    <!-- 对话框示例 -->
    <div class="demo-block">
      <h3>对话框</h3>
      <el-button type="primary" @click="dialogVisible = true">
        打开对话框
      </el-button>

      <el-dialog v-model="dialogVisible" title="提示" width="30%">
        <span>这是一段信息</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)

const form = reactive({
  name: '',
  email: '',
  gender: ''
})

const tableData = [
  {
    date: '2023-10-01',
    name: '张三',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2023-10-02',
    name: '李四',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2023-10-03',
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  }
]

const onSubmit = () => {
  console.log('提交表单:', form)
  // 这里可以添加实际的提交逻辑
}
</script>

<style scoped>
.element-demo {
  padding: 20px;
}

.demo-block {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
