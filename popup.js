document.addEventListener('DOMContentLoaded', function () {
    const helloWorldElement = document.getElementById('helloWorld');
    const fieldsContainer = document.getElementById('fieldsContainer');
    const addDataButton = document.getElementById('addDataButton');
  
    // Retrieve the stored name and field data from localStorage
    const storedName = localStorage.getItem('storedName');
    const storedFieldData = localStorage.getItem('fieldData');
    const parsedFieldData = storedFieldData ? JSON.parse(storedFieldData) : [];
  
    if (storedName) {
      helloWorldElement.textContent = `Hello, ${storedName}!`;
  
      // Display dynamically added fields in the popup
      if (parsedFieldData.length > 0) {
        parsedFieldData.forEach((field) => {
          const fieldElement = document.createElement('p');
          fieldElement.textContent = `${field.name.replace('fieldName', '')}: ${field.value.replace('fieldValue', '')}`;
          fieldsContainer.appendChild(fieldElement);
        });
      }
    }
  
    addDataButton.addEventListener('click', function () {
      // Open the data.html page in a new tab
      chrome.tabs.create({ url: chrome.runtime.getURL('data.html') });
    });
  
    // Listen for messages from data.html
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === 'updatePopup') {
        // Update the popup content with the submitted data and added fields
        helloWorldElement.textContent = `Hello, ${request.name}!`;
  
        // Clear previous field elements
        fieldsContainer.innerHTML = '';

        if (request.fieldData && request.fieldData.length > 0) {
        request.fieldData.forEach((field) => {
            const fieldElement = document.createElement('p');
            fieldElement.textContent = `${field.name}: ${field.value}`;
            fieldsContainer.appendChild(fieldElement);
        });
        }

      }
    });
  });
  