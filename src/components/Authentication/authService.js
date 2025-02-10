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

    if (token) {
      const respone_token = await axios.post(`${API_BASE_URL}/introspect`, {
        token,
      });

      if (respone_token.data) {
        const { id, scope } = respone_token.data; // Lấy giá trị id và scope

        // Lưu vào localStorage
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_scope", scope);
        localStorage.setItem("token", token);
      }
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
};
import { useState } from 'react';

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, togglePopup };
};