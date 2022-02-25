<template>
  <div class="container">
    <h2>{{name}}是我的{{character}}，她是{{job.class}}{{job.type}}</h2>
    <h5><button @click="changeInfo">更改身份</button></h5>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
export default {
  name: "HelloWorld",
  props: {
    ms: String,
  },
  setup() {
    let name = ref('神里凌华')
    let character = ref('白鹭公主')
    let job = reactive(
      {
        type:'公主',
        class:'贵族'
      }
    )
    function changeInfo() {
      name.value = '胡桃,'
      character.value = '堂主'
      job.class = '往生堂'
      job.type = '堂主'
    }

    watch(job,(a)=>{
      console.log('job  watch结果===>',a)
    })
    return {
      name,
      character,
      changeInfo,
      job
    }
  }
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
