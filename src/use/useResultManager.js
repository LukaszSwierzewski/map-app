import {ref } from "vue";
const foundPlaces = ref([])
export default function useResultManager() {
    return {foundPlaces}
}
