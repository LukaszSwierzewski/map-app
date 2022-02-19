<template>
  <div class='app'>
    <TopBar/>
    <div class='layout'>
      <div class='sidebar'>
        <div class='tab-panel'>
          <ul class='tabs'>
              <!-- This part could be better -->
            <li :class="{active: currentTab === 'founded'}" class='tabs--tab' @click="tabResultSwitcher('founded')">Found places ({{ foundPlaces.length }})</li>
            <li :class="{active: currentTab === 'saved'}" class='tabs--tab' @click="tabResultSwitcher('saved')">Saved places ({{ savedPlaces.length }})</li>
          </ul>
        </div>
        <SearchInput/>
        <div class='results'> 
          <PlaceResults v-for='place in places' :place='place' :key='place.name'/>
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
import useLocalStorage from '@/use/useLocalStorage'
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
    const { foundPlaces, savedPlaces, places, tabResultSwitcher, currentTab } = useResultManager()
    const { getFromLocalStorage } = useLocalStorage()
    onMounted(() => {
      initMap(mapDiv)
      initPlacesService(map)
      initRestrictions()
      tabResultSwitcher(currentTab.value)
      console.log('hallooo')
      console.log(getFromLocalStorage('places'))
      savedPlaces.value = getFromLocalStorage('places')
    })
    return { mapDiv, tabResultSwitcher, places, currentTab, foundPlaces, savedPlaces, tabResultSwitcher }
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
.tabs {
  display: flex;
  list-style-type: none;
  padding: 0px;
  margin-top: 0rem;
  &--tab {
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    transition-duration: 0.2s;
    text-align: center;
  }
}
.active {
  background: #333;
  color: white;
}
</style>