export const getProductItemList =  {
    getProductList() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Jelly Fish Chicken Japanese Cucumber Salad with a Sesasame Dressing',
                description: 'Product Description',
                image: '/_nuxt/assets/images/chiken_1.jpg',
                price: 540.00,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'AVAILABLE',
                rating: 5
            },
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'General Tso\'s Chicken',
                description: 'Product Description',
                image: '/_nuxt/assets/images/food-placeholder.png',
                price: 650.00,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'NOT AVAILABLE',
                rating: 5
            },
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Braised Pata wih Jelly Fish',
                description: 'Product Description',
                image: '/_nuxt/assets/images/pork_1.jpg',
                price: 765.00,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'AVAILABLE',
                rating: 5
            },
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Hot & Sour Soup',
                description: 'Product Description',
                image: '/_nuxt/assets/images/soup_1.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'AVAILABLE',
                rating: 5
            },
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Sweet Corn Chicken Egg Drop Soup',
                description: 'Product Description',
                image: '/_nuxt/assets/images/soup_2.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'AVAILABLE',
                rating: 5
            }
        ]            
    },
    getProducts() {
        return Promise.resolve(this.getProductList());
    }
    
}

export const getFoodCategoryAndItem =  {
    getItemList() {
        const fetchBooks = async () => {
        try {
            isLoading.value = true;
            const response = await $fetch<{ books: BookProps[] }>(
            `${process.env.API_BASE_URL}/food_category/get_list`
            );       
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
        };

        return [
            
        ]            
    },
    getItemList() {
        return Promise.resolve(this.getProductList());
    }
    
}