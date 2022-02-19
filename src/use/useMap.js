import {ref } from "vue";
import { MAP_OPTIONS } from '@/use/MapOptions.js'
const placesRestrictionArea = ref(null)
const map = ref(null)
export default function useMap() {
    const initMap = (mapDiv) => {
        map.value = new google.maps.Map(mapDiv.value, MAP_OPTIONS)
    }
    const initRestrictions = () => {
        placesRestrictionArea.value = new google.maps.LatLng(60.19, 24.95)
    }
  return { initMap, initRestrictions, map, placesRestrictionArea };
}
