// profile.ts

// Function to set the profile text
function setProfileText(): void {
    // Get the element with id "profile"
    const profileElement: HTMLElement | null = document.getElementById('profile');

    // Check if the element exists
    if (profileElement) {
        // Set the text content to "Hi"
        profileElement.textContent = 'Hi';
    } else {
        // Log an error if the element doesn't exist
        console.error('Profile element not found');
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setProfileText);

// Alternatively, you can export the function to use it elsewhere
export { setProfileText };