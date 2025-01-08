// Function to get button by id
function getButtonById(id) {
    return document.querySelector(`button[id='${id}']`);
}

// List of all button ids
const buttonIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '/', 'x', 'dot', 'equal', 'clear', 'erase'];

// Function to handle button clicks
function handleButtonClick(event) {
    const button = event.target;
    console.log(`Button ${button.id} was clicked.`);
    // Add more specific logic for each button click here
}

// Add event listener to all buttons
buttonIds.forEach(id => {
    const button = getButtonById(id);
    if (button) {
        button.addEventListener('click', handleButtonClick);
    }
});
