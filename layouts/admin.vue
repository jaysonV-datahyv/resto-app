<template>
    <div>
        <!-- <AdminPageHeader /> -->
        <div class="grid grid-cols-9">            
            <div class="col-span-2 bg-slate-100 xl:col-span-2 lg:col-span-2 col-span-9 p-5">
                <div class="xl:hidden lg:hidden inline">
                    <Button icon="pi pi-bars" @click="visible = true" :aria-controls="visible ? 'sbar' : null" :aria-expanded="visible" />
                    <Sidebar id="sbar" v-model:visible="visible" role="region">
                        <AdminPageHeader />
                    </Sidebar>
                </div>
                <div class="xl:inline lg:inline hidden">
                    <AdminPageHeader />
                </div>                
            </div>
            <div class="xl:col-span-7 lg:col-span-7 col-span-9 p-5">
                <slot />
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
const visible = ref(false);
</script>