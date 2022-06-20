<template>
  <div class="grid">
    <div class="col-12">
      <div class="card mt-5 mb-0 keep-all justify-center">
        <div class="flex">
          <div
            class="
              flex
              align-items-center
              justify-content-center
              font-bold
              text-white
              m-2
              px-5
              py-3
              border-round
            "
          >
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="초기화"
              class="p-button-outlined h-96"
              @click="initFilters"
            />
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              font-bold
              text-white
              py-3
              border-round
            "
          >
            <Dropdown
              v-model="selectSortRating"
              :options="sortRatingAvg"
              @change="searchKeyword(0)"
              optionLabel="name"
              optionValue="code"
              placeholder="평점순"
            />
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              font-bold
              text-white
              m-2
              py-3
              border-round
            "
          >
            <Dropdown
              v-model="selectFilterRating"
              :options="filterRatingAvg"
              @change="searchKeyword(1)"
              optionLabel="name"
              optionValue="code"
              placeholder="평점기준"
            />
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              font-bold
              text-white
              py-3
              border-round
            "
          >
            <div class="p-inputgroup">
              <InputText
                placeholder="Keyword"
                v-model="keyword"
                @input="realTimeSearch($event.target.value)"
                @keydown.enter="searchKeyword(2)"
              />
              <Button
                label="검색"
                class="bg-indigolight"
                @click="searchKeyword"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from "@vue/runtime-core";
import { debounce } from 'lodash';
export default {
  props: {
    sortRatingAvg: {
      type: Array,
    },
    filterRatingAvg: {
      type: Array,
    },
  },
  emits: ["initFilters", "search"],
  setup() {
    const selectSortRating = ref();
    const selectFilterRating = ref();
    const keyword = ref("");
    const { emit } = getCurrentInstance();

    //최종 검색
    const searchKeyword = (no) => {
      emit("search", {
        no:no,
        sort: selectSortRating.value,
        filter: selectFilterRating.value,
        keywords: keyword.value.trim(),
      });
    };

    //초기화
    const initFilters = () => {
      selectSortRating.value = "";
      selectFilterRating.value = "";
      keyword.value = "";
      emit("initFilters");
    };

    //입력과 동시에 실행
    const realTimeSearch = debounce((v) => {
        if(v.trim().length >= 2){
            keyword.value = v.trim();
            searchKeyword(2);
        }
    }, 1000) 

    return {
      selectSortRating,
      selectFilterRating,
      keyword,
      searchKeyword,
      initFilters,
      realTimeSearch,
    };
  },
};
</script>

<style>
</style>
