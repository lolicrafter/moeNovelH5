<template>
  <div class="container">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      :style="mapStyle"
      @singleclick="mapClick"
      ref="mapRef"
      class="mapBox"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-zoom-control />
      <ol-fullscreen-control />
      <ol-mouseposition-control />
      <ol-image-layer>
        <ol-source-image-static
          :url="imgUrl"
          :imageSize="size"
          :imageExtent="extent"
          :projection="projection"
        ></ol-source-image-static>
      </ol-image-layer>

      <ol-vector-layer>
        <ol-source-vector>
          <!-- 渲染标点 -->
          <ol-feature v-for="(item, index) in markPointList" :key="index">
            <ol-overlay :position="item.location" :offset="[6, -12]">
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template v-slot="slotProps">
                <div class="overlay-content" @click="editMark(item)">
                  {{ item.name }}
                </div>
              </template>
            </ol-overlay>
            <ol-geom-point :coordinates="item.location"></ol-geom-point>
            <ol-style>
              <ol-style-circle :radius="strokeWidth">
                <ol-style-fill :color="fillColor"></ol-style-fill>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="strokeWidth"
                ></ol-style-stroke>
              </ol-style-circle>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </div>

  <!-- https://vue3openlayers.netlify.app/componentsguide/mapcontrols/ -->
  <!-- <el-image style="width: 100px; height: 100px" :src="testUrl"></el-image> -->
  <!-- <el-button type="primary" @click="refresh">刷新</el-button> -->

  <el-dialog
    v-model="dialogFormVisible"
    :title="form.id ? '编辑物品' : '添加物品'"
    width="30%"
    center
    @closed="closeDialog"
  >
    <template #title>
      <div class="title-bar">
        <div>{{ form.id ? "编辑物品" : "添加物品" }}</div>
      </div>
      <div v-if="form.id" class="delete-icon">
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="red"
          title="确定删除当前物品??"
          @confirm="deleteItem"
        >
          <template #reference>
            <el-icon><delete /></el-icon>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-form :model="form">
      <el-form-item label="物品名称" label-width="80">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入物品名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { nanoid } from "nanoid";

import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  watchEffect,
  toRaw,
} from "vue";
export default defineComponent({
  name: "EldenRingMap",
  computed: {},
  setup() {
    const zoom = ref(2);
    const rotation = ref(0);
    const size = ref([3840, 3610]);
    const center = ref([size.value[0] / 2, size.value[1] / 2]);
    const extent = ref([0, 0, ...size.value]);
    const projection = reactive({
      code: "xkcd-image",
      units: "pixels",
      extent: extent,
    });
    const imgUrl = require("../assets/map/map.jpg");
    const testUrl = require("../assets/map/mini.jpg");
    // const imgUrl = ref("http://127.0.0.1:8081/vue3/src/assets/map/mini.jpg");
    // const imgUrl = ref('https://imgs.xkcd.com/comics/online_communities.png');
    const fillColor = ref("white");
    const strokeColor = ref("red");
    const strokeWidth = ref(4);
    const mapStyle = reactive({
      height: "100vh",
      // border: "1px solid #000",
    });
    let data = reactive({
      dialogFormVisible: ref(false),
      form: {
        name: "",
        id: "",
        location: [],
      },
      markPointList: [
        {
          name: "龙墟",
          id: "slFS5x5qO9OFLVW1kr1cc",
          location: [1579.742153020759, 703.5693641622846],
        },
        {
          name: "遗迹街",
          id: "rNiDi7qgnDHR2kdNZbFnD",
          location: [1675.882535341256, 735.6423611111641],
        },
      ],
    });
    const mapRef = ref(null);
    const view = ref(null);
    onMounted(() => {
      const markers = JSON.parse(localStorage.getItem("markers"));
      if (markers && markers.length > 0) {
        data.markPointList = reactive(markers);
      }
    });
    const funcList = {
      // 删除当前物品
      deleteItem() {
        const index = data.markPointList.findIndex((item) => {
          return item.id === data.form.id;
        });
        console.log("删除当前物品index结果===>", index);
        data.markPointList.splice(index, 1);
        data.dialogFormVisible = ref(false);
        localStorage.setItem(
          "markers",
          JSON.stringify(toRaw(data.markPointList))
        );
      },
      closeDialog() {
        data.form = reactive({
          name: "",
          id: "",
          location: [],
        });
      },
      editMark(item) {
        data.dialogFormVisible = ref(true);
        data.form = JSON.parse(JSON.stringify(item));
      },
      submitAdd() {
        let obj = {};
        if (data.form.id) {
          obj = { ...data.form };
          const index = data.markPointList.findIndex((item) => {
            return item.id === data.form.id;
          });
          data.markPointList[index] = obj;
        } else {
          obj = {
            ...data.form,
            id: nanoid(),
          };
          data.markPointList.push(obj);
        }
        data.dialogFormVisible = ref(false);
        console.log("toRaw(markPointList)结果===>", toRaw(data.markPointList));
        localStorage.setItem(
          "markers",
          JSON.stringify(toRaw(data.markPointList))
        );
      },
      mapClick(event) {
        console.log("mapClick", event.coordinate);
        data.form.location = event.coordinate;
        data.dialogFormVisible = ref(true);
      },
      refresh() {
        console.log("view.value.getCenter===>", view.value.getCenter());
      },
    };
    watchEffect(() => {
      // toRefs(markPointList);
      // console.log("markPointList结果===>", toRaw(markPointList));
    });
    return {
      ...toRefs(data),
      fillColor,
      strokeColor,
      strokeWidth,
      center,
      projection,
      zoom,
      rotation,
      size,
      extent,
      imgUrl,
      testUrl,
      mapStyle,
      mapRef,
      view,
      ...funcList,
    };
  },
});
</script>
<style scoped lang='scss'>
.overlay-content {
  color: orange;
  font-weight: bold;
  // background: #efefef;
  // box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  // padding: 10px 20px;
  font-size: 16px;
}
.container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  cursor: crosshair;
  // cursor:url('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')

}
// .container {
  // cursor:url('/assets/pointer.ico')
  // cursor: crosshair;
// }
.title-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.delete-icon {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
}
</style>