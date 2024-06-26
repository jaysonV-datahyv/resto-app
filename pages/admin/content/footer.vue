<template>
    <div>
        <Toast />
        <ConfirmDialog class="2xl:w-1/5 sm:w-auto"></ConfirmDialog>

        <Panel header="Page Footer">
            <div class="grid gap-8 2xl:grid-cols-2 md:grid-cols-2 mb-5">
                <div> 
                    <Editor ref="editorRef" v-model="sys_property_value" editorStyle="min-height: 320px"></Editor>
                </div>
                <div>
                    <div class="w-full">
                        <Panel header="Preview">
                            <Panel class="rounded-none" style="background-color: rgb(51 65 85);">
                                <div class="m-0 text-white" v-html="sys_property_value"></div>
                            </Panel>                           
                        </Panel>
                    </div>
                </div>
            </div>
            <Button type="submit" :label="'Save'" class="ml-1 mr-1" @click="editRecord()" />
        </Panel>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "admin"
});
import Editor from 'primevue/editor';
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const sys_property_value = ref('');
const editorRef = ref('');

const fetchSysProp = async () => { // GET FOOD CATEGORIES
    try {
        const response = await $fetch<{ system_property: systemProperty[] }>(
        `${API_BASE_URL}/api/admin/page_content/get_system_property/2`
        );
        sys_property_value.value = response.system_property[0]['value'];
        
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchSysProp();
});

watch(editorRef, (editor) => {
 if (!editor) return
   editor.renderValue = function renderValue(value = sys_property_value.value) {
     if (this.quill) {
       if (value) {
         const delta = this.quill.clipboard.convert({ html: value })
         this.quill.setContents(delta, 'silent')
       } else {
         this.quill.setText('')
      }
  }
 }.bind(editor) // Bind needed for production build
})

const editRecord = async () => {
    let data = JSON.stringify({
        'value': sys_property_value.value,
    });

    try {
        const response = await $fetch(`${API_BASE_URL}/api/admin/page_content/update_system_property/2`, {
            method: "PUT",
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

</script>
<style>
div#client-headings h1 {
    font-size: 3rem; /* 48px */
    line-height: 1;
}
</style>