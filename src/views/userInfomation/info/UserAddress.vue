<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 우편번호 -->
        <div class="flex align-items-center justify-content-start p-inputgroup">
          <InputText
            placeholder="우편번호"
            :modelValue="postal"
            :class="[{ 'p-invalid': isNosearch }]"
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
            :class="[{ 'p-invalid': isNosearch }]"
            :readonly="true"
          />
        </div>
        <!-- 주소 -->
        <!-- 상세주소 -->
        <div class="flex mt-3 align-items-center justify-content-start">
          <InputText
            placeholder="상세주소"
            id="detail"
            @keyup.enter="nextPage"
            v-model:modelValue="detailAddress"
            class="w-full"
            :class="[{ 'p-invalid': isNoDetail }]"
          />
        </div>
        <!-- 상세주소 -->
      </div>
    </div>
    <!-- Error -->
    <div class="flex mt-5 align-items-center justify-content-center">
      <span class="error-text" v-if="isEmpty">{{ errorMsg }}</span>
    </div>
    <!-- Error -->
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
import constant from "@/common/constant.js";
export default {
  components: {
    VueDaumPostcode,
  },
  emits: ["prev-page", "next-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const address = ref("");
    const detailAddress = ref("");
    const postal = ref("");

    const display = ref(false);

    const isNosearch = ref(false);
    const isNoDetail = ref(false);
    const isEmpty = ref(false);

    const errorMsg = ref("");
    const searchAddress = () => {
      display.value = true;
      console.log("test");
    };

    //카카오 맵에서 주소 선택 했을 경우
    const oncomplete = (response) => {
      console.log(response);
      if (response.userSelectedType === "R") {
        address.value = response.roadAddress;
      } else {
        address.value = response.jibunAddress;
      }
      postal.value = response.zonecode;
      document.getElementById('detail').focus();
      display.value = false;
    };

    //다음 페이지 이동
    const nextPage = () => {
      if (!checkValidation()) {
        return;
      }
      emit("next-page", {
        formData: {
          address: {
            addr1: address.value,
            addr2: detailAddress.value,
            postal: postal.value,
          },
        },
        pageIndex: 1,
      });
      isNosearch.value = false;
      isNoDetail.value = false;
      isEmpty.value = false;
      errorMsg.value = "";
    };

    //이전 페이지로 이동
    const prevPage = () => {
      emit("prev-page", { pageIndex: 1 });
    };

    //유효성 검증
    const checkValidation = () => {
      if (address.value === "" || postal.value === "") {
        isNosearch.value = true;
        isNoDetail.value = false;
        isEmpty.value = true;
        errorMsg.value = constant.errorMsg.NODATA;
        return false;
      } else if (detailAddress.value === "") {
        isNosearch.value = false;
        isNoDetail.value = true;
        isEmpty.value = true;
        errorMsg.value = constant.errorMsg.NODATA;
        return false;
      }
      return true;
    };
    return {
      address,
      display,
      detailAddress,
      isEmpty,
      errorMsg,
      isNosearch,
      isNoDetail,
      postal,
      searchAddress,
      oncomplete,
      nextPage,
      prevPage,
    };
  },
};
</script>

<style>
</style>