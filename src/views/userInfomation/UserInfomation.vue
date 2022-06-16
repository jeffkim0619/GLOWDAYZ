<template>
  <div class="card">
    <div class="card card-w-title">
      <div>
        <Toast />
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
      v-model:visible="display"
      :breakpoints="{ '1080px': '75vw', '720px': '100vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
      class=""
      :dismissableMask="true"
    >
      {{ formObject }}
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
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
    const toast = useToast();
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
    const formObject = ref({});

    const nextPage = (event) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
        console.log(formObject.value[field]);
      }
      router.push(items.value[event.pageIndex + 1].to);
    };
    const prevPage = (event) => {
      router.push(items.value[event.pageIndex - 1].to);
    };
    const complete = () => {
      toast.add({
        severity: "success",
        summary: "Order submitted",
        detail:
          "Dear, " +
          formObject.value.firstname +
          " " +
          formObject.value.lastname +
          " your order completed.",
      });
      display.value = true;
    };

    return {
      items,
      formObject,
      display,
      nextPage,
      prevPage,
      complete,
    };
  },
};
</script>

<style>
</style>