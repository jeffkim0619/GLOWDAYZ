<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-4">
        <!-- 이름 -->
        <div class="field grid">
          <label for="name" class="col-fixed" style="width: 100px">Name</label>
          <div class="col">
            <InputText
              v-model:modelValue="name"
              class="w-full"
              :class="[{ 'p-invalid': isNameError }]"
            />
          </div>
        </div>
        <!-- 이름 -->
        <!-- 핸드폰 -->
        <div class="field grid">
          <label for="phone" class="col-fixed" style="width: 100px"
            >Phone</label
          >
          <div class="col">
            <InputText
              v-model:modelValue="phone"
              class="w-full"
              :class="[{ 'p-invalid': isPhoneError }]"
            />
          </div>
        </div>
        <!-- 핸드폰 -->
        <!-- 이메일 -->
        <div class="field grid">
          <label for="email" class="col-fixed" style="width: 100px"
            >Email</label
          >
          <div class="col">
            <InputText
              v-model:modelValue="email"
              class="w-full"
              :class="[{ 'p-invalid': isMailError }]"
            />
          </div>
        </div>
        <!-- 이메일 -->
      </div>
    </div>
    <div class="flex mt-5 align-items-center justify-content-center">
      <span class="error-text" v-if="textError">{{ errorMsg }}</span>
      <div class="card error-text" v-else>
        <ul v-if="isPhoneError">
          <li>휴대폰 번호는 다음과 같은 형식을 허용합니다.</li>
          <li>01 로 시작하는 10 ~ 11자리 숫자</li>
          <li>(하이픈)과 공백은 허용</li>
          <li>숫자와 하이픈, 공백 이외의 문자는 허용하지 않습니다</li>
          <li>0111231234 ⭕</li>
          <li>01012341234 ⭕</li>
          <li>010-1234-1234 ⭕</li>
          <li>010-12341234 ⭕</li>
          <li>0101234 1234 ⭕</li>
          <li>010 234-1234 ⭕</li>
          <li>010+1234+1234 ❌</li>
        </ul>
        <ul v-if="isMailError">
          <li>mymail@glowpick.com ⭕</li>
          <li>mymail+second@glowpick.com ⭕</li>
          <li>mymail+glowpuck.com ❌</li>
        </ul>
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
import constant from "@/common/constant.js";
export default {
  emits: ["next-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const name = ref("");
    const textError = ref(true);
    const isNameError = ref(false);
    const phone = ref("");
    const isPhoneError = ref(false);
    const email = ref("");
    const isMailError = ref(false);
    const errorMsg = ref("");

    //페이지 이동
    const nextPage = () => {
      if (!checkValidation()) {
        return;
      }
      emit("next-page", {
        formData: {
          name: name.value,
          phone: phone.value,
          email: email.value,
        },
        pageIndex: 0,
      });
      isNameError.value = false;
      isPhoneError.value = false;
      isMailError.value = false;
      textError.value = true;
      errorMsg.value = "";
    };
    const checkValidation = () => {
      //정규식 정리
      const reg_name = /^[가-힣a-zA-Z]+$/;
      const reg_phone = /^01([0-9][-\s])?([0-9]{3,4})([-\s])?([0-9]{4})$/;
      const reg_num = /^[0-9]+$/;
      const reg_email =
        /^[0-9a-zA-Z]([\W]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      let phoneNum = phone.value.replace(/-/gi, "");
      phoneNum = phoneNum.replace(/ /gi, "");
      if (name.value.trim() === "") {
        isNameError.value = true;
        textError.value = true;
        isPhoneError.value = false;
        isMailError.value = false;
        errorMsg.value = constant.errorMsg.NODATA;
        name.value = "";
        return false;
      } else if (name.value.length < 3 || !reg_name.test(name.value)) {
        isNameError.value = true;
        textError.value = true;
        isPhoneError.value = false;
        isMailError.value = false;
        errorMsg.value = constant.errorMsg.NAMEERROR;
        name.value = "";
        return false;
      } else if (phone.value.trim() === "") {
        textError.value = false;
        isNameError.value = false;
        isMailError.value = false;
        isPhoneError.value = true;
        phone.value = "";
        return false;
      } else if (!reg_num.test(phoneNum) || phoneNum.length < 10 || phoneNum.length > 11 || !reg_phone.test(phone.value)) {
        textError.value = false;
        isNameError.value = false;
        isMailError.value = false;
        isPhoneError.value = true;
        return false;
      } else if (email.value.trim() === "") {
        textError.value = false;
        isNameError.value = false;
        isPhoneError.value = false;
        isMailError.value = true;
        email.value = "";
        return false;
      } else if (!reg_email.test(email.value)) {
        textError.value = false;
        isNameError.value = false;
        isPhoneError.value = false;
        isMailError.value = true;
        return false;
      }
      return true;
    };
    return {
      name,
      phone,
      email,
      errorMsg,
      textError,
      isNameError,
      isPhoneError,
      isMailError,
      nextPage,
    };
  },
};
</script>

<style>
</style>