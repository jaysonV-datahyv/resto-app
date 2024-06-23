<template>
    <div class="card w-full">
        <Menu :model="items">
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
    },
    // {
    //     label: 'Profile',
    //     items: [
    //         {
    //             label: 'Settings',
    //             icon: 'pi pi-cog'
    //         },
    //         {
    //             label: 'Logout',
    //             icon: 'pi pi-sign-out'
    //         }
    //     ]
    // }
]);
</script>