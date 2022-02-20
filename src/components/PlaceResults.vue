<template>
    <div class='card'>
        <div class='card--content'>
            <h3 class='card--content__heading'>{{ place.name }}</h3>
            <address>
                {{ place.formatted_address }}
            </address>
            <p>Open: <strong>{{ openString }}</strong></p>
        </div>
        <div class='card--action'>
            <img class='card--action__logo' :src='place.icon'>
            <div v-if="currentTab === 'founded'" class='card--action__btns'>
                <button class='card--action__btn' @click='createMarker(place)'>Add marker
                </button>
            </div>
            <div v-else class='card--action__btns'>
                <button class='card--action__btn' @click='createMarker(place)'>zoom in
                </button>
                <button class='card--action__btn' @click='deleteMarkers(place)'>delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import useMap from '@/use/useMap.js'
import useResultManager from '@/use/useResultManager'
import useLocalStorage from '@/use/useLocalStorage'
import useUI from '@/use/useUI'
export default {
    props: {
        place: {
            Type: Object,
            required: true
        }
    },
    setup (props) {
        const { map } = useMap()
        const { savedPlaces, currentTab } = useResultManager()
        const { toggleMenu, isMobile } = useUI()
        const { saveToLocalStorage, isAlreadyAdded } = useLocalStorage()
        let localMarker = reactive(null)
        let errors = ref(null)
        const createMarker = (place) => {
            if (!place.geometry || !place.geometry.location) return;
            if (isMobile) {
                toggleMenu()
            }
            if (localMarker !== null) {
                map.value.setCenter(place.geometry.location)
                return
            }
            let marker = new google.maps.Marker({
                map: map.value,
                position: place.geometry.location,
            });
            map.value.setCenter(place.geometry.location)
            const isSaved = isAlreadyAdded(place, savedPlaces.value)
            if (!isSaved) savedPlaces.value.push(place)
            saveToLocalStorage('places', savedPlaces.value)
            createInfoWindow(marker, place)
            localMarker = marker
        }
        const deleteMarkers = (place) => {
            if (localMarker !== null) {
                localMarker.setMap(null)
                localMarker = reactive(null)
            }
            const index = savedPlaces.value.findIndex(key => key.place_id === place.place_id);
            savedPlaces.value.splice(index, 1)
            saveToLocalStorage('places', savedPlaces.value)
        }
        const returnOpenString = (isOpen) => {
            if (isOpen) return 'Open now'
            if (isOpen === undefined) return 'No Data'
            if (!isOpen) return 'Closed'
        }
        const openString = ref(null)
        onMounted(() => {
            openString.value = returnOpenString(props.place?.opening_hours?.open_now)
        })
        const createInfoWindow = (marker, place) => {
            const content = `
            <div class='marker'>
                <div class='marker--content'>
                    <div class='marker--content__heading'>
                        <h4 class='h4'>${place.name}</h4>
                        <span>Open: ${openString.value}</span>
                    </div>
                    <img class='marker--content__img' src=${place.icon} alt=''>
                </div>
                <p>${place.formatted_address}</p>
            </div>
            `
            const infoWindow = new google.maps.InfoWindow({
                content
            });
            google.maps.event.addListener(marker, "click", () => {
                infoWindow.open(map.value);
            });
            marker.addListener("click", () => {
                infoWindow.open({
                anchor: marker,
                map: map.value
                });
            });
        }
        return { createMarker, returnOpenString, openString, errors, currentTab, deleteMarkers }
    }
}
</script>

<style lang='scss'>
    .marker {
        &--content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.2rem;
            &__img {
                max-width: 2rem !important
            }
            &__heading {
                display: flex;
                flex-direction: column;
                .h4 {
                    margin: 0.2rem 0rem;
                }
            }
        }
    }
    .card {
        display: flex;
        align-items: stretch;
        padding: 0rem 1rem;
        border-bottom: 1px solid #ddd;
        justify-content: space-between;
        &--content {
            max-width: 15rem;
            @media (max-width: 767px) {
                max-width: 10rem;
            }
        }
        &--action {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            &__logo {
                max-width: 2rem;
            }
            &__btn {
                background: white;
                border: 1px solid #ddd;
                padding: 0.5rem;
                margin-left: 0.2rem;
                border-radius: 0.2rem;
                transition-duration: 0.2s;
                position: relative;
                .error {
                    position: absolute;
                    bottom: -20px;
                    color: red;
                    left: -50%;
                    transform: translate(50%, 0%);
                }
                &:hover {
                    background: #000;
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }
</style>