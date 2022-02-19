<template>
    <div>
        <div class='search'>
            <button class='btn' @click='searchForPlaces(searchQuery)'>Search</button>
            <input placeholder='Start typing...' class='input-base' type='text' v-model='searchQuery'/>
        </div>
        <ul v-if='errorArray.length > 0'>
            <li v-for='(error, index) in errorArray' :key='index' class='error'>{{ error }}</li>
        </ul>
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
        const { foundPlaces, tabResultSwitcher } = useResultManager()
        let searchQuery = ref('')
        const errorArray = ref([])
        const searchForPlaces = () => {
            foundPlaces.value = []
            errorArray.value = []
            if (searchQuery.value.length <= 3) {
                errorArray.value.push('Search text should have atleast 3 letters')
                return
            }
            const request = restrictSearch(placesRestrictionArea.value, '3', searchQuery.value)
            placesService.value.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                foundPlaces.value = results
                tabResultSwitcher('founded')
            } else {
                foundPlaces.value = []
            }
        });
        }
        return { searchForPlaces, searchQuery, foundPlaces, errorArray }
    }
}
</script>

<style scoped lang='scss'>
    .search {
        display: flex;
        margin-top: 1rem;
        justify-content: space-between;
        padding: 0.4rem 1rem;
        @media (max-width: 767px) {
            flex-direction: column-reverse;
        }
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
        @media (max-width: 767px) {
            margin-bottom: 0.5rem;
            padding: 0.6rem;
        }
    }
    .btn:hover {
        background-color: #444;
        color: white; 
        cursor: pointer;
    }
    .error {
        color: red;
    }
</style>