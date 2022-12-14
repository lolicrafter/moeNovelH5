<template>
    <div>
        <h1>tiny页面</h1>
    </div>
</template>

<script>
import { defineComponent,reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'index',
    setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    console.log('1-开始创建组件-setup')
    const state = reactive({

    })
    const funcList = {
        getInfo() {}
    }
    onBeforeMount(() => {
        console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
        funcList.getInfo();
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