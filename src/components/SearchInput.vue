<template>
    <div class='search'>
        <button class='btn' @click='searchForPlaces(searchQuery)'>Search</button>
        <input placeholder='Start typing...' class='input-base' type='text' v-model='searchQuery'/>
    </div>
</template>

<script>
import { ref } from 'vue'
import usePlaces from '@/use/usePlaces'
import useMap from '@/use/useMap'
import useResultManager from '@/use/useResultManager'
export default {
    setup () {
        const { placesService } = usePlaces()
        const { placesRestrictionArea } = useMap()
        const restrictSearch = (location, radius, query) => {
        return {
            location,
            radius, 
            query
        }
    }
    // search for places and save result in foundPlaces reference

        const { foundPlaces } = useResultManager()
        let searchQuery = ref('')
        const searchForPlaces = () => {
            foundPlaces.value = []
            console.log(placesRestrictionArea)
            const request = restrictSearch(placesRestrictionArea.value, '3', searchQuery.value)
            placesService.value.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                foundPlaces.value = results
            } else {
                foundPlaces.value = false
            }
        });
        }
        return { searchForPlaces, searchQuery, foundPlaces }
    }
}
</script>

<style scoped lang='scss'>
    .search {
        display: flex;
        margin-top: 1rem;
        justify-content: space-evenly;
    }
    .btn {
        display: inline-block;
        text-decoration: none;
        background: #333;
        font-weight: 400;
        font-size: 1.1rem;
        border: 2px solid #333;
        color: #fff;
        border-radius: 0.4rem;
        padding: 0.5rem 1rem;
        transition-duration: 0.2s; 
    }
    .input-base {
        flex: 0 0 70%;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        border: 1px solid #ddd;
        transition-duration: 0.2s; 
        &:focus {
            border-color: #000;
            outline: none;
        }
    }
    .btn:hover {
        background-color: #444;
        color: white; 
        cursor: pointer;
    }
</style>