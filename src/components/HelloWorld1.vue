<template>
    <div>
      <h1>测试</h1>
      <hr>
      <h2>{{name}}</h2>
      <hr>
      {{obj.game}}
      <hr>
      {{keys}}
    </div>
    <el-button type="primary" @click="getInfo">getInfo</el-button>
</template>

<script>
import { defineComponent,reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'index',
    setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    console.log('1-开始创建组件-setup')
    const state = reactive({
      name:'小王',
      age:11,
      keys:[1,2,3,4,5],
      obj:{
        game:'elden ring'
      }
    })
    const funcList = {
        getInfo() {
          state.name = ref('小2')
          state.obj.game = ref('小222')
          console.log('state结果===>',state)
        }
    }
    onBeforeMount(() => {
        console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
        // funcList.getInfo();
        console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
        ...toRefs(state),
        ...funcList
    }
  },
})
</script>
<style scoped lang='scss'>

</style>