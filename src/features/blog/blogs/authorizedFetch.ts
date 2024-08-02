const authorizedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.token;
  
  
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sie müssen sich anmelden, um diese Aktion auszuführen.');
  }

  return response.json();
};

export default authorizedFetch;


