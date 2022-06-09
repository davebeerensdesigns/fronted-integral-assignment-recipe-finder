import {toast} from "react-toastify";

const settings = {
    position: "top-right",
    autoClose: 3000
}

const notifyError = (message) => {
    toast.error(message, settings);
}

const notifySuccess = (message) => {
    toast.success(message, settings);
}

const notifyInfo = (message) => {
    toast.info(message, settings);
}

const notifyWarning = (message) => {
    toast.warning(message, settings);
}

const notifyDefault = (message) => {
    toast.default(message, settings);
}


const notifyToast = {
    notifyError,
    notifySuccess,
    notifyInfo,
    notifyWarning,
    notifyDefault
};
export default notifyToast;