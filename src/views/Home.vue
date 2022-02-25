<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>往生堂今日客户人数:{{num}}</h1>
    <helloWorld msg="Welcome to Your Vue.js App" v-model:num="num">
      <template #slotA>
         随春
      </template>
    </helloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/components/HelloWorld.vue'
import { reactive, ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'
export default {
  name: 'Home',
  components: {
    helloWorld
  },
  setup() {
     let num = ref(0)
     const wifu = reactive({name:'甘雨',race:'椰羊'})
     provide('wifu',wifu)
     return {
       num
     } 
  }
}
</script>
