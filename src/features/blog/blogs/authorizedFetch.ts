
// export const authorizedFetch = async (url: string, options: RequestInit) => {
//   const token = localStorage.getItem('token');
//   console.log('Using token:', token);
//   if (!token) {
//     throw new Error('Sie müssen sich anmelden, um diese Aktion auszuführen.');
//   }

//   const headers = {
//     ...options.headers,
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   return response;
// };

// export default authorizedFetch;

export const authorizedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  console.log('Token used for request:', localStorage.getItem('token'));
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

  return response;
};

export default authorizedFetch;