<template>
  <div class="card">
    <div class="card card-w-title">
      <div>
        <div class="card">
          <Steps :model="items" :readonly="true" />
        </div>

        <router-view
          v-slot="{ Component }"
          :formData="formObject"
          @prevPage="prevPage($event)"
          @nextPage="nextPage($event)"
          @complete="complete"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
  <div>
    <Dialog
      header="최종입력 사항"
      :visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
      :dismissableMask="true"
      :closable="false"
    >
      {{ formObject }}
      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <Button
            type="button"
            label="닫기"
            class="bg-indigolight w-2"
            @click="closed"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Detail from "@/views/userInfomation/info/UserDetail.vue";
import Address from "@/views/userInfomation/info/UserAddress.vue";
import Payment from "@/views/userInfomation/info/UserCard.vue";
export default {
  components: {
    Detail,
    Address,
    Payment,
  },
  setup() {
    const router = useRouter();
    const display = ref(false);
    const items = ref([
      {
        label: "Detail",
        to: "/userInfomation/detail",
      },
      {
        label: "Address",
        to: "/userInfomation/address",
      },
      {
        label: "Payment",
        to: "/userInfomation/card",
      },
    ]);
    let formObject = {};

    //다음페이지 이동 (이전 페이지 값(변경 포함) 추가)
    const nextPage = (event) => {
      for (let field in event.formData) {
        formObject[field] = event.formData[field];
      }
      router.push(items.value[event.pageIndex + 1].to);
    };

    //이전페이지 이동
    const prevPage = (event) => {
      router.push(items.value[event.pageIndex - 1].to);
    };

    //최종값 모달 화면
    const complete = (event) => {
      for (let field in event.formData) {
        formObject[field] = event.formData[field];
      }
      //로그 json 뷰티
      console.log(JSON.stringify(formObject, null, 4));
      display.value = true;
    };

    //모달창 닫기 (전체 페이지 새로고침)
    const closed = () => {
      window.location.reload();
    }

    return {
      items,
      formObject,
      display,
      nextPage,
      prevPage,
      complete,
      closed,
    };
  },
};
</script>

<style>
</style>