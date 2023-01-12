<template>
  <div class="container">
    <el-form :inline="false" :model="data.searchForm" class="demo-form-inline">
      <el-form-item label="小说名称">
        <el-input
          v-model="data.searchForm.title"
          placeholder="请输入小说名称"
        />
      </el-form-item>
      <el-form-item label="小说标签" prop="tag">
        <el-checkbox-group v-model="data.searchForm.tag" size="large">
          <el-checkbox-button
            v-for="(item, index) in data.tagsList"
            :key="index"
            class="check-item"
            :label="item.name"
          >
            {{ item.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="小说分类" prop="category">
        <el-checkbox-group v-model="data.searchForm.category" size="large">
          <el-checkbox-button
            v-for="(item, index) in data.categoryList"
            :key="index"
            class="check-item"
            :label="item.name"
          >
            {{ item.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList"> 搜索 </el-button>
        <el-button type="primary" @click="fetchList((reset = true))">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <div class="article-box"></div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <div
        class="article-item infinite-list-item"
        v-for="item in data.list"
        :key="item._id"
      >
        {{ item.title }}
      </div>
    </ul>
  </div>
  <!-- <router-link :to="{ path: '/home' }">跳转</router-link> -->
  <el-button @click="pageTo">跳转</el-button>
  
  <div class="footer">
    <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2023000693号</a>
  </div>
</template>

<script setup>
import {
  fetchArticleList,
  fetchCategoryList,
  fetchTagsList,
} from "@/api/index.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
  categoryList: [{}],
  tagsList: [{}],
  searchForm: {
    tag: [],
    category: [],
    title: "",
    pageSize: 5,
    pageIndex: 1,
  },
  searchFormBackup: {
    tag: [],
    category: [],
    title: "",
    pageSize: 5,
    pageIndex: 1,
  },
  loadMore: true,
});
const getList = () => {
  console.log("getList结果===>");
  fetchArticleList(data.searchForm).then((res) => {
    data.list = res.data;
    data.loadMore = res.data.length > 0;
  });
  fetchCategoryList().then((res) => {
    data.categoryList = res.data;
  });
  fetchTagsList().then((res) => {
    data.tagsList = res.data;
  });
};
const fetchList = (reset = true) => {
  if (reset === true) {
    data.searchForm = JSON.parse(JSON.stringify(data.searchFormBackup));
  }
  data.searchForm.pageIndex = 1;
  fetchArticleList(data.searchForm).then((res) => {
    data.list = res.data;
    data.loadMore = res.data.length > 0;
  });
};
const load = () => {
  if (!data.loadMore) return;
  data.searchForm.pageIndex += 1;
  fetchArticleList(data.searchForm).then((res) => {
    data.loadMore = res.data.length > 0;
    data.list.push(...res.data);
  });
};
const pageTo = () => {
  router.push({ path: "/home" });
};
getList();
</script>

<style lang="scss" scoped>
.container {
  .demo-form-inline {
    width: 50vw;
    // display: flex;
    // flex-direction: column;
  }
  .infinite-list {
    height: 250px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }
  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
  .article-box {
    .article-item {
      width: 300px;
      height: 150px;
      background-color: aliceblue;
    }
  }
  .flex-box {
    display: flex;
    .flex-item {
      background-color: aqua;
      margin: 10px 20px;
      padding: 10px;
    }
  }
}
</style>

