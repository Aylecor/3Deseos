
// async function cargar() {
//     try {
//         let response1 = await fetch('nav.html');
//         let response2 = await fetch('footer.html');
//         if (response1.ok && response2.ok) {
//             let data1 = await response1.text();
//             let data2 = await response2.text();
//             document.querySelector('.header').innerHTML = data1;
//             document.querySelector('.footer').innerHTML = data2;
//         } else {
//             console.error('Error al cargar el archivo', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error al cargar el archivo:', error);
//     }
// }
// cargar();
function calcularPrecio() {
    var cantidad = document.getElementById("cantidad").value;
    var costo = document.getElementById("costo").value;
    var material = document.getElementById("material").value;
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value;
    var tiempo = document.getElementById("tiempo").value;
    var tarifa = document.getElementById("tarifa").value;

    // Cálculos adicionales según tu fórmula
    var costoMaterial = (peso / 1000) * materialCost(material);
    var costoTiempo = tiempo * tarifa;
    var costoDesperdicio = costoMaterial * 0.10; // Supongamos un 10% de desperdicio

    // Cálculo del precio total
    var precioTotal = cantidad * costo + costoMaterial + costoTiempo + costoDesperdicio;

    // Formatear el precio total con dos decimales y el símbolo del dólar
    var precioFormateado = precioTotal.toFixed(2);
    precioFormateado = "$" + precioFormateado;

    // Mostrar el precio total en el elemento con id "precioTotal"
    document.getElementById("precioTotal").textContent = precioFormateado;
}

function materialCost(material) {
    var costos = {
        "pla": 0.03, // Ejemplo: $0.03 por gramo de PLA
        "abs": 0.04, // Ejemplo: $0.04 por gramo de ABS
        "petg": 0.05 // Ejemplo: $0.05 por gramo de PETG
    };
    return costos[material];
}

document.getElementById('btnCalcularPrecio').addEventListener('click', calcularPrecio);