<template>
  <BaseSearchTable>
    <template #search>
      <BaseForm
        v-model="searchFormData"
        :form-items="searchFormItems"
        :form-config="searchFormConfig"
      ></BaseForm>
    </template>
    <template #table>
      <BaseTable :table-data="tableData" :table-columns="tableColumns" :table-config="tableConfig">
        <template #cell="{ row, column }">
          <div v-if="column.prop === 'avatar'">
            <BaseFilePreview :file-url="row.avatar" file-type="image" :size="80" />
          </div>
          <div v-else-if="column.prop === 'videoUrl'">
            <BaseFilePreview
              :file-url="row.videoUrl"
              :file-name="row.videoUrl"
              file-type="file"
              size="100%"
            />
          </div>
        </template>
      </BaseTable>
    </template>
  </BaseSearchTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseSearchTable from '@/components/base-search-table';
import BaseForm, { type FormItem, type FormConfig } from '@/components/base-form';
import BaseTable from '@/components/base-table';
import BaseFilePreview from '@/components/base-file-preview';
defineOptions({ name: 'UserManager' });

// 搜索表单数据
const searchFormData = ref<Record<string, any>>({});

const searchFormItems: FormItem[] = [
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
  },
  {
    prop: 'nickname',
    label: '昵称',
    type: 'input',
  },

  {
    prop: 'mobile',
    label: '手机号',
    type: 'input',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'date-picker',
  },
];

const searchFormConfig: FormConfig = {
  labelWidth: '80px',
  labelPosition: 'right',
  size: 'default',
};

const tableData = ref([
  {
    username: 'admin',
    nickname: '管理员',
    avatar:
      'https://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
    videoUrl: 'http://v.xiaodutv.com/watch/3343028780327122882.html?&recFrom=site',
    mobile: '13800000000',
    email: 'admin@example.com',
    status: 1,
    createTime: '2023-01-01',
  },
]);

const tableColumns = ref<any[]>([
  { prop: 'username', label: '用户名' },
  { prop: 'nickname', label: '昵称' },
  { prop: 'avatar', label: '头像' },
  { prop: 'videoUrl', label: '视频介绍' },
  { prop: 'mobile', label: '手机号' },
  { prop: 'email', label: '邮箱' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },
]);

const tableConfig = ref<any>({});
</script>

<style lang="scss" scoped></style>
