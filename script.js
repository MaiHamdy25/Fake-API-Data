//fetch data from the API
function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            populateTable(data);
        } else {
            console.error('Failed to fetch data.');
        }
    };
    xhr.send();
}
function populateTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    data.forEach(user => {
        const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><button onclick="getUserDetails(${user.id})">View Details</button></td>
                    </tr>
                `;
        tbody.innerHTML += row;
    });
}

//get user details by ID
function getUserDetails(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/users/${id}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            showPopup(user);
        } else {
            console.error('Failed to fetch user details.');
        }
    };
    xhr.send();
}

//show popup
function showPopup(user) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popupOverlay');
    const detailsDiv = document.getElementById('userDetails');
    detailsDiv.innerHTML = `
                <strong>ID:</strong> ${user.id}<br>
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Phone:</strong> ${user.phone}<br>
                <strong>Website:</strong> ${user.website}<br>
                <strong>Company:</strong> ${user.company.name}<br>
            `;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

//close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popupOverlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

fetchData();