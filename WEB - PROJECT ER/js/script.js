
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

//Log in initialization
app.route({
    view: "login",
    load: "login.html",
    onCreate: function () {},
    onReady: function () {
      console.log("Signin is ready!");
      $("#signin-form").validate({
        rules: {
          password: "required",
          email: {
            required: true,
            email: true,
          },
        },
        invalidHandler: function (event, validator) {
          console.log("Invalid form login");
          $(".alert-danger").show();
        },
        submitHandler: function (form, event) {
          console.log("Sending login request...");
          event.preventDefault();
          let data = {};
          $.each($(form).serializeArray(), function () {
            console.log(this.name, this.value);
            data[this.name] = this.value;
          });

          console.log("valid form", data);
          RestClient.post(
            "login",
            data,
            function (response) {
              console.log("User logged in", response);
              window.localStorage.setItem("token", response.token);
              window.localStorage.setItem("user", response.first_name);
              window.localStorage.setItem("email", response.email);
              window.localStorage.setItem("phone", response.phone);
              window.localStorage.setItem("id", response.id);
              window.location.hash = "#home";
              window.location.reload("/");
            },
            function (error) {
              $(".alert-danger").show();
            }
          );
        },
      });
    },
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

  //Profile route initialization
  app.route({
    view: "profilewithteamsection",
    load: "profilewithteamsection.html",
    onCreate: function () {
        
    },
    onReady: function () {
        populateUserDetails();
    },
})

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

// Script for validation of register form 
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


//Show or hide picture and name of the user
document.addEventListener('DOMContentLoaded', function() {
    const userInfoElement = document.getElementById('user-info');
    const userNotLoggedInElement = document.getElementById('user-not-logged-in');
    const userNameElement = document.getElementById('user-name');
    const logoutButtonElement = document.getElementById('logout-button');

    // Function to get the JWT token from localStorage
    function getJwtToken() {
        return localStorage.getItem('token');
    }

    // Function to get the user info from localStorage
    function getUserInfo() {
        const user = localStorage.getItem('user');
        try {
            return JSON.parse(user);
        } catch (e) {
            return { name: user };
        }
    }

    // Function to display the correct list based on login status
    function displayCorrectList() {
        const token = getJwtToken();
        if (token) {
            const user = getUserInfo();
            if (user && user.name) {
                userNameElement.textContent = user.name;
            }
            userInfoElement.style.display = 'block';
            userNotLoggedInElement.style.display = 'none';
        } else {
            userInfoElement.style.display = 'none';
            userNotLoggedInElement.style.display = 'block';
        }
    }

    // Function to remove all user-related data from localStorage and redirect to login
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('id');
        displayCorrectList(); // Update the UI to reflect logged-out state
        window.location.href = '#login'; // Redirect to login page
    }

    // Add event listener to logout button
    if (logoutButtonElement) {
        logoutButtonElement.addEventListener('click', function() {
            logout();
        });
    }

    // Initial call to display the correct list
    displayCorrectList();
});

//Profile populate script
function populateUserDetails() {
    const userNameElement = document.getElementById('user-from-local-storage');
    const userEmailElement = document.getElementById('email-from-local-storage');
    const userPhoneElement = document.getElementById('phone-from-local-storage');
    const userIdElement = document.getElementById('id-from-local-storage');

    // Function to get a specific item from localStorage
    function getLocalStorageItem(key) {
        return localStorage.getItem(key);
    }

    // Function to populate user data into HTML
    function populateUserData() {
        const userName = getLocalStorageItem('user') || 'John Doe';
        const userEmail = getLocalStorageItem('email') || 'N/A';
        const userPhone = getLocalStorageItem('phone') || 'N/A';
        const userId = getLocalStorageItem('id') || 'N/A';

       

        if (userNameElement) {
            userNameElement.textContent = userName;
            console.log('User name element updated');
        } else {
            console.error('User name element not found');
        }

        if (userEmailElement) {
            userEmailElement.textContent = "Email : " + userEmail;
            console.log('User email element updated');
        } else {
            console.error('User email element not found');
        }

        if (userPhoneElement) {
            userPhoneElement.textContent = "Phone : " + userPhone;
            console.log('User phone element updated');
        } else {
            console.error('User phone element not found');
        }

        if (userIdElement) {
            userIdElement.textContent = "ID : " + userId;
            console.log('User ID element updated');
        } else {
            console.error('User ID element not found');
        }
    }

    // Populate user data on page load
    populateUserData();
}

















app.run();














