import {ref } from "vue";
import { MAP_OPTIONS } from '@/use/MapOptions.js'
const placesRestrictionArea = ref(null)
const map = ref(null)
export default function useMap() {
    const initMap = (mapDiv) => {
        map.value = new google.maps.Map(mapDiv.value, MAP_OPTIONS)
    }
    const initRestrictions = () => {
        const northEast = new google.maps.LatLng(60.2755, 25.26)
        placesRestrictionArea.value = new google.maps.LatLng(northEast)
    }

  return { initMap, initRestrictions, map, placesRestrictionArea };
}
