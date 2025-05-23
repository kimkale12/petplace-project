<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="modal-close" @click="close">×</button>
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginModal',
    props: { visible: Boolean },
    emits: ['close'],
    methods: {
      close() { this.$emit('close') }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.3); z-index: 1000; display: flex; align-items: center; justify-content: center;
  }
  .modal-content {
    background: #fff; border-radius: 12px; padding: 32px 24px; min-width: 340px; position: relative; box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  }
  .modal-close {
    position: absolute; right: 16px; top: 16px; background: none; border: none; font-size: 2rem; cursor: pointer;
  }
  </style>