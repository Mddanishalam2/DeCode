// File: src/services/authService.js

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Helper to get all users
const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// Helper to save all users
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Sign up a new user
export const signup = (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required.');
    }
    const users = getUsers();
    const exists = users.some((u) => u.username === username);

    if (exists) {
        throw new Error('User already exists. Please try logging in.');
    }

    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
};

// Log in an existing user
export const login = (username, password) => {
    if (!username || !password) {
        throw new Error('Please enter both username and password.');
    }
    const users = getUsers();
    const foundUser = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
        throw new Error('Invalid username or password.');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return foundUser;
};