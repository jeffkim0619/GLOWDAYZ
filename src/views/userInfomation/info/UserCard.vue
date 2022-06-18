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
              @keyup.enter="complete"
              class="w-full"
              :class="[{ 'p-invalid': isCardNmError }]"
            />
          </div>
        </div>
        <!-- 카드 -->
      </div>
    </div>

    <div class="flex mt-5 align-items-center justify-content-center">
      <div v-if="isError">
        <ul class="error-text">
          <li>{{ errorMsg }}</li>
          <li>자리 구분 없이 숫자만 사용하는 경우</li>
          <li>네 자리씩 하이픈으로만 구분하는 경우</li>
          <li>네 자리씩 공백으로만 구분하는 경우</li>
        </ul>
      </div>
      <span class="error-text" v-else>{{ errorMsg }}</span>
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
import constant from "@/common/constant.js";
export default {
  emits: ["complete", "prev-page"],
  setup() {
    const { emit } = getCurrentInstance();
    const cardNum = ref("");
    const errorMsg = ref("");
    const isCardNmError = ref(false);
    const isError = ref(false);

    //최종 제출 페이지 이동
    const complete = () => {
      if (!checkValidation()) {
        return;
      }
      emit("complete", {
        formData: {
          cardNum: cardNum.value,
        },
      });
      cardNum.value = "";
      errorMsg.value = "";
      isCardNmError.value = false;
    };

    //이전 페이지 이동
    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };

    //유효성 검증
    const checkValidation = () => {
      //정규식 정리
      const reg_onlyNum = /^([0-9]{16})$/;
      const reg_onlyHyphen =
        /^([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})([-])([0-9]{4})$/;
      const reg_onlyBlank =
        /^([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})([\s])([0-9]{4})$/;

      let isNoerror =
        reg_onlyHyphen.test(cardNum.value) ||
        reg_onlyBlank.test(cardNum.value) ||
        reg_onlyNum.test(cardNum.value);

      //공백 제거
      let replaceBlank = cardNum.value.replace(/ /gi, "");
      //하이픈 제거
      let replaceHyphen = replaceBlank.replace(/-/gi, "");

      //숫자 뒤집기
      let reverseNum = replaceHyphen.split("").reverse();
      let oddSum = 0;
      let evenSum = 0;
      for (let i = 0; i < reverseNum.length; i++) {
        const element = reverseNum[i];
        if ((i + 1) % 2 === 0) {
          evenSum += evenConvert(element);
          console.log(i + 1 + " even> ", element);
        } else {
          console.log("odd> ", element);
          oddSum += parseInt(element);
        }
      }

      //짝수 합, 홀수 합, 전체 합 로그
      console.log("evenSum : ", evenSum);
      console.log("oddSum : ", oddSum);
      console.log("AllSum : ", oddSum + evenSum);

      //검증
      if (cardNum.value.trim() === "") {
        isCardNmError.value = true;
        errorMsg.value = constant.errorMsg.NODATA;
        isError.value = false;
        return false;
      } else if (!isNoerror) {
        isCardNmError.value = true;
        isError.value = true;
        errorMsg.value = constant.errorMsg.HBERROR;
        return false;
      } else if ((oddSum + evenSum) % 10 !== 0) {
        isCardNmError.value = true;
        isError.value = false;
        errorMsg.value = constant.errorMsg.CARDNUMERROR;
        return false;
      }

      //reverse 하지 않고 계산
      // let originNum = replaceHyphen.split("");
      // let orEvenSum = 0;
      // let orOddSum = 0;
      // for (let i = 0; i < originNum.length; i++) {
      //   const element = originNum[i];
      //   if (i % 2 === 0) {
      //     orOddSum += oddConvert(element);
      //   } else {
      //     orEvenSum += parseInt(element);
      //   }
      // }
      // 정상

      errorMsg.value = "";
      return true;
    };

    //뒤에서 짝수합 구하기
    const evenConvert = (odd) => {
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
      isError,
      complete,
      prevPage,
    };
  },
};
</script>

<style>
</style>