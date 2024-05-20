import axios, { AxiosResponse } from "axios";
import { sweetAlert } from "@/components/utils";
import { type IAxios } from "@/types";

const axiosInstance = async <T>({
  method,
  url,
  data,
  params,
  onUploadProgress,
  cancelToken,
  responseType,
  autoSuccess = true,
  autoError = true,
}: IAxios): Promise<T> => {
  try {
    // Get the authentication token from local storage
    const token = localStorage.getItem("access_token");

    let headers: Record<string, string | string[]> = {
      Authorization: `Bearer ${token}`,
    };

    // Set appropriate Content-Type header based on request data
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response: AxiosResponse<any> = await axios({
      method,
      url,
      data,
      headers,
      params,
      onUploadProgress,
      cancelToken,
      responseType,
      withCredentials: true,
    });
    if (autoSuccess) {
      const title = response.data?.message;
      if (title) sweetAlert({ icon: "success", title });
    }
    return response.data;
  } catch (error: any) {
    if (autoError) {
      let title: string = error.response?.data?.message;
      if (title) {
        title = Array.isArray(title) ? title[0] : title;
        throw sweetAlert({ icon: "error", title: title.replaceAll("_", " ") });
      } else {
        throw sweetAlert({
          icon: "error",
          title: "An error occurred",
        });
      }
    } else {
      return Promise.resolve(error);
    }
  }
};

export default axiosInstance;
