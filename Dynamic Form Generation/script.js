var formfield = document.getElementById('formfield');
var form = document.getElementById('dynamicForm');
var formDataDisplay = document.getElementById('formDataDisplay');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect the form data
    var formData = new FormData(form);
    var displayData = '<h2>Form Data</h2>';

    // Iterate through the form data and construct the display string
    formData.forEach((value, key) => {
        displayData += `<p><strong>${key}:</strong> ${value}</p>`;
    });

    // Display the collected data
    formDataDisplay.innerHTML = displayData;
});

function add() {
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'OptionalField');
    newField.setAttribute('class', 'text');
    newField.setAttribute('size', 50);
    newField.setAttribute('placeholder', 'Optional Field');
    formfield.appendChild(newField);
}

function remove() {
    var input_tags = formfield.getElementsByTagName('input');
    if (input_tags.length > 3) {
        formfield.removeChild(input_tags[(input_tags.length) - 1]);
    }
}
