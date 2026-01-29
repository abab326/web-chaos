<template>
  <BaseSearchTable>
    <template #search>
      <BaseSearch></BaseSearch>
    </template>
  </BaseSearchTable>
</template>

<script lang="ts" setup>
import BaseSearchTable from '@/components/base-search-table';
defineOptions({ name: 'UserManager' });
</script>

<style lang="scss" scoped></style>
