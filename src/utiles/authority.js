import Vue from 'vue'
export function getToken () {
  let token = localStorage.getItem("token");
  return token;
}
export function setToken (token) {
  return localStorage.setItem("token",token);
}
