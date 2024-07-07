<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: 'auth'
});
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const name = ref(null);
const description = ref(null);
const order = ref(null);
const active = ref(true);
const route = useRoute()
const recordid = ref(route.params.id);
const submitDisabled = ref(false);
const fooditemList = ref(null);
let currency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'PHP',
}); //currency format

const fetchCategoryDetails = async (recorId = 0) => { // GET FOOD CATEGORY DETAILS
    try {
        const response = await $fetch<{ category_details: foodCategoryDetails[] }>(
            `${API_BASE_URL}/api/food_category/get_category_details/${recorId}`
        );
        name.value = response.category_details[0].name;
        description.value = response.category_details[0].description;
        order.value = response.category_details[0].order;
        active.value = response.category_details[0].active;
    } catch (error) {
        console.log(error);
    }
};

const fetchUncategorizedFoodItem = async (recorId = 0) => { // GET FOOD CATEGORY DETAILS
    try {
        const getFloatingItems = await $fetch<{ food_items: foodItem[] }>(
            `${API_BASE_URL}/api/food_item/get_uncategorized_food_list`
        );

        const getSelectedItems = await $fetch<{ food_items: foodItem[] }>(
            `${API_BASE_URL}/api/food_item/get_category_food_list/${recordid.value}`
        );

        fooditemList.value = [getFloatingItems.food_items, getSelectedItems.food_items];
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchUncategorizedFoodItem();
    if (recordid.value != 0) {
        fetchCategoryDetails(recordid.value);
    }    
});

const getRecord = async () => {
    submitDisabled.value = true;
    try {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('order', order.value);
        formData.append('food_ids', JSON.stringify(fooditemList.value[1])); 
        if (active.value) {
            formData.append('active', 'true');
        } else {
            formData.append('active', 'false');
        }
        const data = (recordid.value != 0) ? await editRecord() : await submitNewRecord(formData);
    } catch (error) {
        console.log(error);
    }
};

const submitNewRecord = async (data: any) => {
    const response = await $fetch(`${API_BASE_URL}/api/food_category/insert_record`, {
        method: "POST",
        body: data,
        headers: {
            Accept: "application/json",
        },
    });
    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Added Successfully!', life: 3000 });
    clearfields();
    submitDisabled.value = false;
};

const editRecord = async () => {
    let data = JSON.stringify({
        'name': name.value,
        'description': description.value,
        'order': order.value,
        'food_ids': JSON.stringify(fooditemList.value[1]),
        'active': (active.value) ? 'true' : 'false'
    });

    try {
        const response = await $fetch(`${API_BASE_URL}/api/food_category/update_record/${recordid.value}`, {
            method: "PUT",
            body: data,
            headers: {
                Accept: "application/json",
            },
        });
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Updated Successfully!', life: 3000 });
    } catch (error) {
        console.log(error);
    }
    submitDisabled.value = false;
};

const clearfields = () => {
    name.value = null;
    description.value = null;
    order.value = null;
    active.value = true;
}
</script>
<template>
    <div>
        <Toast />
        <Panel header="Add Food Category">
            <form @submit.prevent="getRecord">
                <div class="card m-5">
                    <div class="grid gap-8 2xl:grid-cols-2 xl:grid-cols-2 mb-5">
                        <div>
                            <div>
                                <label for="name" class="block font-semibold">Name <span class="text-red-600">*</span></label>
                                <InputText id="name" class="w-full" v-model="name" required />
                            </div>
                            <div>
                                <label for="order" class="block font-semibold">Order</label>
                                <InputNumber v-model="order" class="w-full" inputId="withoutgrouping"
                                    :useGrouping="false" aria-describedby="order-help" />
                                <small id="order-help" class="block">Enter the number should be appear from the category
                                    list.</small>
                            </div>
                            <div>
                                <label for="active" class="block font-semibold">Active</label>
                                <InputSwitch v-model="active" />
                            </div>
                            <div>
                                <label for="description" class="block font-semibold">Description</label>
                                <Textarea id="description" class="w-full" autoResize v-model="description" rows="5" />
                            </div>
                        </div>
                        <div>
                                    <PickList v-model="fooditemList" listStyle="max-height:500px;min-height:300px" dataKey="id" breakpoint="1400px">
                                <template #sourceheader> Available Food Item </template>
                                <template #targetheader> Selected Food Item </template>
                                <template #item="slotProps">
                                    <div class="border-l-2 border-green-600 p-1 bg-slate-50">
                                        <span class="font-bold text-xs">{{ (slotProps.item.code) ? slotProps.item.code : 'No Code' }} : {{ slotProps.item.name }}</span> <br>
                                        <span class="font-semibold text-xs"> <i class="pi pi-tag" style="font-size: 1rem"></i> {{ currency.format(slotProps.item.price) }}</span>
                                    </div>
                                </template>
                            </PickList>
                            
                        </div>
                    </div>
                    <Button type="submit" :label="(recordid == '0') ? 'Submit' : 'Save'" class="ml-1 mr-1" :disabled="submitDisabled"/>
                    <router-link to="/admin/category" target="_self" rel="noopener">
                        <Button label="Cancel" class="ml-1 mr-1" severity="danger" />
                    </router-link>
                </div>
            </form>
        </Panel>
    </div>
</template>