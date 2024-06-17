<template>
  <div class="lg:hidden xl:hidden">
    <div class="pl-4 pr-4 mb-5">
      <Dropdown v-model="selectedCategory" showClear :options="categories" filter optionLabel="name"
        placeholder="Select a Category" class="w-full md:w-14rem" />
    </div>
    <div v-for="item in products" class="mb-2 pl-4 pr-4">
      <h1 class="font-bold">{{ item.name }}</h1>
      <DataView :value="item.food_items">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div class="flex flex-wrap">
              <div v-for="(item, index) in slotProps.items" :key="index" class="md:w-1/2 w-full">
                <div class="flex flex-column pt-1 pb-1 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                  <div class="w-2/4 card flex justify-center">
                    <Image :src="`${API_BASE_URL}/public/images/${(item.image_path) ? item.image_path : 'food-placeholder.png'}`" :alt="item.name"
                      class="block xl:block border-round w-full; margin: auto" preview />
                  </div>
                  <div class="w-2/4 justify-content-between md:align-items-center flex-1 gap-4">
                    <div class="font-bold text-xs">{{ item.name }}</div>
                    <span class="font-semibold text-xs"><i class="pi pi-tag" style="font-size: 1rem"></i> {{ item.price }}</span>
                    <p class="text-xs m-2 font-normal">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: "menulist"
});

const isLoading = ref(false);
const selectedCategory = ref();
const categories = ref<foodCategory[]>([]);
// const categories = ref([]);
const products = ref<menuCategoryFoodItems[]>([]);

const fetchCategories = async () => { // GET FOOD CATEGORIES
  try {
    isLoading.value = true;
    const response = await $fetch<{ food_categories: foodCategory[] }>(
      `${API_BASE_URL}/api/food_category/get_list`
    );
    categories.value = response.food_categories;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const fetchCategoriesFoodItems = async () => { // GET FOOD CATEGORIES & ITEMS
  try {
    isLoading.value = true;
    const response = await $fetch<{ food_categories: menuCategoryFoodItems[] }>(
      `${API_BASE_URL}/api/food_category/get_category_food_list`
    );
    products.value = response.food_categories;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
  fetchCategoriesFoodItems();
});
</script>

<style>
  div[data-pc-section="emptymessage"] {
    font-style: italic;
    color: #dc3545;
  }
</style>