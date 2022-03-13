<template>
  <div class="container">
    <div class="article-box">
      <div class="article-item" v-for="(item, index) in data.list" :key="index">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { fetchArticleList } from "@/api/index.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from "vue";
//import引入的组件需要注入到对象中才能使用
const data = reactive({
  list: [
    {
      author: "",
      category: [],
      content: "",
      publishYear: "2020",
      star: 9.5,
      status: "",
      tag: [],
      title: "",
      word: "",
      _id: "",
    },
  ],
});
const getList = () => {
  console.log("getList结果===>");
  fetchArticleList().then((res) => {
    data.list = res.data;
  });
};
getList();
</script>

<style lang="scss" scoped>
.container{
  .article-box{
    .article-item{
      width: 300px;
      height: 150px;
      background-color: aliceblue;
    }
  }
}
</style>

