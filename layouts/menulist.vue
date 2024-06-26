<template>
    <div class="bg-cover bg-center min-h-fit text-white p-2 mb-3 lg:hidden xl:hidden" style="background-image: url('/images/background_1.jpg')">
        <div class="p-2 text-center" id="header-page" v-html="sys_property_value"></div>
        <!-- <p class="font-bold" style="text-shadow: 2px 2px 4px #000000;">Welcome to</p>
            <h1 class="font-bold mt-2 mb-2 text-5xl" style="text-shadow: 2px 2px 4px #000000;">EZ Eats</h1>
            <p style="text-shadow: 2px 2px 4px #000000;"> Eat &#x2022; Relax &#x2022; Enjoy </p>

            <p class="mt-5" style="text-shadow: 2px 2px 4px #000000;"> Visit us every </p>
            <p class="font-bold" style="text-shadow: 2px 2px 4px #000000;">
                 Monday to Friday at 8:00 AM - 6:00 PM <br> Saturday to Sunday at 10:00 AM - 8:00 PM
            </p> -->
    </div>
    <slot />
    <div >
        <HomePageFooter />  
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "admin"
});
import { ref, onMounted } from 'vue';
const sys_property_value = ref('');

const fetchSysProp = async () => { // GET FOOD CATEGORIES
    try {
        const response = await $fetch<{ system_property: systemProperty[] }>(
        `${API_BASE_URL}/api/admin/page_content/get_system_property/1`
        );
        sys_property_value.value = response.system_property[0]['value'];
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchSysProp();
});

</script>
<style>
div#header-page h1 {
    font-size: 3rem; /* 48px */
    line-height: 1;
}
</style>