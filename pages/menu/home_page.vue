<template>
    <div>
        <div class="bg-cover min-h-screen text-white p-12"
            style="background-image: url('/_nuxt/assets/images/burger_bg.jpg')">
            <div class="p-7 mt-12 text-center">
                <p class="mt-10 text-2xl font-bold">ENJOY YOUR DELICOUS MEAL</p>
                <h1 class="text-9xl font-bold mt-5 mb-10">EZ Eats</h1>
                <p class="mt-5 text-2xl">
                    Eat &#x2022; Relax &#x2022; Enjoy
                </p>
                <p class="mt-2 mb-7 text-lg italic font-bold">
                    the quick brown fox jumps over the lazy dog. the quick brown fox jumps over the lazy dog.
                </p>

                <NuxtLink to="/menu/food_menu_list" target="_blank" rel="noopener">
                    <Button class="mt-7 pl-9 pr-9 text-2xl" label="View Menu" severity="danger" rounded />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "homepage"
});
</script>