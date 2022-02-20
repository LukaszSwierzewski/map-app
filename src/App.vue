<template>
  <div class='app'>
    <TopBar/>
    <div class='layout'>
      <div :class="{'slide-out': !mobileMenu}" class='sidebar'>
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
      <div ref="mapDiv" class="google--map" />
    </div>
    <div class='hidder' @click='toggleMenu'>
      {{ toggleIcon}}
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import PlaceResults from '@/components/PlaceResults.vue'
import SearchInput from '@/components/SearchInput.vue'
import TopBar from '@/components/TopBar.vue'
import useMap from '@/use/useMap'
import usePlaces from '@/use/usePlaces'
import useResultManager from '@/use/useResultManager'
import useLocalStorage from '@/use/useLocalStorage'
import useUI from '@/use/useUI'
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
    const { toggleIcon, toggleMenu, mobileMenu } = useUI()
    onMounted(() => {
      initMap(mapDiv)
      initPlacesService(map)
      initRestrictions()
      tabResultSwitcher(currentTab.value)
      savedPlaces.value = getFromLocalStorage('places')
    })
    return { mapDiv, tabResultSwitcher, places, currentTab, foundPlaces, savedPlaces, toggleIcon, tabResultSwitcher, toggleMenu, mobileMenu }
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
  @media (max-width: 767px) {
    display: block;
  }
}
.results {
  height: 90vh;
  overflow: scroll;
}
.google--map {
  width: 100%;
  height: 90vh;
  @media (max-width: 767px) {
    height: 100vh;
  }
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
.sidebar {
  @media (max-width: 767px) {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 10;
    transition-duration: 0.3s;
    &.slide-out {
      transform: translate(-100%, 0%)
    }
  }
}
.hidder {
  position: absolute;
  z-index: 20;
  background: #000;
  color: white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  bottom: 10px;
  left: 10px;
  align-items: center;
  display: none;
  justify-content: center;
  @media (max-width: 768px) {
    display: flex;
  }
}

</style>