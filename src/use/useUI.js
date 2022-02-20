import {ref, computed } from "vue";
let mobileMenu = ref(true)
const toggleIcon = computed(() => {
    return mobileMenu.value ? '-' : '+'
})
const isMobile = computed(() => {
    if (screen.width <= 767) return true
    else return false
})
export default function useUI () {
    const toggleMenu = () => {
        mobileMenu.value = !mobileMenu.value
    }
    return { toggleIcon, toggleMenu, mobileMenu, isMobile }
}

