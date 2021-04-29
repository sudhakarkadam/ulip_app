import { stringifyQueryParams } from "./urlUtils";

export interface Http {
  get<T, U>(
    url: string,
    requestParams?: T,
    config?: Partial<HTTPConfig>
  ): Promise<U>;
  put<T, U>(url: string, data: T, config?: Partial<HTTPConfig>): Promise<U>;
  post<T, U>(url: string, data: T, config?: Partial<HTTPConfig>): Promise<U>;
  delete<T, U>(url: string, data: T, config?: Partial<HTTPConfig>): Promise<U>;
}

const ua =
  typeof navigator !== "undefined" ? navigator.userAgent : "StandardUA";

const defaultConfig = {
  credentials: "include" as RequestCredentials,
  redirect: "follow" as RequestRedirect
};

const defaultHeaders = {
  "X-User-Agent": `${ua} EKCL/website/1`,
  "Content-Type": "application/json"
};

export interface HTTPConfig {
  credentials: RequestCredentials;
  redirect: RequestRedirect;
  headers: { [key: string]: string };
  formData: FormData;
}

function request<T>(res: Response): Promise<T> {
  return Promise.resolve(res)
    .then(async response => {
      const contentType = response.headers.get("content-type");
      const isContentTypeJson =
        contentType && contentType.indexOf("application/json") !== -1;
      if (response.ok) {
        if (isContentTypeJson) {
          const resJson = await response.json();
          return Promise.resolve(resJson);
        }
        return Promise.resolve(response.text());
      }
      if (isContentTypeJson) {
        return response
          .json()
          .then(error =>
            Promise.reject({ status: response.status, response: error })
          );
      }
      return response
        .text()
        .then(error =>
          Promise.reject({ status: response.status, response: error })
        );
    })
    .catch(error => Promise.reject(error));
}

function fireRequest<T>(
  url: string,
  config: Partial<HTTPConfig> = {}
): Promise<T> {
  const conf = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultHeaders,
      ...config.headers
    }
  };

  if (conf.headers["Content-Type"] === undefined) {
    delete conf.headers["Content-Type"];
  }

  return fetch(url, conf).then<T>(request);
}

export default {
  get<T, U>(
    url: string,
    requestParams?: T,
    config: Partial<HTTPConfig> = {}
  ): Promise<U> {
    return fireRequest<U>(
      url + stringifyQueryParams(requestParams),
      Object.assign(
        {
          method: "get"
        },
        config
      )
    );
  },
  put<T, U>(
    url: string,
    data: T,
    config: Partial<HTTPConfig> = {}
  ): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: "put",
          body: JSON.stringify(data)
        },
        config
      )
    );
  },
  post<T, U>(
    url: string,
    data: T,
    config: Partial<HTTPConfig> = {}
  ): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: "post",
          body: config.formData ? data : JSON.stringify(data)
        },
        config
      )
    );
  },
  delete<T, U>(
    url: string,
    data: T,
    config: Partial<HTTPConfig> = {}
  ): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: "delete",
          body: JSON.stringify(data)
        },
        config
      )
    );
  }
};
