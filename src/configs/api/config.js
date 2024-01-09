import { axios } from 'libraries';
import appConfig from "../appConfig";
import { getPath, getCustomUrl, createUrlParamFromObj, getContentType, createHeader, getLanguage } from 'utils';

const baseUrl = appConfig;

export const apiInstance = axios.create({
    baseURL: `${baseUrl.url.api}`,
    timeout: 60000,
    validateStatus: status => status >= 200 && status < 600
})

export class ApiRequest {
    static request = async (method = "GET", route = "", payload = {}) => {
        const path = getPath(payload.path);
        const params = createUrlParamFromObj(payload.params);
        const customUrl = getCustomUrl(payload.url);
        const contentType = getContentType(payload.type);
        const language = getLanguage();
        const baseHeaders = {
            "Accept": '*/*',
            "Content-Type": contentType,
            "Accept-Language": language
        };
        const headers = createHeader(payload.headers, baseHeaders);
        const url = customUrl.length > 0 ? customUrl : route + path + params;
        const data = payload.body ? payload.body : {};
        const requestObj = { url, headers, method, data };

        try {
            const response = await apiInstance.request(requestObj);
            const responseData = response.data;
            if (responseData) {
                return { axiosResponse: response, ...responseData };
            }
            return { axiosResponse: response, ...response };
        } catch (err) {
            if (err && err.response && err.response.data) {
                return err.response.data;
            } else if (err && err.response) {
                return err.response;
            } else {
                return err;
            }
        }
    };

    static get = route => payload => this.request("GET", route, payload);

    static put = route => payload => this.request("PUT", route, payload);

    static post = route => payload => this.request("POST", route, payload);

    static delete = route => payload => this.request("DELETE", route, payload);

    static patch = route => payload => this.request("PATCH", route, payload);

    static options = route => payload => this.request("OPTIONS", route, payload);

    static head = route => payload => this.request("HEAD", route, payload);
}