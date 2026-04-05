import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const postRequest = async (endpoint, dataBody, message, setLoading) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  try {
    if (message === "") {
      if (setLoading) setLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
        dataBody,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Accept-Language": lang,
          },
        },
      );
      console.log(response);
      toast.success(response.data.message);

      return await response.data;
    } else {
      if (setLoading) setLoading(true);
      const result = await Swal.fire({
        icon: "question",
        title: message,
        showCancelButton: true,
        confirmButtonText: lang === "ar" ? "نعم     " : "Yes",
        cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
        customClass: {
          popup: "rounded-xl shadow-lg border border-gray-200 p-6",
          title: "text-xl font-bold text-gray-800 mb-2",
          content: "text-sm text-gray-600 mb-4",
          confirmButton:
            "bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg",
          cancelButton:
            "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
        },
      });
      if (result.isConfirmed) {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
          dataBody,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              "Accept-Language": lang,
            },
          },
        );
        toast.success(response.data.message);
        return await response.data;
      }
    }
  } catch (error) {
    toast.error(
      // localStorage.lang === "ar"
      //   ? "حدث خظأ قم بالتواصل مع المسؤول"
      //   : "An error occurred. Please contact the administrator."

      error.message,
    );
    throw error;
  }
  finally {
    if (setLoading) setLoading(false);
  }
};

export const getRequest = async (endpoint, setLoading) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  try {
    if (setLoading) setLoading(true);
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,

      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Accept-Language": lang,
        },
      },
    );
    // console.log(response.data.data);
    return await response.data.data;
  } catch (error) {
    toast.error(error);

    throw error;
  }
  finally {
    if (setLoading) setLoading(false);
  }
};

export const putRequest = async (endpoint, dataBody, message, setLoading) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;

  try {
    if (setLoading) setLoading(true);
    const result = await Swal.fire({
      icon: "info",
      title: message,
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "موافق" : "OK",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
      },
      reverseButtons: lang === "ar",
    });

    if (result.isConfirmed) {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
        dataBody,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Accept-Language": lang,
          },
        },
      );
      toast.success(response.data.message);

      return await response.data;
    }
  } catch (error) {
    toast.error(
      // localStorage.lang === "ar"
      //   ? "حدث خظأ قم بالتواصل مع المسؤول"
      //   : "An error occurred. Please contact the administrator."
      error,
    );
    throw error;
  }
  finally {
    if (setLoading) setLoading(false);
  }
};

export const deleteRequest = async (endpoint, message, setLoading) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;

  try {
    if (setLoading) setLoading(true);
    // 🟡 نستخدم Swal.fire مع icon: 'warning' (مش error)
    const result = await Swal.fire({
      icon: "warning",
      title: message,
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "موافق" : "OK",
      cancelButtonText: lang === "ar" ? "إلغاء" : "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg border border-gray-200 p-6",
        title: "text-xl font-bold text-gray-800 mb-2",
        content: "text-sm text-gray-600 mb-4",
        confirmButton:
          "bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg ml-2",
      },
      reverseButtons: lang === "ar",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
            "Accept-Language": lang,
          },
        });
      toast.success(response.data.message);
      return await response.data;
    }
  } catch (error) {
    toast
      .error
      // localStorage.lang === "ar"
      //   ? "حدث خظأ قم بالتواصل مع المسؤول"
      //   : "An error occurred. Please contact the administrator."
      ();

    throw error;
  }
  finally {
    if (setLoading) setLoading(false);
  }
};
