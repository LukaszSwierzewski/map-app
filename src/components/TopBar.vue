<template>
    <nav class='nav'>
        <h1>My favorite places in Helsinki</h1>
        <span>By Lukasz</span>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 0.5rem;
        border-bottom: 1px solid #ddd;
        @media (max-width: 767px) {
            display: none;
        }
    }
    .logo {
        max-width: 4rem;
        object-fit: contain;
    }
</style>