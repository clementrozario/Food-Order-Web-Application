const apiUrl = "https://crudcrud.com/api/dcea481d4af243b8bfc903af65de9e7f";
const localStorageKey = "foodOrders";

function storeDataLocally(data) {
  let storedData = localStorage.getItem(localStorageKey) || "[]";
  storedData = JSON.parse(storedData);
  storedData.push(data);
  localStorage.setItem(localStorageKey, JSON.stringify(storedData));
}

async function createEntry(data) {
  try {
    const response = await fetch(`${'https://crudcrud.com/api/dcea481d4af243b8bfc903af65de9e7f'}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData._id;
    } else {
      console.error('Error storing data in CRUD API');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function deleteEntry(id) {
  try {
    const response = await fetch(`${'https://crudcrud.com/api/dcea481d4af243b8bfc903af65de9e7f'}/orders/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error('Error deleting data from CRUD API');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById("orderForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const price = document.getElementById("price").value;
  const foodname = document.getElementById("foodname").value;
  const table = document.getElementById("table").value;

  const data = { price, foodname, table };

  const id = await createEntry(data);
  if (id) {
    storeDataLocally({ ...data, id });
    createTableRow(price, foodname, table, id);
    clearFormInputs();
  } else {
    console.error('Error creating entry');
  }
});

function createTableRow(price, foodname, table, id) {
  const tableElement = document.getElementById(table);
  const newRow = tableElement.insertRow(-1);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.innerHTML = price;
  cell2.innerHTML = foodname;
  cell3.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

  newRow.setAttribute('data-id', id);
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  const id = row.getAttribute('data-id');
  deleteEntry(id);
  removeDataLocally(id);
  row.parentNode.removeChild(row);
}

function removeDataLocally(id) {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const updatedData = parsedData.filter(item => item.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
  }
}

function clearFormInputs() {
  document.getElementById("price").value = "";
  document.getElementById("foodname").value = "";
}

window.addEventListener("load", function() {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    parsedData.forEach(function(data) {
      createTableRow(data.price, data.foodname, data.table, data.id);
    });
  }
});
