import {ref, computed } from "vue";
let mobileMenu = ref(true)
const toggleIcon = computed(() => {
    return mobileMenu.value ? '-' : '+'
})
export default function useUI () {
    const toggleMenu = () => {
        mobileMenu.value = !mobileMenu.value
    }
    return { toggleIcon, toggleMenu, mobileMenu }
}

