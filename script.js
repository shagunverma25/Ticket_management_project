document.getElementById("ticket-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var seat = document.getElementById("seat").value;
    var date = document.getElementById("date").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    var ticketId = "T" + Math.floor(Math.random() * 10000);

    var existingTickets = Array.from(document.getElementById("history-table-body").getElementsByTagName("tr"));
    var seatTaken = existingTickets.some(row => row.cells[2].innerText === seat);

    if (seatTaken) {
        alert("Seat No " + seat + " is already taken. Please choose a different seat.");
        return;
    }

    var tableBody = document.getElementById("history-table-body");
    var newRow = tableBody.insertRow();
    newRow.innerHTML = "<td>" + ticketId + "</td><td>" + name + "</td><td>" + seat + "</td><td>" + date + "</td><td>" 
    + from + "</td><td>" + to + "</td><td><button class='edit-btn' data-ticket-id='" + ticketId + "'>Edit</button> <button class='delete-btn' data-ticket-id='" 
    + ticketId + "'>Delete</button></td>";

    alert("Ticket with ID " + ticketId + " has been booked successfully.");
    document.getElementById("ticket-form").reset();
});

document.getElementById("view-history-btn").addEventListener("click", function() {
    document.getElementById("ticket-history").style.display = "block";
});

document.getElementById("ticket-history").addEventListener("click", function(event) {
    if (event.target.classList.contains('delete-btn')) {
        var ticketIdToDelete = event.target.getAttribute('data-ticket-id');
        event.target.closest('tr').remove();
        alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
    } else if (event.target.classList.contains('edit-btn')) {
        var ticketIdToEdit = event.target.getAttribute('data-ticket-id');
        var row = event.target.closest('tr');
        var cells = row.getElementsByTagName('td');

        document.getElementById('name').value = cells[1].innerText;
        document.getElementById('seat').value = cells[2].innerText;
        document.getElementById('date').value = cells[3].innerText;
        document.getElementById('from').value = cells[4].innerText;
        document.getElementById('to').value = cells[5].innerText;

        row.remove();

        alert("Edit the ticket details and submit the form.");
    }
});

document.getElementById("search").addEventListener("keyup", function() {
    var filter = this.value.toUpperCase();
    var rows = document.getElementById("history-table-body").getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var match = false;
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toUpperCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
});

function sortTable(columnIndex) {
    var table = document.getElementById("history-table");
    var rows = table.rows;
    var switching = true;
    var shouldSwitch;
    var i;
    var x, y;
    var dir = "asc";
    var switchCount = 0;

    while (switching) {
        switching = false;
        var rowsArray = Array.from(rows).slice(1);
        for (i = 0; i < rowsArray.length - 1; i++) {
            shouldSwitch = false;
            x = rowsArray[i].getElementsByTagName("td")[columnIndex];
            y = rowsArray[i + 1].getElementsByTagName("td")[columnIndex];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rowsArray[i].parentNode.insertBefore(rowsArray[i + 1], rowsArray[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}