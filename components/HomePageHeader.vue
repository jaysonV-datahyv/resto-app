
<template>
    <div class="card sticky top-0">
        <Menubar :model="items" class="pl-5 border-b-2 border-b-rose-600 rounded-none">
            <template #start>
                <Image src="/_nuxt/assets/images/ez_eats_logo.png" alt="Image" width="50" />
                <!-- <Avatar image="/_nuxt/assets/images/ez_eats_logo.png" class="mr-2 p-1" size="large" shape="circle" /> -->
            </template>
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                </a>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import 'primeicons/primeicons.css';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/menu/home_page');
        }
    },
    {
        label: 'Menu',
        icon: 'pi pi-th-large',
        command: () => {
            router.push('/menu/food_menu_list');
        }
    }
]);
</script>