const BASE_URL = process.env.API_URL;

export async function authenticateUser(
  data: { email: string; password: string },
  endpoint: string
) {
 const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}