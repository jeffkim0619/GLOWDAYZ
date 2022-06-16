<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 카드 -->
        <div class="field grid">
          <label for="cardNum" class="col-fixed">Card Number</label>
          <div class="col">
            <InputText v-model:modelValue="cardNum" class="w-full" />
          </div>
        </div>
        <!-- 카드 -->
      </div>
    </div>

    <!-- foot -->
    <div class="grid grid-nogutter justify-content-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"></Button>
      <Button
        label="Complete"
        @click="complete()"
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
  emits: ["prev-page", "complete"],
  setup() {
    const { emit } = getCurrentInstance();
    const cardNum = ref("");

    //페이지 이동
    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };
    const complete = () => {
      emit("complete", {
        formData: {
          creditNumber:cardNum.value
        }
      });
    };

    return {
      cardNum,
      prevPage,
      complete,
    };
  },
};
</script>

<style>
</style>