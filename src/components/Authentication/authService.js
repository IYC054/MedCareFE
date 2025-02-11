import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/account"; // URL backend

// Gọi API đăng nhập và lưu token
export const loginToken = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token`, {
      email: email,
      password: password,
    });
    var token = response.data?.result?.token;
    var user = response.data?.result?.user;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

    }

    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Xóa token khi đăng xuất
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};
import { useState } from "react";

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, togglePopup };
};
