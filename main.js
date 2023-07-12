const apiUrl = "https://crudcrud.com/api/684d54048b1b40dab154757ef9d002e8";
const localStorageKey = "foodOrders";

function storeDataLocally(data) {
  let storedData = localStorage.getItem(localStorageKey);

  if (storedData) {
    storedData = JSON.parse(storedData);
    storedData.push(data);
  } else {
    storedData = [data];
  }

  localStorage.setItem(localStorageKey, JSON.stringify(storedData));
}

function retrieveDataLocally() {
  const storedData = localStorage.getItem(localStorageKey);

  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

function removeDataLocally(index) {
  let storedData = localStorage.getItem(localStorageKey);

  if (storedData) {
    storedData = JSON.parse(storedData);
    storedData.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(storedData));
  }
}

async function createEntry(data) {
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Data stored successfully in CRUD CRUD API');
      const responseData = await response.json();
      return responseData._id;
    } else {
      console.error('Error storing data in CRUD CRUD API');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function deleteEntry(id, index) {
  try {
    const response = await fetch(`${apiUrl}/orders/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('Data deleted successfully from CRUD CRUD API');
      removeDataLocally(index);
    } else {
      console.error('Error deleting data from CRUD CRUD API');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById("orderForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  var price = document.getElementById("price").value;
  var foodname = document.getElementById("foodname").value;
  var table = document.getElementById("table").value;

  var tableElement = document.getElementById(table);
  var newRow = tableElement.insertRow(-1);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML = price;
  cell2.innerHTML = foodname;

  const data = { price: price, foodname: foodname, table: table };

  const id = await createEntry(data);
  if (id) {
    newRow.setAttribute('data-id', id);
    cell3.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    storeDataLocally({ ...data, id });
  } else {
    console.error('Error creating entry');
    tableElement.deleteRow(-1);
  }

  document.getElementById("price").value = "";
  document.getElementById("foodname").value = "";
});

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  var id = row.getAttribute('data-id');
  var index = Array.from(row.parentNode.children).indexOf(row);

  if (id) {
    deleteEntry(id, index);

    row.parentNode.removeChild(row);
  }
}

window.addEventListener("load", function() {
  const storedData = retrieveDataLocally();

  storedData.forEach(function(data) {
    var tableElement = document.getElementById(data.table);
    var newRow = tableElement.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = data.price;
    cell2.innerHTML = data.foodname;
    cell3.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    newRow.setAttribute('data-id', data.id);
  });
});
