<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>往生堂今日客户人数:{{num}}</h1>
    <helloWorld ref="son" msg="Welcome to Your Vue.js App" v-model:num="num">
      <template #slotA>
         随春
      </template>
    </helloWorld>
    <helloWorld1 msg="Welcome to Your Vue.js App" v-model:num="num" /> 
    <el-button type="primary" @click="setSon">父组件调用子组件</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/components/HelloWorld.vue'
import helloWorld1 from '@/components/HelloWorld1.vue'
import { reactive, ref } from '@vue/reactivity'
import { onMounted, provide } from '@vue/runtime-core'
// import {fetchUserList} from '@/api/index'
// const {fetchUserList} = require('@/api/index')
import * as Api from '@/api/index'
export default {
  name: 'Home',
  components: {
    helloWorld,helloWorld1
  },
  setup() {
     let num = ref(0)
     const wifu = reactive({name:'甘雨',race:'椰羊'})
     provide('wifu',wifu)
     const son = ref(null)
     function setSon(){
       console.log('son结果===>',son)
       son.value.addPerson()
     } 
     onMounted(() => {
       Api.fetchUserList()
     })
     return {
       num,
       son,
       setSon
     } 
  }
}
</script>
