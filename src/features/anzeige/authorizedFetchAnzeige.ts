

export const authorizedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Sie müssen sich anmelden, um diese Aktion auszuführen.');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
}

const responseText = await response.text();
return responseText ? JSON.parse(responseText) : {};
};

export default authorizedFetch;