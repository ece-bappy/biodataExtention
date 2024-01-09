document.addEventListener('DOMContentLoaded', function () {
    const dataForm = document.getElementById('dataForm');
    const addFieldContainer = document.getElementById('addFieldContainer');
    const addMoreFieldButton = document.getElementById('addMoreFieldButton');
  
    // Counter to keep track of added fields
    let fieldCounter = 1;
  
    // Function to create a new set of input fields
    function createNewField() {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'fieldWrapper';
  
      const nameLabel = document.createElement('label');
      nameLabel.textContent = `Field Name ${fieldCounter}:`;
      fieldWrapper.appendChild(nameLabel);
  
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = `fieldName${fieldCounter}`;
      fieldWrapper.appendChild(nameInput);
  
      const valueLabel = document.createElement('label');
      valueLabel.textContent = `Field Value ${fieldCounter}:`;
      fieldWrapper.appendChild(valueLabel);
  
      const valueInput = document.createElement('input');
      valueInput.type = 'text';
      valueInput.name = `fieldValue${fieldCounter}`;
      fieldWrapper.appendChild(valueInput);
  
      addFieldContainer.appendChild(fieldWrapper);
  
      // Increment the counter for the next set of fields
      fieldCounter++;
    }
  
    // Event listener for the "Add More Field" button
    addMoreFieldButton.addEventListener('click', function () {
      createNewField();
    });
  
    // Event listener for form submission
    dataForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const nameInput = document.getElementById('name');
      const name = nameInput.value;
  
      // Save the name and additional field data (you can use Chrome Storage API)
      // For simplicity, let's use localStorage in this example
      localStorage.setItem('storedName', name);
  
      const fieldData = [];
      const fieldInputs = document.querySelectorAll('.fieldWrapper input');
      fieldInputs.forEach((input) => {
        const fieldName = input.name;
        const fieldValue = input.value;
        const fieldIndex = fieldName.match(/\d+/)[0]; // Extract the numerical part from the field name
        
        fieldData.push({
          name: `fieldName${fieldIndex}`,
          value: `${fieldValue}`,
        });
      });
      
      localStorage.setItem('fieldData', JSON.stringify(fieldData));
      

  
      // Send a message to the extension to update the popup
      chrome.runtime.sendMessage({ action: 'updatePopup', name, fieldData });
  
      // Close the current window
      window.close();
    });
  });
  