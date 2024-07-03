<template>
    <div class="card w-full">
        <div class="text-center">
            <i class="pi pi-user bg-white p-5 rounded-full " style="font-size: 2.5rem"></i>
            <p class="text-xl font-bold drop-shadow-2xl border-black mt-2">EZ Eats User</p>
            <p>Admin</p>
        </div>
        
        <Menu :model="items" class="mt-5">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const items = ref([
    {
        label: 'Food',
        items: [
            {
                label: 'Category',
                icon: '',
                route: '/admin/category'
            },
            {
                label: 'Item',
                icon: '',
                route: '/admin/item'
            }
        ]
    },{
        label: 'Page Content',
        items: [
            {
                label: 'Header',
                icon: '',
                route: '/admin/content/header'
            },
            {
                label: 'Footer',
                icon: '',
                route: '/admin/content/footer'
            }
        ]
    },{
        label: 'Settings',
        items: [
            // {
            //     label: 'Profile',
            //     icon: '',
            //     route: '/admin/content/header'
            // },
            {
                label: 'Logout',
                icon: '',
                route: '/login'
            }
        ]
    }
]);
</script>