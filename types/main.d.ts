import { AxiosProgressEvent, CancelToken, ResponseType } from "axios";
import { ChangeEvent } from "react";

interface IInput {
  label?: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  className?: string;
}

export interface ITextInput extends IInput {
  placeholder?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "checkbox"
    | "radio"
    | "file"
    | "color"
    | "range"
    | "time"
    | "tel";
}

export interface ISelectInput extends IInput {
  data: { id: number; name: string }[];
}

export interface IButton {
  status: "primary" | "success" | "danger";
  text: string;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
}

export interface IAxios {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
  params?: object;
  autoSuccess?: boolean;
  autoError?: boolean;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  cancelToken?: CancelToken;
  responseType?: ResponseType;
}
