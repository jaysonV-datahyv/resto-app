<template>
    <div>
        <Toast />
        <div class="p-12 text-center ">
            <div class="mb-24 text-white">
                <p class="mt-5 text-2xl font-bold drop-shadow-2xl border-black">Welcome to</p>
                <h1 class="xl:text-8xl text-6xl font-bold mb-12 drop-shadow-2xl">EZ Eats</h1>
            </div>
            <div class="mt-12">
                <Panel class="shadow-2xl xl:p-4 sm:p-2 xl:w-1/4 md-1/2 sm:w-full xl:m-auto sm:m-0">
                    <div class="rounded-full bg-white -mt-32 inline-flex shadow-lg p-4 border border-slate-300">
                        <Image src="/images/ez_eats_logo.png" alt="EZ Eats Logo" class="xl:w-48 lg:w-44 md:w-40 w-32" />
                    </div>
                    <form @submit.prevent="validate_login">
                        <div class="card mt-7">
                            <div class="grid gap-3 mb-5 text-left">
                                <div>
                                    <label for="name" class="block font-semibold">Email: </label>
                                    <InputText type="email" id="name" class="w-full" v-model="email" placeholder="Enter Email" required/>
                                </div>
                                <div>
                                    <label for="password" class="block font-semibold">Password: </label>
                                    <Password v-model="password" class="w-full" id="password" placeholder="Enter Password" toggleMask :feedback="false" required/>                                    
                                    <router-link to="/" target="_blank" rel="noopener">                                        
                                        <label class="text-sm text-slate-600 hover:text-blue-500 hover:underline">Forgot Password?</label>
                                    </router-link>
                                </div> 
                                <div>
                                    <Checkbox id="accept" v-model="accept" name="accept" value="Accept" required/>
                                    <label for="accept" class="ml-3">I agree to the terms and conditions.</label>
                                </div> 
                                <Button type="submit" label="Submit" class="mt-5" /> 
                            </div>
                        </div>                        
                    </form>
                </Panel>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css';
const router = useRouter();
const password = ref();
const email = ref();
const accept = ref(false);
const toast = useToast();

const validate_login = async () => {
    try {
        const formData = new FormData();
        formData.append('email', email.value);
        formData.append('password', password.value);
        const data = login(formData);
    } catch (error) {
        console.log(error);
    }
};

const login = async (data: any) => {
    const response = await $fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        body: data,
        headers: {
            Accept: "application/json",
        },
    });

    if(response['Status'] == "Success") {        
        USER_SESSION.value = response['Data'];
        console.log(response['Data']);
        router.push(`/admin/category`);
    }else{
        toast.add({ severity: 'error', summary: 'Failed', detail: response['Message'], life: 3000 });
    }

};
</script>
<style>
div#password input {
    width: 100% !important;
}
</style>