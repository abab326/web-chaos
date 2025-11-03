<template>
  <div class="scss-demo">
    <h2 class="demo-title">SCSS 演示组件</h2>
    <div class="demo-content">
      <div class="card primary">
        <h3>主要卡片</h3>
        <p>这是一个使用 SCSS 变量和混合的卡片</p>
      </div>
      <div class="card secondary">
        <h3>次要卡片</h3>
        <p>另一个使用 SCSS 的卡片示例</p>
      </div>
    </div>
    <button class="demo-button" @click="handleClick">点击我</button>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>

<style lang="scss" scoped>
// 导入 SCSS 变量
@import '@/assets/scss/variables.scss';

// SCSS 混合
@mixin card-base {
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@mixin responsive($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.scss-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  .demo-title {
    color: $primary-color;
    font-size: $font-size-xl;
    margin-bottom: 2rem;
    text-align: center;
  }

  .demo-content {
    display: grid;
    gap: 1rem;

    @include responsive($breakpoint-md) {
      grid-template-columns: 1fr 1fr;
    }

    .card {
      @include card-base;

      &.primary {
        background-color: rgba($primary-color, 0.8);
        border-left: 4px solid $primary-color;
      }

      &.secondary {
        background-color: rgba($secondary-color, 0.7);
        border-left: 4px solid $secondary-color;
      }

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: $font-size-lg;
      }

      p {
        margin: 0;
        color: $secondary-color;
        font-size: $font-size-sm;
      }
    }
  }

  .demo-button {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 2rem auto 0;
    padding: 0.75rem 1.5rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: $font-size-base;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}
</style>
