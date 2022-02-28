<template>
  <div class="container">
    <el-button type="primary" @click="goTiny">前往tiny</el-button>
    <hr />
    <el-button type="primary" @click="addPerson">添加客户</el-button>
    <br /><br /><br />
    <el-button type="success">Success</el-button>

    <hr />
    <slot name="slotA">slotA</slot>
    <!-- <h3>{{msg}}</h3> -->
    <!-- <h2>{{name}}是我的{{character}}，她是{{job.class}}{{job.type}}</h2> -->
    <!-- <h5><button @click="changeInfo">更改身份</button></h5> -->
  </div>
</template>

<script>
import { computed, inject, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    num: Number,
  },
  emits: ["update:num"],
  setup(props, context) {
    //计算属性——完整
    let numSet = computed({
      get() {
        return props.num;
      },
      set(v) {
        // console.log("set结果===>", v);
        // console.log("context结果===>", context);
        context.emit("update:num", v);
      },
    });
    const wifu = inject("wifu");
    console.log("wifu结果===>", wifu);
    watchEffect(() => {
      // const numSet1 = props.num;
      console.log("numSet结果===>", props);
    });
    const router = useRouter();
    function goTiny() {
      router.push({ path: "/tiny", query: { title: "tiny页面" } });
    }
    function addPerson() {
      numSet.value += 1;
    }
    // let name = ref('神里凌华')
    // let character = ref('白鹭公主')
    // let job = reactive(
    //   {
    //     type:'公主',
    //     class:'贵族'
    //   }
    // )
    // console.log('props.msg结果===>',props.msg)
    // function changeInfo() {
    //   name.value = '胡桃,'
    //   character.value = '堂主'
    //   job.class = '往生堂'
    //   job.type = '堂主'
    // }
    // watch(job,(a)=>{
    //   console.log('job  watch结果===>',a)
    // })
    return {
      numSet,
      goTiny,
      addPerson,
      // name,
      // character,
      // changeInfo,
      // job
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
