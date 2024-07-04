<template>
    <div>
        <Toast />
        <ConfirmDialog class="2xl:w-1/5 sm:w-auto"></ConfirmDialog>

        <Panel header="Food Item">
            <DataTable v-model:filters="filters" :value="customers" paginator stripedRows showGridlines :rows="10" dataKey="id"
                :loading="loading" 
                :globalFilterFields="['name', 'description', 'price']"
                class="mt-5">
                <template #header>
                    <div class="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div>
                            <router-link to="/admin/item/0" target="_self" rel="noopener">
                                <Button label="Add Record" />
                            </router-link>
                        </div>
                        <div>
                            <div class="flex 2xl:justify-end sm:justify-start">
                                <IconField iconPosition="left">
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                </IconField>
                            </div>
                        </div>
                    </div>

                </template>
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column sortable field="name" header="Name" style="min-width: 12rem">
                    <template #body="{ data }">
                        <b>{{ (data.code) ? data.code : 'No Code' }} </b> : {{ data.name }}
                    </template>
                </Column>
                <Column sortable field="description" header="Description" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.description }}
                    </template>
                </Column>
                <Column sortable field="price" header="Price" style="min-width: 12rem">
                    <template #body="{ data }">
                        <i class="pi pi-tag" style="font-size: 1rem"></i> {{ currency.format(data.price) }}
                    </template>
                </Column>
                <Column sortable field="active" header="Status" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :value="(data.active) ? 'Active': 'Inactive'" :severity="getState(data.active)" />
                    </template>
                    
                </Column>
                <Column field="id" header="Action" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Button icon="pi pi-pencil" class="m-1" aria-label="Update" @click="editRecord(data.id)"/>
                        <Button icon="pi pi-trash" class="m-1" severity="danger"  aria-label="Delete" @click="confirmDelete(data.id)"/>
                    </template>
                </Column>
            </DataTable>
        </Panel>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: 'auth'
});
import { ref, onMounted } from 'vue';
import 'primeicons/primeicons.css';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const customers = ref();
const loading = ref(true);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const router = useRouter();
let currency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'PHP',
}); //currency format

const fetchCategories = async () => { // GET FOOD CATEGORIES
  try {
    const response = await $fetch<{ food_items: foodItem[] }>(
      `${API_BASE_URL}/api/food_item/get_list`
    );
    customers.value = response.food_items;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
    fetchCategories();
});

const getState = (active) => {
    switch (active) {
        case 0:
            return 'danger';
        case 1:
            return 'success';
    }
}

const confirmDelete = (id = 0) => {
    confirm.require({
        message: ' Do you want to delete this record?',
        header: 'Confirm Delete',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'border-red-600 bg-red-600 hover:bg-white hover:border-red-600 hover:text-red-600',
        acceptClass: 'bg-green-600 border-green-600 hover:bg-white hover:text-green-600',
        accept: () => {
            deleteData(id);            
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const deleteData = async (id = 0) => {
    try {
        const response = await $fetch(
        `${API_BASE_URL}/api/food_item/delete_record/${id}`, {
        method: "DELETE",
        });
        fetchCategories();
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    } catch (error) {
        console.log(error);
    }
}

const editRecord = (recordID = 0) => {
    router.push(`/admin/item/${recordID}`);
}
</script>
<style>
  table thead tr th {
    background-color: rgb(226 232 240) !important;
  }
</style>