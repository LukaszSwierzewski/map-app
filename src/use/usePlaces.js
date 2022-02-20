import {ref } from "vue";
let placesService = ref(null)
export default function usePlaces() {
    const options = {
      componentRestrictions: { country: 'fi' }
    }
    const initPlacesService = (map) => {
        placesService.value = new google.maps.places.PlacesService(map.value, options);
    }
  return { placesService, initPlacesService }
}
