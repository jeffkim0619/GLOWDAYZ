<template>
  <div class="card">
    <div class="flex mt-5 align-items-center justify-content-center">
      <div class="h-16rem w-3">
        <!-- 카드 -->
        <div class="field grid">
          <label for="cardNum" class="col-fixed">Card Number</label>
          <div class="col">
            <InputText
              v-model:modelValue="cardNum"
              class="w-full"
              :class="[{ 'p-invalid': isCardNmError }]"
            />
          </div>
        </div>
        <!-- 카드 -->
      </div>
    </div>

    <div class="flex mt-5 align-items-center justify-content-center">
      <span class="error-text">{{ errorMsg }}</span>
    </div>

    <!-- foot -->
    <div class="grid grid-nogutter justify-content-between">
      <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"></Button>
      <Button
        label="Next"
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
  emits: ["next-page", "prev-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const cardNum = ref("");
    const errorMsg = ref("");
    const isCardNmError = ref(false);

    //페이지 이동
    const complete = () => {
      if (!checkValidation()) {
        return;
      }
      emit("complete", {
        formData: {
          cardNum: cardNum.value,
        },
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };
    const checkValidation = () => {
      const reg_onlyNum = /^([0-9]{16})$/;
      const reg_onlyHyphen =
        /^([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})$/;
      const reg_onlyBlank =
        /^([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})$/;
      console.log("숫자", reg_onlyNum.test(cardNum.value.trim()));
      console.log("하이픈", reg_onlyHyphen.test(cardNum.value.trim()));
      console.log("공백", reg_onlyBlank.test(cardNum.value.trim()));
      console.log(
        "3 테스트 ",
        reg_onlyNum.test(cardNum.value) ||
          reg_onlyHyphen.test(cardNum.value) ||
          reg_onlyBlank.test(cardNum.value)
      );

      let isNoerror =
        reg_onlyNum.test(cardNum.value) ||
        reg_onlyHyphen.test(cardNum.value) ||
        reg_onlyBlank.test(cardNum.value);

      let replaceBlank = cardNum.value.replace(/ /gi, "");
      //   console.log("noBlank", replaceBlank);
      let replaceHyphen = replaceBlank.replace(/-/gi, "");
      //   console.log("noHyphen", replaceHyphen);
      let reverseNum = replaceHyphen.split("").reverse();
      let oddSum = 0;
      let evenSum = 0;
      for (let i = 0; i < reverseNum.length; i++) {
        const element = reverseNum[i];
        if (i % 2 === 0) {
          evenSum += parseInt(element);
          //   console.log("even : " + i + " : " + element);
        } else {
          oddSum += oddConvert(element);
          //   console.log("odd : " + i + " : " + element);
        }
      }
      console.log("evenSum : ", evenSum);
      console.log("oddSum : ", oddSum);
      //최종 합계 10의 배수 확인
      console.log("check : ", (oddSum + evenSum) % 10 === 0);

      //reverse 하지 않고 계산
      let originNum = replaceHyphen.split("");
      let orEvenSum = 0;
      let orOddSum = 0;
      for (let i = 0; i < originNum.length; i++) {
        const element = originNum[i];
        if (i % 2 === 0) {
          orOddSum += oddConvert(element);
        } else {
          orEvenSum += parseInt(element);
        }
      }
      console.log("orEvenSum : ", orEvenSum);
      console.log("orOddSum : ", orOddSum);
      console.log("check : ", (orOddSum + orEvenSum) % 10 === 0);
      if (cardNum.value.trim() === "") {
        isCardNmError.value = true;
        errorMsg.value = "빈문자열";
        return false;
      } else if (!isNoerror) {
        isCardNmError.value = true;
        errorMsg.value = "하이픈 또는 공백 이외의 특수문자";
        return false;
      } else if ((orOddSum + orEvenSum) % 10 !== 0) {
        isCardNmError.value = true;
        errorMsg.value = "카드번호 유효 하지 않음";
        return false;
      }

      errorMsg.value = "";
      return true;
    };

    const oddConvert = (odd) => {
      let num = 0;
      let fromNum = parseInt(odd);
      num = fromNum * 2;
      if (num >= 10) {
        let reNum = num.toString().split("");
        num = parseInt(reNum[0]) + parseInt(reNum[1]);
      }
      return num;
    };

    return {
      cardNum,
      errorMsg,
      isCardNmError,
      complete,
      prevPage,
    };
  },
};
</script>

<style>
</style>