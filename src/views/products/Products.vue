<template>
  <div class="card">
    <h5>제품 정보</h5>
    <DataTable
      :value="products"
      :sortField="sortRating"
      :sortOrder="sortOrder"
      v-model:filters="filters"
      :defaultSortOrder="-1"
      :rowHover="true"
      showGridlines
    >
      <template #header>
        <TableHeader
          :sortRatingAvg="sortRatingAvg"
          :filterRatingAvg="filterRatingAvg"
          @search="searchKeyword"
          @initFilters="initFilter"
        />
      </template>
      <template #empty> No Product found. </template>
      <template #loading> Loading Product data. Please wait. </template>

      <ColumnGroup type="header">
        <Row>
          <Column
            header="No."
            field="no"
            :rowspan="2"
            headerStyle="width: 5%"
          />
          <Column
            header="제품고유ID"
            field="idProduct"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="제품명"
            field="productTitle"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="제품사진"
            field="imageUrl"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="제품용량"
            field="volume"
            :rowspan="2"
            headerStyle="width: 5%"
          />
          <Column
            header="제품평점"
            field="ratingAvg"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="제품평가"
            field="ratingStatus"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="평가자수"
            field="reviewCount"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column
            header="제품가격"
            field="price"
            :rowspan="2"
            headerStyle="width: 10%"
          />
          <Column header="브랜드정보" :colspan="2" />
        </Row>
        <Row>
          <Column header="브랜드명" field="brand" headerStyle="width: 10%" />
          <Column
            header="브랜드사진"
            field="brandImg"
            headerStyle="width: 10%"
          />
        </Row>
      </ColumnGroup>
      <Column field="no" bodyStyle="text-align:center">
        <template #loading>
          <div
            :style="{
              height: '17px',
              'flex-grow': '1',
              overflow: 'hidden',
            }"
          >
            <Skeleton width="50%" height="1rem" />
          </div>
        </template>
        <template #body="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
      </Column>
      <Column field="idProduct" bodyStyle="text-align:center" />
      <Column field="productTitle" bodyStyle="text-align:center" />
      <Column field="imageUrl" bodyStyle="text-align:center">
        <template #body="{ data }">
          <img
            :src="data.imageUrl"
            :alt="data.productTitle"
            style="width: 100px"
          />
        </template>
      </Column>
      <Column field="volume" bodyStyle="text-align:end" />
      <Column field="ratingAvg" bodyStyle="text-align:center">
        <template #body="{ data }">
          <div class="tooltip">
            <Rating
              :modelValue="data.ratingAvg"
              :readonly="true"
              :cancel="false"
            />
            <span class="tooltiptext tooltip-bottom">{{ data.ratingAvg }}</span>
          </div>
        </template>
      </Column>
      <Column field="ratingStatus" bodyStyle="text-align:center">
        <template #body="{ data }">
          <Badge
            :value="data.ratingStatus"
            :severity="data.ratingStatus === '긍정적' ? 'success' : 'danger'"
          ></Badge>
        </template>
      </Column>
      <Column field="reviewCount" bodyStyle="text-align:end">
        <template #body="{ data }">
          {{ formatPrice(data.reviewCount) + " 명" }}
        </template>
      </Column>
      <Column field="price" bodyStyle="text-align:end">
        <template #body="{ data }">
          {{
            formatPrice(data.price) === "정보없음"
              ? formatPrice(data.price)
              : formatPrice(data.price) + "원"
          }}
        </template>
      </Column>
      <Column field="brand" bodyStyle="text-align:center">
        <template #body="{ data }">
          {{ data.brand.brandTitle }}
        </template>
      </Column>
      <Column field="brandImg" bodyStyle="text-align:center">
        <template #body="{ data }">
          <img
            :src="data.brand.imageUrl"
            :alt="data.productTitle"
            style="width: 100px"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "@/api/index.js";
import constant from "@/common/constant.js";
import BigNumber from "bignumber.js";
import TableHeader from "@/components/Header.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  components: {
    TableHeader,
  },
  setup() {
    const products = ref([]);
    const totalProduct = ref(0);
    const sortRating = ref("ratingAvg");
    const sortOrder = ref(-1);
    const sortRatingAvg = constant.data.SORTDATA;
    const filterRatingAvg = constant.data.FILTERDATA;
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      ratingStatus: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      productTitle: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });

    //api 연동 데이터 가져오기
    const getUrlData = async () => {
      try {
        let response = await api.get(constant.url.GETDATA);
        let res = [];
        totalProduct.value = await response.data.products.length;

        //필터링 > 3점 이상 긍정, 이하 부정 처리
        for (let i = 0; i < 10; i++) {
          let element = await response.data.products[i];
          let data = {
            ...element,
            ratingStatus: element.ratingAvg > 3 ? "긍정적" : "부정적",
          };
          await res.push(data);
        }
        products.value = await res;
      } catch (error) {
        console.log(error);
      }
    };
    getUrlData();

    //금액 포맷
    const formatPrice = (price) => {
      if (price === undefined) {
        return "정보없음";
      }
      return new BigNumber(price).toFormat();
    };

    //검색 기능
    const searchKeyword = (searchKey) => {
      getUrlData();
      switch (searchKey.no) {
        case 0:
          sortOrder.value = searchKey.sort;
          break;
        case 1:
          filters.value["ratingStatus"].constraints[0].value =
            searchKey.filter === "all" ? null : searchKey.filter;
          break;
        case 2:
          console.log("gds");
          filters.value["productTitle"].constraints[0].value =
            searchKey.keywords;
          console.log(
            "gds",
            filters.value["productTitle"].constraints[0].value
          );
          break;
        default:
          break;
      }
    };

    //검색 초기화
    const initFilter = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ratingStatus: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        productTitle: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
      sortOrder.value = -1;
      getUrlData();
    };

    //인피니트 스크롤 부분
    document.addEventListener("scroll", async (e) => {
      const { scrollTop } = e.target.scrollingElement;
      //스크롤 밑바닥 체크
      let bottom =
        document.documentElement.scrollHeight -
        document.documentElement.offsetHeight;
      let response = await api.get(constant.url.GETDATA);
      //스크롤 bottom 도착 하면 값 10개 추가 호출
      if (
        scrollTop === bottom &&
        products.value.length < (await response.data.products.length)
      ) {
        await getMoreData(response);
      }
    });

    const getMoreData = async (response) => {
      let index = products.value.length;
      let total =
        products.value.length / 10 + 1 <
        (await response.data.products.length) / 10
          ? products.value.length + 10
          : await response.data.products.length;
      for (let i = index; i < total; i++) {
        let element = await response.data.products[i];
        let data = {
          ...element,
          ratingStatus: element.ratingAvg > 3 ? "긍정적" : "부정적",
        };
        await products.value.push(data);
      }
    };

    return {
      products,
      sortRating,
      sortOrder,
      sortRatingAvg,
      filterRatingAvg,
      filters,
      formatPrice,
      searchKeyword,
      initFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 145px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
/* 툴팁 화살표 기본 스타일 설정 시작 */
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 툴팁 화살표 기본 스타일 설정 끝 */
.tooltip .tooltip-bottom {
  width: 145px;
  top: 150%;
  left: 50%;
  margin-left: -60px;
}
.tooltip .tooltip-bottom::after {
  bottom: 100%;
  left: 45%;
  margin-left: -5px;
  border-color: transparent transparent black transparent;
}
</style>