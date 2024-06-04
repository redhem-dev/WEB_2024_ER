
//Script for dropdown when clicking on profile
   document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.nav-link.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show');
    });

    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
    });

    window.addEventListener('click', function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});


//Spapp initialization
var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/",
    
  });

//Inventory route initialization  
app.route({
    view: "inventory",
    load: "inventory.html",
    onCreate: function () {
        
    },
    onReady: function () {
        
        fetchProducts();
    },
  });

//Dashboard scripts initialization
app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {
        
    },
    onReady: function () {

        
        fetchProductsOnDashboard();
        fetchInventoryHistoryDashboard();
    },
  });
  
//Check Availability Script initialization
app.route({
    view: "checkavailability",
    load: "checkavailability.html",
    onCreate: function () {},
    onReady: function () {
        fetchProductsCheckAvailability();
    },
});

//Inventory History initialization
app.route({
    view: "inventoryhistory",
    load: "inventoryhistory.html",
    onCreate: function () {},
    onReady: function () {
        fetchInventoryHistory();
    }
})

//Removing the product initialization
app.route({
    view: "outgoingshipment",
    load: "outgoingshipment.html",
    onCreate: function () {},
    onReady: function () {
    }
})

//Dashboard inventory script (NEW)
function fetchProductsOnDashboard() {
    RestClient.get("products", function(response) {
        var tableBody = $('#dashboardDataTableBody');

        // Limit the response to the first 5 items
        response.slice(0, 5).forEach(function(item) {
            var row = $('<tr>');
            row.append($('<td>').text(item['id']));
            row.append($('<td>').text(item['name']));
            row.append($('<td>').text(item['quantity']));
            tableBody.append(row);
        });
    });
}

//Inventory script (NEW)
function fetchProducts() {
    RestClient.get("products", function(response) {
        var tableBody = $('#productTableBody');


        response.forEach(function(item) {
            var row = $('<tr>');
            row.append($('<td>').text(item['id']));
            row.append($('<td>').text(item['name']));
            row.append($('<td>').html('<img src="' + item['picture'] + '" alt="Product Image" width = "70" height="70"/>'));
            row.append($('<td>').text(item['category']));
            row.append($('<td>').text(item['brand']));
            row.append($('<td>').text(item['price']));
            row.append($('<td>').text(item['quantity']));
            row.append($('<td>').text(item['release_date']));
            row.append($('<td>').text(item['warranty_duration']));
            row.append($('<td class="description-cell">').text(item['description']));
            tableBody.append(row);
        });
    });

}

//Check Availability script
function fetchProductsCheckAvailability() {
    RestClient.get("products", function(data) {
        var tableBody = $('#checkAvailabilityTableBody');
        
            
            data.forEach(function(item) {
                var row = $('<tr>');
                row.append($('<td>').text(item['id']));
                row.append($('<td>').text(item['name']));
                row.append($('<td>').html('<img src="' + item['picture'] + '" alt="Product Image" width = "70" height="70"/>'));
                row.append($('<td>').text(item['category']));
                row.append($('<td>').text(item['brand']));
                row.append($('<td>').text(item['price']));
                row.append($('<td>').text(item['quantity']));
                
                // Create 'available' value based on 'quantity'
                var available = item['quantity'] > 0 ? 'YES' : 'NO';
                var color = item['quantity'] > 0 ? 'green' : 'red';
                row.append($('<td>').html('<span style="color:' + color + ';">' + available + '</span>'));
                
                row.append($('<td class="description-cell">').text(item['description']));
                tableBody.append(row);
            });
    });
}

// Script for validation of register form POPRAVITI, NE RADI!!!
validateRegisterForm = function() {
    FormValidation.validate('#register-form', {}, function(data) {
        RestClient.post('users', data, function(response) {
            console.log('User registered successfully:', response);
            alert('User registered successfully!');
            
        });

    });
}

// Script for validation of new product form
validateNewProductForm = function() {
    FormValidation.validate('#newProductForm', {}, function(data) {
        RestClient.post('products', data, function(response) {
            console.log('Product added successfully:', response);
            alert('Product added successfully!');
        });
    });
}

/*Script for validation of deleting product
validateDeleteProduct = function() {
 
        
        RestClient.delete('products', data, function(response) {
            console.log('Product deleted successfully:', response);
            alert('Product deleted successfully!');
        });
    


}*/



//Inventory History script 
function fetchInventoryHistory() {
    RestClient.get("updates", function(response) {
        var tableBody = $('#inventoryHistoryTableBody');
        console.log(response);

        response.forEach(function(item) {
            var row = $('<tr>');
            row.append($('<td>').text(item['id']));
            row.append($('<td>').text(item['user_id']));
            row.append($('<td>').text(item['product_id']));
            row.append($('<td>').text(item['date_time']));
            row.append($('<td>').text(item['reason_for_updating']));
            tableBody.append(row);
        });
    });
}

//Short Inventory History script -- DASHBOARD
function fetchInventoryHistoryDashboard() {
    RestClient.get("updates", function(response) {
        var tableBody = $('#historyTableBody');
        console.log(response);

        response.slice(0, 5).forEach(function(item) {
            var row = $('<tr>');
            row.append($('<td>').text(item['id']));
            row.append($('<td>').text(item['product_id']));
            row.append($('<td>').text(item['date_time']));
            tableBody.append(row);
        });
    });
}




app.run();




/*


/*

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



*/