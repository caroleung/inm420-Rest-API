// async/await function to get APOD data for a specific date
async function getAPODForDate(apiKey, date) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
        throw error;
    }
}

// Function to display APOD data
function displayAPOD(apodData) {
    const content = document.querySelector("#apod-info");
    content.innerHTML = `
        <h2>${apodData.title}</h2>
        <p>Date: ${apodData.date}</p>
        <p>${apodData.explanation}</p>
        `;

    if (apodData.media_type === "image") {
        content.innerHTML += `<img src="${apodData.url}" alt="${apodData.title}" />`;
    } else if (apodData.media_type === "video") {
        content.innerHTML += `<iframe width="560" height="315" src="${apodData.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        content.innerHTML += "<p>Choose another date.😥</p>";
    }
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const selectedDate = document.querySelector("#date-picker").value;
    const apiKey = 'Xr1HroKA2nV1r4CvXgbbw5DHqn587Si48fDAZk63'; // My NASA API key

    // Call function to fetch APOD data for the selected date
    getAPODForDate(apiKey, selectedDate)
        .then(apodData => displayAPOD(apodData))
        .catch(error => console.error('Error:', error));
}

// Main function
function main() {
    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener("click", handleSubmit);
}

main();
