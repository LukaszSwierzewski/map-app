import {ref } from "vue";
let placesService = ref(null)
export default function usePlaces() {
    const initPlacesService = (map) => {
        placesService.value = new google.maps.places.PlacesService(map.value);
    }
  return { placesService, initPlacesService }
}
