<template>
  <div class='app'>
    <TopBar/>
    <div class='layout'>
      <div class='sidebar'>
        <SearchInput/>
        <div class='results'>
          <PlaceResults v-for='place in foundPlaces' :place='place' :key='place.name'/>
        </div>
      </div>
      <div ref="mapDiv" class="google--map" style="width: 100%; height: 100vh" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import { ref, onMounted } from 'vue'
import PlaceResults from '@/components/PlaceResults.vue'
import SearchInput from '@/components/SearchInput.vue'
import TopBar from '@/components/TopBar.vue'
import useMap from '@/use/useMap'
import usePlaces from '@/use/usePlaces'
import useResultManager from '@/use/useResultManager'
export default {
  name: 'App',
  components: {
    PlaceResults,
    SearchInput,
    TopBar
  },
  setup() {
    const mapDiv = ref(null)
    const { initMap, initRestrictions, map } = useMap()
    const { initPlacesService } = usePlaces()
    const { foundPlaces } = useResultManager()
    onMounted(() => {
      initMap(mapDiv)
      initPlacesService(map)
      initRestrictions()
    })
    return { mapDiv, foundPlaces }
  }
}
</script>
<style>
  body {
    margin: 0px;
  }
  html, body {
    height: 100%;
    font-family: Arial;
  }
</style>
<style scoped lang='scss'>
.layout {
  display: grid;
  grid-template-columns: 4fr 6fr;
}
.results {
  max-height: 90vh;
  overflow: scroll;
}
</style>