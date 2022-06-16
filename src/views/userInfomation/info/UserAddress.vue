<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 우편번호 -->
        <div class="flex align-items-center justify-content-start p-inputgroup">
          <InputText
            placeholder="우편번호"
            :modelValue="postal"
            :readonly="true"
          />
          <Button
            label="주소검색"
            class="bg-indigolight p-inputgroup-addon"
            @click="searchAddress"
          />
        </div>
        <!-- 우편번호 -->
        <!-- 주소 -->
        <div class="flex mt-3 align-items-center justify-content-start">
          <InputText
            placeholder="주소"
            :modelValue="address"
            class="w-full"
            :readonly="true"
          />
        </div>
        <!-- 주소 -->
        <!-- 상세주소 -->
        <div class="flex mt-3 align-items-center justify-content-start">
          <InputText
            placeholder="상세주소"
            v-model:modelValue="detailAddress"
            class="w-full"
          />
        </div>
        <!-- 상세주소 -->
      </div>
    </div>
    <!-- foot -->
    <div class="flex mt-3 align-items-center justify-content-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"></Button>
      <Button
        label="Next"
        @click="nextPage()"
        icon="pi pi-angle-right"
        icon-pos="right"
      ></Button>
    </div>
    <!-- foot -->
    <!-- 카카오주소 -->
    <div class="post-daum-address">
      <Dialog
        header="주소검색"
        v-model:visible="display"
        :breakpoints="{ '1080px': '75vw', '720px': '100vw' }"
        :style="{ width: '30vw' }"
        :modal="true"
        class=""
        :dismissableMask="true"
      >
        <VueDaumPostcode @complete="oncomplete" />
      </Dialog>
    </div>
    <!-- 카카오주소 -->
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { VueDaumPostcode } from "vue-daum-postcode";
export default {
  components: {
    VueDaumPostcode,
  },
  emits: ["prev-page", "next-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const display = ref(false);
    const address = ref("");
    const postal = ref("");
    const detailAddress = ref("");
    const searchAddress = () => {
      display.value = true;
      console.log("test");
    };
    const oncomplete = (response) => {
      console.log(response);
      if (response.userSelectedType === "R") {
        address.value = response.roadAddress;
      } else {
        address.value = response.jibunAddress;
      }
      postal.value = response.zonecode;
      display.value = false;
    };

    //페이지 이동
    const nextPage = () => {
      emit("next-page", {
        formData: {
          address: address.value,
          postal: postal.value,
          detailAddress:detailAddress.value
        },
        pageIndex: 1,
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 1 });
    };
    return {
      searchAddress,
      oncomplete,
      display,
      nextPage,
      prevPage,
      address,
      postal,
      detailAddress,
    };
  },
};
</script>

<style>
</style>