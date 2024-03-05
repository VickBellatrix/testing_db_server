document.addEventListener('DOMContentLoaded', function () {
    var tableBody = document.querySelector('#myTable tbody');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                // Limpiar el contenido existente de la tabla
                tableBody.innerHTML = '';

                // Llenar la tabla con los datos
                data.forEach(function (row) {
                    var newRow = tableBody.insertRow();
                    newRow.insertCell(0).textContent = row.IDproducto;
                    newRow.insertCell(1).textContent = row.nombre;
                    newRow.insertCell(2).textContent = row.cantidad;
                    newRow.insertCell(3).textContent = row.valor_unit;
                });
            } else {
                console.error('Error al obtener los datos:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', 'http://localhost:${port}/datos-json', true);
    xhr.send();
});
///