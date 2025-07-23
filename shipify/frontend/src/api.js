const API_URL = 'http://localhost:5000/api';

export async function register(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function createShipment(data) {
  const res = await fetch(`${API_URL}/shipments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getShipments() {
  const res = await fetch(`${API_URL}/shipments`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function getShipmentById(id) {
  const res = await fetch(`${API_URL}/shipments/${id}`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function updateShipmentStatus(id, status) {
  const res = await fetch(`${API_URL}/shipments/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status })
  });
  return res.json();
} 