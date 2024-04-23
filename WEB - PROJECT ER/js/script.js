
//Inventory script
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from JSON file
    fetch("../WEB - PROJECT ER//json/inventory.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('productTableBody');
        
            // Loop through each product in the JSON data
            data.Inventory.forEach(product => {
                const newRow = tableBody.insertRow(); // Insert a new row into the table
            
                // Loop through each property of the product
                Object.entries(product).forEach(([key, value]) => {
                    const cell = newRow.insertCell(); // Insert a new cell into the row
                
                    if (key === 'Picture') {
                        // Create an <img> element for the picture
                        const img = document.createElement('img');
                        img.src = value; // Set the src attribute to the image link
                        img.alt = product.ProductName; // Set alt text for accessibility
                        img.width = 70; // Set width (adjust as needed)
                        img.height = 70; // Set height (adjust as needed)
                        cell.appendChild(img); // Append the <img> element to the cell
                    } else {
                        // For non-picture attributes, display the value as text
                        cell.textContent = value;
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


//Inventory History script 
document.addEventListener("DOMContentLoaded", function () {
    fetch("../WEB - PROJECT ER//json/inventoryhistory.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('inventoryHistoryTableBody');

            data['Inventory History'].forEach(item => {
                const newRow = tableBody.insertRow();

                Object.values(item).forEach(value => {
                    const cell = newRow.insertCell();
                    // Check if the value is for the Picture column
                    if (value.startsWith('img/')) {
                        const img = document.createElement('img');
                        img.src = value;
                        img.alt = 'Product Image';
                        img.width = 70;
                        img.height = 70;
                        cell.appendChild(img);
                    } else {
                        cell.textContent = value;
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

//Short Inventory script -- DASHBOARD
document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from JSON file
    fetch("../WEB - PROJECT ER//json/inventory.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataTableBody'); // Get the table body element
            const limit = 5; // Limit the number of products to 5

            // Loop through each product in the JSON data, up to the limit
            data.Inventory.slice(0, limit).forEach(product => {
                const newRow = tableBody.insertRow(); // Insert a new row into the table

                // Create cells for ProductID, ProductName, and StockQuantity
                const productIdCell = newRow.insertCell(); 
                productIdCell.textContent = product.ProductID;

                const productNameCell = newRow.insertCell(); 
                productNameCell.textContent = product.ProductName;

                const stockQuantityCell = newRow.insertCell(); 
                stockQuantityCell.textContent = product.StockQuantity;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

//Short Inventory History script -- DASHBOARD
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data for Inventory History Table
    fetch("../WEB - PROJECT ER//json/inventoryhistory.json")
        .then(response => response.json())
        .then(data => {
            const historyTableBody = document.getElementById('historyTableBody');
            const limit = 5;

            for (let i = 0; i < Math.min(data['Inventory History'].length, limit); i++) {
                const entry = data['Inventory History'][i];
                const newRow = historyTableBody.insertRow();

                const commitIDCell = newRow.insertCell();
                commitIDCell.textContent = entry['Commit ID'];

                const productCell = newRow.insertCell();
                productCell.textContent = entry.Product;

                const dateCell = newRow.insertCell();
                dateCell.textContent = entry.Date;
            }
        })
        .catch(error => console.error('Error fetching inventory history data:', error));
});

//Script for validation of updating product

document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch input values
    const productID = document.getElementById('productID').value;
    const confirmProductID = document.getElementById('confirmProductID').value;
    const category = document.getElementById('category').value;
    const shipmentUnits = document.getElementById('shipmentUnits').value;
    const reason = document.getElementById('reason').value;

    // Log inputs to console
    console.log('Product ID:', productID);
    console.log('Confirm Product ID:', confirmProductID);
    console.log('Category:', category);
    console.log('Number of units in shipment:', shipmentUnits);
    console.log('Reason for updating:', reason);

    // You can add your validation logic here
});


//Script for toggling between updating stock and adding new product
document.getElementById('toggleNewProduct').addEventListener('change', function() {
    if (this.checked) {
        
        console.log("toggleFunction is called");
        document.getElementById('stockForm').style.display = 'none';
        document.getElementById('newProductForm').style.display = 'block';

                   

    } else {
        document.getElementById('newProductForm').style.display = 'none';
        document.getElementById('stockForm').style.display = 'block';
    }
});

//Script for validation of adding new product
document.getElementById('newProductForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting to see the console output

    // Log each field value to check what we receive
    console.log('Product Name:', document.getElementById('productName').value);
    console.log('Category:', document.getElementById('category').value);
    console.log('Brand:', document.getElementById('brand').value);
    console.log('Model:', document.getElementById('model').value);
    console.log('Price:', document.getElementById('price').value);
    console.log('Quantity:', document.getElementById('quantity').value);
    console.log('Release Date:', document.getElementById('releaseDate').value);
    console.log('Warranty Duration:', document.getElementById('warrantyDuration').value);
    console.log('Description:', document.getElementById('description').value);
    const fileInput = document.getElementById('fileInput').files;
    console.log('File selected:', fileInput.length > 0 ? fileInput[0].name : 'No file selected');

    // Check if any input is empty
    if (!document.getElementById('productName').value || !document.getElementById('category').value || !document.getElementById('brand').value || !document.getElementById('model').value || !document.getElementById('price').value || !document.getElementById('quantity').value || !document.getElementById('releaseDate').value || !document.getElementById('warrantyDuration').value || !document.getElementById('description').value || fileInput.length === 0) {
        console.log('Please fill all fields.');
        return;
    }
});

//Script for picture upload for new product
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();  // Trigger the hidden file input click
});
document.getElementById('fileInput').addEventListener('change', function() {
    const fileNameDisplay = document.getElementById('fileName');
    if (this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;  // Update the text to show the file name
    } else {
        fileNameDisplay.textContent = 'No file selected';  // Reset if no file is selected
    }
});

/*
//Script for validation of form submission when reducing quantity
document.getElementById('shipmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch input values
    const productID = document.getElementById('productID').value;
    const confirmProductID = document.getElementById('confirmProductID').value;
    const category = document.getElementById('category').value;
    const shipmentUnits = document.getElementById('shipmentUnits').value;
    const reason = document.getElementById('reason').value;

    // Log inputs to console
    console.log('Product ID:', productID);
    console.log('Confirm Product ID:', confirmProductID);
    console.log('Category:', category);
    console.log('Number of units in shipment:', shipmentUnits);
    console.log('Reason for updating:', reason);

    // You can add your validation logic here
});

//Script for validation of form submission when removing product
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('removingProduct').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting to see the console output

        // Retrieve values from the form
        const productID = document.getElementById('productID2').value.trim();
        const confirmProductID2 = document.getElementById('confirmProductID2').value.trim();
        const reason = document.getElementById('reason2').value.trim();

        // Print each field value to the console
        console.log('Product ID:', productID);
        console.log('Confirm Product ID:', confirmProductID2);
        console.log('Reason for removing:', reason);

        // Check if all fields are filled
        if (!productID || !confirmProductID2 || !reason) {
            console.log('Error: All fields must be filled.');
            alert('Please fill in all fields.');
            return; // Stop the submission of the form
        }

        // Check if the product IDs match
        if (productID !== confirmProductID2) {
            console.log('Error: Product IDs do not match.');
            alert('The Product IDs do not match.');
            return; // Stop the submission of the form
        }

        // If all checks pass, log that the form is valid and can be submitted
        console.log('Form is valid. Processing form submission...');
        // this.submit(); // Uncomment this line if you decide to actually submit the form after validation
    });
});

//Script for toggling between removing product and decreasing quantity
document.getElementById('toggleNewProduct').addEventListener('change', function() {
    if (!this.checked) {
        
        
        document.getElementById('removingProduct').style.display = 'none';
        document.getElementById('decreasingProductQuantity').style.display = 'block';

                   

    } else {
        document.getElementById('decreasingProductQuantity').style.display = 'none';
        document.getElementById('removingProduct').style.display = 'block';
    }
});*/
