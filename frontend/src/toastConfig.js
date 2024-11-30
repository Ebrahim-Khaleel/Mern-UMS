import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
}

export const showToastSuccess = (message, options = {}) => {
    toast.success(message, {...defaultOptions, ...options});
}

export const showToastError = (message, options = {}) => {
    toast.error(message, {...defaultOptions, ...options});
}