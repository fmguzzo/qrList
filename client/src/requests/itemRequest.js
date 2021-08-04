import axios from "axios";
import { API_BASE_URL } from "../config/serverApiConfig";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";
import storePersist from "../storePersist";

const userInfo = storePersist.get("userInfo");
const token = userInfo ? userInfo.token : "";
//const headersInstance = { [ACCESS_TOKEN_NAME]: `Bearer ${token}` };

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    common: {
      //...headersInstance,
      Authorization: `Bearer ${token}`,
    },
    post: {
      //...headersInstance,
      Authorization: `Bearer ${token}`,
    },
    put: {
      //...headersInstance,
      Authorization: `Bearer ${token}`,
    },
    delete: {
      //...headersInstance,
      Authorization: `Bearer ${token}`,
    },
  },
});

const itemRequest = {
  create: async (categoryId, jsonData) => {
    try {
      const response = await axiosInstance.post(
        `/api/items/category/${categoryId}`,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (categoryId, option = {}) => {
    try {
      let query = "";
      if (option !== {}) {
        let currentPage = option.currentPage
          ? "page=" + option.currentPage
          : "";
        let limitPage = option.limitPage ? "&items=" + option.limitPage : "";
        query = `?${currentPage}${limitPage}`;
      }

      const response = await axiosInstance.get(
        `/api/items/category/${categoryId}${query}`
      );

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (categoryId, itemId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/items/${itemId}?category=${categoryId}`
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  update: async (itemId, jsonData) => {
    try {
      const response = await axiosInstance.put(
        `/api/items/${itemId}`,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  read: async (itemId) => {
    try {
      const response = await axiosInstance.get(`/api/items/${itemId}`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

/**
const request = {
  filter: async (entity, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      let filter = option.filter ? "filter=" + option.filter : "";
      let equal = option.equal ? "&equal=" + option.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axiosInstance.get(entity + "/filter" + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async (entity, source, option = {}) => {
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    try {
      let query = "";
      if (option !== {}) {
        let fields = option.fields ? "fields=" + option.fields : "";
        let question = option.question ? "&q=" + option.question : "";
        query = `?${fields}${question}`;
      }
      // headersInstance.cancelToken = source.token;
      const response = await axiosInstance.get(entity + "/search" + query, {
        cancelToken: source.token,
      });

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

 post: async (entityUrl, jsonData, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async (entityUrl) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async (entityUrl, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    // const CancelToken = await axiosInstance.CancelToken;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
*/

export default itemRequest;
