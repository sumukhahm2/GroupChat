// Function to save Redux state to localStorage

export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state); // Serialize the state
        localStorage.setItem('reduxState', serializedState); // Save to localStorage
    } catch (error) {
        console.warn('Error saving state to localStorage:', error);
    }
};

// Function to load Redux state from localStorage
export const loadFromLocalStorage = () => {
    
    try {
        const serializedState = localStorage.getItem('reduxState'); // Get state from localStorage
        if (serializedState === null) return undefined; // If no state, return undefined to use default
        return JSON.parse(serializedState); // Parse and return the state
    } catch (error) {
        console.warn('Error loading state from localStorage:', error);
        return undefined;
    }
};
