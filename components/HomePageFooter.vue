<template>
    <div class="mt-9">
        <Panel class="rounded-none bg-slate-700">
            <div class="m-0 text-white" id="footer-page" v-html="sys_property_value"></div>
        </Panel>
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
        `${API_BASE_URL}/api/admin/page_content/get_system_property/2`
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
div#footer-page h1 {
    font-size: 3rem; /* 48px */
    line-height: 1;
}
</style>