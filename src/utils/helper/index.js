import { moment } from 'libraries';

export const getPath = (path= "") => path ? `${path}/` : "";

export const createUrlParamFromObj = (params = null) => {
    if (!params) return "";
    const result = [];
    Object.keys(params).map(key => result.push(`${key}=${params[key]}`));
    return `?${result.join("&")}`;
};

export const getCustomUrl = (url = "") => url;

export const getContentType = (type = "") => {
    switch (type) {
        case "form-data":
            return "multipart/form-data";
        default:
            return "application/json";
    }
};

export const createHeader = (value = {}, base = {}) => ({
    ...base,
    ...value
});

export const handleAsync = async promise => {
    try {
        const response = await promise;
        return [response, undefined];
    } catch (err) {
        return [undefined, err];
    }
};

export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
};

export const convertDate = (date, formatDate) => {
    if (!date) return null;
    return moment(date).format(formatDate);
};

export function isObject(obj) {
    return obj != null && obj.constructor.name === "Object";
}

export const setErrorValidation = (response, status, setError) => {
    if(response.hasOwnProperty('detail')) {
        let errorsValidate = response.detail;
        let errorItem = Object.keys(errorsValidate);
        errorItem.forEach(field => {
            if(isObject(errorsValidate[field])) {
                let errorSubFields = Object.keys(errorsValidate[field]);
                errorSubFields.forEach(errorSubField => {
                    let subField = `${field}.${errorSubField}`;
                    setError(subField, {
                        status: status,
                        type: 'manual',
                        message: errorsValidate[field][errorSubField][0]
                    });
                });
            } else {
                setError(field, {
                    status: status,
                    type: 'manual',
                    message: errorsValidate[field][0]
                });
            }
        });
    }
}

export const getLanguage = () => {
    const selector = localStorage.getItem('language') ? localStorage.getItem('language') : 'id';
    return selector;
}

export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const getIdentityFromHref = (href) => {
    const url = href.replace(/\/$/, '');
    return url.substring(url.lastIndexOf('/') + 1);
};

export const getHostUrl = (linkUrl) => {
    if (process.env.REACT_APP_ENV === 'development') {
        if (linkUrl !== '') {
            const apiUrl = new URL(process.env.REACT_APP_API_URL);
            const currentUrl = new URL(linkUrl);

            if(currentUrl.hostname !== apiUrl.hostname) {
                currentUrl.host = apiUrl.host;
                return currentUrl.href;
            }
        }
    }
    return linkUrl;
};

export const findItemInObject = (objects, key, value) => {
    const newdata = objects.find( (data) => data[key] === value );
    return (newdata) ? newdata : {buckets: [], rel: null};
};

export const getQueryParams = (query, key) => {
    const queries = new URLSearchParams(query);
    const param = queries.get(key);
    return (param) ? param : null;
};

export const setQueryParams = (query, key, value) => {
    let queriesParams = new URLSearchParams(query);
    queriesParams = queriesParams.set(key, value);
    return queriesParams;
};

const parseGoogleAddressComponents = (address_components) => {
    const result = {};

    for (let i=0; i < address_components.length; i++) {
        for (let b=0; b < address_components[i].types.length; b++) {
            if (address_components[i].types[b] === "administrative_area_level_1") {
                result.province = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_2") {
                result.city = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_3") {
                result.district = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "administrative_area_level_4") {
                result.subDistrict = address_components[i].long_name;
                break;
            }
            if (address_components[i].types[b] === "postal_code") {
                result.postalCode = address_components[i].long_name;
                break;
            }
        }
    }
    return result;
}

export const isValidSelectedLocation = (results, data) => {
    const googleAddressComponent = parseGoogleAddressComponents(results[0].address_components);
    const customerAddress = data.value.split("/");
    const customerAddressComponent = {
        province: customerAddress[0],
        city: customerAddress[1],
        district: customerAddress[2],
        subDistrict: customerAddress[3],
        postalCode: customerAddress[4]
    };
    // Check Province
    // const isValidProvince = googleAddressComponent.province.toLowerCase().includes(
    //     customerAddressComponent.province.toLowerCase());

    // Check City
    const isValidCity = googleAddressComponent?.city?.toLowerCase().includes(
        customerAddressComponent.city.toLowerCase());

    // Check district
    const isValidDistrict = googleAddressComponent?.district?.toLowerCase().includes(
        customerAddressComponent.district.toLowerCase());

    // Check SubDistrict
    const isValidSubDistrict = googleAddressComponent?.subDistrict?.toLowerCase().includes(
        customerAddressComponent.subDistrict.toLowerCase());

    // Check Postal Code
    let isValidPostalCode = true;
    if(googleAddressComponent?.postalCode) {
        if (googleAddressComponent?.postalCode !== customerAddressComponent.postalCode) {
            isValidPostalCode = false;
        };
    };

    return isValidCity && isValidDistrict && isValidSubDistrict && isValidPostalCode;
};

export const logoutAccount = () => {
    localStorage.clear();
    return true;
};