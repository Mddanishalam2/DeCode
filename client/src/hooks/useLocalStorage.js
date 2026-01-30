// // src/hooks/useLocalStorage.js
// import { useState, useEffect } from 'react';

// /**
//  * A custom hook to synchronize state with localStorage.
//  * @param {string} key The key to use in localStorage.
//  * @param {T} initialValue The initial value if nothing is in localStorage.
//  * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
//  */
// export const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = useState(() => {
//     try {
//       const storedValue = window.localStorage.getItem(key);
//       return storedValue ? JSON.parse(storedValue) : initialValue;
//     } catch (error) {
//       console.error('Error reading from localStorage', error);
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error('Error writing to localStorage', error);
//     }
//   }, [key, value]);

//   return [value, setValue];
// };