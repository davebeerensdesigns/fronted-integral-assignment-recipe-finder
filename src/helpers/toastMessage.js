import {toast} from "react-toastify";


const notifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000
    });
}

const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000
    });
}

const notifyInfo = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 3000
    });
}

const notifyWarning = (message) => {
    toast.warning(message, {
        position: "top-right",
        autoClose: 3000
    });
}

const notifyDefault = (message) => {
    toast.default(message, {
        position: "top-right",
        autoClose: 3000
    });
}


const toastMessage = {
    notifyError,
    notifySuccess,
    notifyInfo,
    notifyWarning,
    notifyDefault
};
export default toastMessage;