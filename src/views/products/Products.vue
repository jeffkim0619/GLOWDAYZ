<template>
  <div class="card">
    <h5>Lazy Loading from a Remote Datasource (100000 Rows)</h5>
    <DataTable
      :value="products"
      scrollable
      scrollHeight="400px"
      :virtualScrollerOptions="{
        lazy: true,
        onLazyLoad: loadCarsLazy,
        itemSize: 40,
        delay: 200,
        showLoader: true,
        loading: lazyLoading,
        numToleratedItems: 5,
      }"
    >
      <Column field="idProduct" header="No." style="min-width: '200px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="60%" height="1rem" />
          </div>
        </template>
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column
        field="productTitle"
        header="ProductTitle"
        style="min-width: '200px'"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
      </Column>
      <!-- <Column field="year" header="Year" style="min-width: '200px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="30%" height="1rem" />
          </div>
        </template>
      </Column> -->
      <Column field="brand" header="Brand" style="min-width: '200px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          {{ data.brand.brandTitle }}
        </template>
      </Column>
      <!-- <Column field="color" header="Color" style="min-width: '200px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="60%" height="1rem" />
          </div>
        </template>
      </Column> -->
    </DataTable>
  </div>
  <div class="card">
    <DataView
      :value="products"
      :layout="layout"
      :sortOrder="sortOrder"
      :sortField="sortField"
      :paginator="true" 
      :rows="9"
    >
      <!-- :paginator="true"
      :rows="9" -->
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By ratingAvg"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-6 col-offset-3">
          <div class="product-list-item">
            <img :src="slotProps.data.imageUrl" :alt="slotProps.data.productTitle" />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.productTitle }}</div>
              <div class="product-description">
                용량 : {{ slotProps.data.volume }}
              </div>
              <i class="tooltip">
                <Rating
                  :modelValue="slotProps.data.ratingAvg"
                  :readonly="true"
                  :cancel="false"
                />
                <span class="tooltiptext tooltip-bottom">{{
                  slotProps.data.ratingAvg
                }}</span>
              </i>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">
                <!-- {{ slotProps.data.category }} -->
              </span>
            </div>
            <div class="product-list-action">
              <span class="product-price">{{
                formatPrice(slotProps.data.price)
              }}</span>
              <!-- <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                :disabled="slotProps.idBrand === 'OUTOFSTOCK'"
              ></Button>
              <span
                :class="
                  'product-badge status-' +
                  slotProps.data.inventoryStatus.toLowerCase()
                "
              > -->
              <!-- {{ slotProps.data.inventoryStatus }} -->
              <!-- </span> -->
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
				<div class="col-12 md:col-4">
					<div class="product-grid-item card">
						<div class="product-grid-item-top">
							<div>
								<i class="pi pi-tag product-category-icon"></i>
								<span class="product-category">{{slotProps.data.category}}</span>
							</div>
							<span :class="'product-badge status-'+slotProps.data.rankChangeType.toLowerCase()">{{slotProps.data.rankChangeType}}</span>
						</div>
						<div class="product-grid-item-content">
							<img :src="slotProps.data.imageUrl" :alt="slotProps.data.productTitle" style="width: 200px;"/>
							<div class="product-name">{{slotProps.data.productTitle}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
						</div>
						<div class="product-grid-item-bottom">
							<span class="product-price">{{formatPrice(slotProps.data.price)}}</span>
							<Button icon="pi pi-shopping-cart" :disabled="slotProps.data.rankChangeType === 'OUTOFSTOCK'"></Button>
						</div>
					</div>
				</div>
			</template>
    </DataView>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "@/api/index.js";
import constant from "@/common/constant.js";
import BigNumber from "bignumber.js";

export default {
  components: {
    // VirtualScroller,
  },
  setup() {
    // onMounted(() => {
    //   productService.value
    //     .getProducts()
    //     .then((data) => (products.value = data));
    // });

    const basicItems = ref(
      Array.from({ length: 100000 }).map((_, i) => `Item #${i}`)
    );
    const products = ref();
    // const productService = ref(new ProductService());
    const layout = ref("grid");
    const sortKey = ref();
    const sortOrder = ref();
    const sortField = ref();
    const totalProduct = ref(0);
    const sortOptions = ref([
      { label: "ratingAvg High to Low", value: "!ratingAvg" },
      { label: "ratingAvg Low to High", value: "ratingAvg" },
    ]);
    const onSortChange = (event) => {
      console.log(event.value);
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
      } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
      }
    };
    const getUrlData = async () => {
      let response = await api.get(constant.url.GETDATA);
      products.value = await response.data.products;
      totalProduct.value = await response.data.products.length;
      console.log(response.data.products);
    };
    const formatPrice = (price) => {
      if (price === undefined) {
        return "정보없음";
      }
      return new BigNumber(price).toFormat();
    };

    const virtualCars = ref(Array.from({ length: totalProduct.value }));
    const lazyLoading = ref(false);
    const loadLazyTimeout = ref();

    const loadCarsLazy = (event) => {
      !lazyLoading.value && (lazyLoading.value = true);

      if (loadLazyTimeout.value) {
        clearTimeout(loadLazyTimeout.value);
      }

      //simulate remote connection with a timeout
      loadLazyTimeout.value = setTimeout(() => {
        let _virtualCars = [...virtualCars.value];
        let { first, last } = event;

        //load data of required page
        const loadedCars = products.value.slice(first, last);

        //populate page of virtual cars
        Array.prototype.splice.apply(_virtualCars, [
          ...[first, last - first],
          ...loadedCars,
        ]);

        virtualCars.value = _virtualCars;
        lazyLoading.value = false;

        console.log(virtualCars.value);

        // }, Math.random() * 1000 + 250);
      }, 2000);
    };
    getUrlData();
    return {
      products,
      layout,
      sortKey,
      sortOrder,
      sortField,
      sortOptions,
      onSortChange,
      basicItems,
      formatPrice,
      loadCarsLazy,
      lazyLoading,
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
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>