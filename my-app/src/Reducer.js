let localBasket = JSON.parse(localStorage.getItem("basket")) ?? [];
let specialCharater = /[&\/\\#,+()$~%.'":*?<>{}]/g;

export const intitalState = {
  products: [],
  details_product: [],
  product_category: [],
  brands: [],
  basket: localBasket.length > 0 ? localBasket : [],
  profileCustomer: {
    gender: "Nam",
    name: "",
    phoneNumber: "",
    shippingMethod: "Giao tận nơi",
    address: "",
    request: "",
  },
  category_name: "",
  formatMoney: (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  },
  cleanString: (str) => {
    const newId = removeAccents(str.toLowerCase())
      .replaceAll(" ", "-")
      .replaceAll(specialCharater, "");

    function removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return newId;
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      if (state.basket.every((item) => item.id !== action.payload.id)) {
        return {
          ...state,
          basket: [...state.basket, action.payload],
        };
      } else {
        let tempBasket = state.basket.map((item) => {
          if (item.id == action.payload.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        return { ...state, basket: tempBasket };
      }
    case "CHANGE_COLOR":
      let changeColorBasket = state.basket.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, miniList: action.payload.newList };
        }
        return item;
      });
      localStorage.setItem("basket", JSON.stringify(changeColorBasket));
      return { ...state, basket: changeColorBasket };
    case "INCREASE_BASKET":
      let increaseBasket = state.basket.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      localStorage.setItem("basket", JSON.stringify(increaseBasket));
      return { ...state, basket: increaseBasket };
    case "DECREASE_BASKET":
      let decreaseBasket = state.basket.map((item) => {
        if (item.id == action.payload.id && item.amount > 1) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      localStorage.setItem("basket", JSON.stringify(decreaseBasket));
      return { ...state, basket: decreaseBasket };

    case "REMOVE_BASKET":
      localStorage.setItem(
        "basket",
        JSON.stringify(
          ...state.basket.filter((item) => item.id != action.payload.id)
        )
      );
      return {
        ...state,
        basket: [
          ...state.basket.filter((item) => item.id != action.payload.id),
        ],
      };
    case "CHANGE_PROFILE":
      return {
        ...state,
        profileCustomer: {
          ...state.profileCustomer,
          name: action.payload.name,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          request: action.payload.request,
          gender: action.payload.gender,
          shippingMethod: action.payload.shippingMethod,
        },
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_DETAILS_PRODUCT":
      return {
        ...state,
        details_product: action.payload,
      };
    case "GET_PRODUCT_CATEGORY":
      return {
        ...state,
        product_category: action.payload,
      };
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "GET_CATEGORY_NAME":
      return {
        ...state,
        category_name: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
