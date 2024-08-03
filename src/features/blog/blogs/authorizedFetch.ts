
// const authorizedFetch = async (url: string, options: RequestInit = {}) => {
//   const token = localStorage.getItem('token');
//   console.log('Using token:', token);
//   console.log('Fetching URL:', url);
  
//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Sie müssen sich anmelden, um diese Aktion auszuführen.');
//   }

//   return response.json();
// };


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

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || 'Error');
//   }

//   return response.json();
// };

// export default authorizedFetch;


export const authorizedFetch = async (url: string, options: RequestInit) => {
  const token = localStorage.getItem('token');
  console.log('Using token:', token);
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