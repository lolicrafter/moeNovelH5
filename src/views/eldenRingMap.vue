<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :style="mapStyle"
    @pointermove="pointermove"
    ref="mapRef"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />
    <ol-zoom-control />
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
        <ol-feature>
          <ol-geom-point :coordinates="center"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="40">
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

    <ol-overlay :position="[1, 1]">
      <template v-slot="slotProps">
        <div class="overlay-content">
          Hello world!<br />
          Position: {{ slotProps.position }}
        </div>
      </template>
    </ol-overlay>
  </ol-map>
<!-- https://vue3openlayers.netlify.app/componentsguide/mapcontrols/ -->
  <!-- <el-image style="width: 100px; height: 100px" :src="testUrl"></el-image> -->
  <el-button type="primary" @click="refresh">刷新</el-button>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
} from "vue";
export default defineComponent({
  name: "index",
  computed: {},
  setup() {
    const zoom = ref(2);
    const rotation = ref(0);
    const size = ref([1024, 968]);
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
    const strokeWidth = ref(10);
    const mapStyle = reactive({
      height: "600px",
      border: "1px solid #000",
    });

    const mapRef = ref(null);
    const view = ref(null);
    const funcList = {
      pointermove(v) {
        // console.log("pointermove结果===>", v);
      },
      refresh() {
        console.log("view.value.getCenter===>", view.value.getCenter());
      },
    };
    onMounted(() => {});
    return {
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
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>