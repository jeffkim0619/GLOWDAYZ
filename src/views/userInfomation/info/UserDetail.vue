<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 이름 -->
        <div class="field grid">
          <label for="name" class="col-fixed" style="width: 100px">Name</label>
          <div class="col">
            <InputText v-model:modelValue="name" class="w-full" />
          </div>
        </div>
        <!-- 이름 -->
        <!-- 핸드폰 -->
        <div class="field grid">
          <label for="phone" class="col-fixed" style="width: 100px"
            >Phone</label
          >
          <div class="col">
            <InputText v-model:modelValue="phone" class="w-full" />
          </div>
        </div>
        <!-- 핸드폰 -->
        <!-- 이메일 -->
        <div class="field grid">
          <label for="email" class="col-fixed" style="width: 100px"
            >Email</label
          >
          <div class="col">
            <InputText v-model:modelValue="email" class="w-full" />
          </div>
        </div>
        <!-- 이메일 -->
      </div>
    </div>
    <!-- foot -->
    <div class="grid grid-nogutter justify-content-between">
      <i></i>
      <Button
        label="Next"
        @click="nextPage()"
        icon="pi pi-angle-right"
        icon-pos="right"
      ></Button>
    </div>
    <!-- foot -->
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
export default {
  emits: ["next-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const name = ref("");
    const phone = ref("");
    const email = ref("");

    //페이지 이동
    const nextPage = () => {
      emit("next-page", {
        formData: {
          name: name.value,
          phone: phone.value,
          email: email.value,
        },
        pageIndex: 0,
      });
    };
    return {
      name,
      phone,
      email,
      nextPage,
    };
  },
};
</script>

<style>
</style>