import Axios from "axios";
import { notification, Modal } from "antd";
import {
  METHOD_DELETE,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  STATUSCODE_200,
  STATUSCODE_500,
  TOKEN_NAME,
} from "./constants";

Axios.interceptors.response.use(
  (response) => {
    // do something with the response data

    if (response && response.data.statusCode === STATUSCODE_500) {
      notification.error({
        message: "Thông báo!",
        description: response.data.message,
      });
    }
    if (
      response &&
      response.data.statusCode === STATUSCODE_200 &&
      response.data.message
    ) {
      notification.success({
        message: "Thông báo!",
        description: response.data.message,
      });
    }
    return response;
  },
  (error) => {
    notification.config({
      maxCount: 1,
      duration: 2,
    });
    let mess = "";
    if (error && error.response) {
      mess = error.response.data.message;
      if (mess) {
        notification.error({
          message: "Thông báo!",
          description: mess,
        });
      }
    } else {
      notification.error({
        message: "Thông báo!",
        description: "Lỗi hệ thống",
        maxCount: 1,
      });
    }
    return error.response;
  }
);

// 1. methods for get, post data without authentication
async function defaultGet(endpoint) {
  return await Axios({
    method: METHOD_GET,
    url: endpoint,
  });
}

async function defaultPost(endpoint, method, payload) {
  const body = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(payload).map((key) => {
    body[key] = payload[key];

    if (
      payload[key] ||
      typeof payload[key] === "boolean" ||
      typeof payload[key] === "number"
    ) {
      body[key] = payload[key];
    }
  });
  return await Axios({
    headers: {},
    method: method,
    url: endpoint,
    data: body,
  });
}

export async function getData({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await defaultGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

export async function postData({
  url,
  payload,
  method = METHOD_POST,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await defaultPost(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

// 2. methods for get, post, put, delete data with authentication
// 2.1. methods for get
export async function authGet(endpoint) {
  const token = localStorage.getItem(TOKEN_NAME);
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_GET,
    url: endpoint,
  });
}

export async function authGetData({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authGet(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

// 2.2. methods for delete
async function authDelete(endpoint) {
  const token = localStorage.getItem(TOKEN_NAME);
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_DELETE,
    url: endpoint,
  });
}

export async function startDelete({ url, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authDelete(url);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

export function authDeleteData({
  url,
  setLoading,
  onSuccess,
  content = "Bạn có chắc chắn muốn xóa !",
}) {
  Modal.confirm({
    centered: true,
    title: "Xác nhận",
    content,
    onOk() {
      startDelete({ url, setLoading, onSuccess });
    },
    onCancel() {},
    okText: "Đồng ý",
    okButtonProps: { type: "danger" },
    cancelText: "Hủy",
  });
}

// 2.3. methods for post
async function authPost(endpoint, payload) {
  const token = localStorage.getItem(TOKEN_NAME);
  const body = {};
  Object.keys(payload).map((key) => {
    if (
      payload[key] ||
      typeof payload[key] === "boolean" ||
      typeof payload[key] === "number"
    ) {
      body[key] = payload[key];
    }
    return {};
  });
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_POST,
    url: endpoint,
    data: body,
  });
}

export async function authPostData({ url, payload, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authPost(url, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

// 2.4. methods for put
async function authPut(endpoint, body) {
  const token = localStorage.getItem(TOKEN_NAME);
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: METHOD_PUT,
    url: endpoint,
    data: body,
  });
}

export async function authPutData({ url, payload, setLoading, onSuccess }) {
  setLoading(true);
  try {
    const res = await authPut(url, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

// 2.5. methods for posting formData that contains files or normal fields
async function authPostFormData(endpoint, payload) {
  const token = localStorage.getItem(TOKEN_NAME);
  const body = {};
  Object.keys(payload).map((key) => {
    if (
      payload[key] ||
      typeof payload[key] === "boolean" ||
      typeof payload[key] === "number"
    ) {
      body[key] = payload[key];
    }
    return {};
  });
  const formData = new FormData();
  Object.keys(body).map((key) => {
    return formData.append(key, body[key]);
  });
  if (body.imageFile) {
    formData.append("file", body.imageFile);
  }
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
    method: METHOD_POST,
    url: endpoint,
    data: formData,
  });
}

export async function authPostFileData({
  url,
  payload,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await authPostFormData(url, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

export async function authGetMultiplesRequest({
  endpoints,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    await Axios.all(endpoints.map((endpoint) => authGet(endpoint))).then(
      (data) => {
        if (data.length) {
          onSuccess(data);
        }
      }
    );
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

// 2.6. methods for posting formData that contains files ONLY (images, videos)
async function authPostImageFormData(endpoint, method, payload) {
  const token = localStorage.getItem(TOKEN_NAME);
  const formData = new FormData();
  if (payload) {
    payload.forEach((file) => {
      formData.append("Files", file);
    });
  }
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
    method: method,
    url: endpoint,
    data: formData,
  });
}

export async function authPostImageData({
  url,
  method,
  payload,
  setLoading,
  onSuccess,
}) {
  setLoading(true);
  try {
    const res = await authPostImageFormData(url, method, payload);
    if (res && res.data) {
      onSuccess(res.data);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
}
