<script lang="ts" setup>
definePageMeta({
    layout: "admin"
});
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const name = ref(null);
const code = ref(null);
const description = ref(null);
const price = ref(null);
const active = ref(true);
const route = useRoute();
const image_path = ref();
const image_src = ref();
const recordid = ref(route.params.id);
const selectedCategory = ref(null);
const categories = ref<foodCategory[]>([]);
let currency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'PHP',
}); //currency format

const fetchCategories = async () => { // GET FOOD CATEGORIES
  try {
    const response = await $fetch<{ food_categories: foodCategory[] }>(
      `${API_BASE_URL}/api/food_category/get_list`
    );
    categories.value = response.food_categories;
  } catch (error) {
    console.log(error);
  }
};

const fetchFoodItemDetails = async (recorId = 0) => { // GET FOOD CATEGORY DETAILS
    try {
        const response = await $fetch<{ foodItem_details: foodItemDetails[] }>(
            `${API_BASE_URL}/api/food_item/get_fooditem_details/${recorId}`
        );

        name.value = response.foodItem_details[0].name;
        code.value = response.foodItem_details[0].code;
        description.value = response.foodItem_details[0].description;
        price.value = response.foodItem_details[0].price;
        selectedCategory.value = response.foodItem_details[0].category_id;
        image_src.value = `${API_BASE_IMAGE_URL}/${(response.foodItem_details[0].image_path) ? response.foodItem_details[0].image_path : 'food-placeholder.png'}`;
        active.value = response.foodItem_details[0].active;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    if (recordid.value == 0) {
        setImageDefault();
    } else {
        fetchFoodItemDetails(recordid.value);
    }
    fetchCategories();
});

const getRecord = async () => {
    try {
        const formData = new FormData();
        formData.append('id', recordid.value);
        formData.append('name', name.value);
        formData.append('code', code.value);
        formData.append('price', price.value);
        formData.append('description', description.value);
        formData.append('image_path', image_path.value);
        formData.append('category_id', selectedCategory.value);

        if (active.value) {
            formData.append('active', 'true');
        } else {
            formData.append('active', 'false');
        }
        const data = (recordid.value != 0) ? await editRecord(formData) : await submitNewRecord(formData);

    } catch (error) {
        console.log(error);
    }
};

const submitNewRecord = async (data: any) => {
    const response = await $fetch(`${API_BASE_URL}/api/food_item/insert_record`, {
        method: "POST",
        body: data,
        headers: {
            Accept: "application/json",
        },
    });

    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Added Successfully!', life: 3000 });
    clearfields();
};

const onFileChange = async (e: any) => {

    if (e.target.files && e.target.files[0]) {
        image_path.value = e.target.files[0];
        console.log(image_path.value);
        image_src.value = URL.createObjectURL(image_path.value);
    }
};

const editRecord = async (data) => {
    try {
        const response = await $fetch(`${API_BASE_URL}/api/food_item/update_record`, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            },
        });
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Updated Successfully!', life: 3000 });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const clearfields = () => {
    name.value = null;
    price.value = null;
    description.value = null;
    active.value = true;
    image_path.value = true;
    setImageDefault();
}

const setImageDefault = () => {
    image_src.value = `${API_BASE_IMAGE_URL}/food-placeholder.png`;
}

</script>
<template>
    <div>
        <Toast />
        <Panel header="Add Food Item">
            <form @submit.prevent="getRecord">
                <div class="card m-5">
                    <div class="grid gap-8 2xl:grid-cols-2 md:grid-cols-2 mb-5">
                        <div>
                            <div class="mb-7">
                                <Panel header="Upload Food Image" class="p-0">
                                    <Input type="file" @change="onFileChange" id="cover_image" class="2xl:w-2/4 xl:w-2/4 lg:w-2/4 md:w-2/4 w-full" />
                                </Panel>
                            </div>
                            <div>
                                <label for="name" class="block font-semibold">Name <span class="text-red-600">*</span></label>
                                <InputText id="name" class="w-full" v-model="name" required />
                            </div>
                            <div>
                                <label for="code" class="block font-semibold">Code <span class="text-red-600">*</span></label>
                                <InputText id="code" class="w-full" v-model="code" required />
                            </div>
                            <div>
                                <label for="price" class="block font-semibold">Price</label>
                                <InputNumber v-model="price" inputId="locale-us" locale="en-US" :minFractionDigits="2"
                                    class="w-full"/>
                            </div>
                            <div>
                                <label for="active" class="block font-semibold">Active</label>
                                <InputSwitch v-model="active" />
                            </div>
                            <div>
                                <label for="description" class="block font-semibold">Description</label>
                                <Textarea id="description" class="w-full" autoResize v-model="description" rows="5" />
                            </div>
                            <div>
                                <label for="category_id" class="block font-semibold">Add to Category</label>
                                <Dropdown id="category_id" v-model="selectedCategory" showClear filter :options="categories" optionValue="id" optionLabel="name" placeholder="Select a Category" class="w-full md:w-14rem"/>
                            </div>
                        </div>
                        <div>
                            <div class="w-full">
                                <Panel header="Preview">
                                    <div class="flex flex-column pt-1 pb-1 gap-3">
                                        <div class="w-2/4 card flex justify-center">
                                            <Image :src="`${image_src}`" :alt="name"
                                                class="block xl:block border-round w-full; margin: auto" preview />
                                        </div>
                                        <div class="w-2/4 justify-content-between md:align-items-center flex-1 gap-4">
                                            <div class="font-bold text-xs">{{ (code) ? code : 'A0' }} : {{ (name) ? name : 'Enter Food Item Name' }}
                                            </div>
                                            <span class="font-semibold text-xs">
                                                <i class="pi pi-tag" style="font-size: 1rem"></i>  {{ (price) ? currency.format(price) : '0.00' }}
                                            </span>
                                            <p class="text-xs m-2 font-normal">{{ (description) ? description : 'Enter Description' }}</p>
                                        </div>
                                    </div>
                                </Panel>
                            </div>
                        </div>


                    </div>
                    <Button type="submit" :label="(recordid == '0') ? 'Submit' : 'Save'" class="ml-1 mr-1" />
                    <router-link to="/admin/item" target="_self" rel="noopener">
                        <Button label="Cancel" class="ml-1 mr-1" severity="danger" />
                    </router-link>
                </div>
            </form>
        </Panel>
    </div>
</template>