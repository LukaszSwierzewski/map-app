import {ref } from "vue";
const foundPlaces = ref([])
const savedPlaces = ref([])
let places = ref([])
let currentTab = ref('founded')
export default function useResultManager() {
    const tabResultSwitcher = (tab) => {
        currentTab.value = tab
        if (tab === 'saved') places.value = savedPlaces.value 
        if (tab === 'founded') places.value = foundPlaces.value
      }
    return {foundPlaces, savedPlaces, places, tabResultSwitcher, currentTab}
}
