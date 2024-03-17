// Cloud Firestore Database | https://firebase.google.com/docs/firestore/quickstart?hl=es
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
// Cloud Firestore Storage | https://firebase.google.com/docs/storage/web/start?hl=es
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from './firebase'

//Init services
const db = getFirestore(app);
const storage = getStorage(app);

let collectionName = 'productos';
const colRef = collection(db, collectionName);

getDocs(colRef)
    .then((snapshot) => {
        const productos = Promise.all(snapshot.docs.map(async (doc) => {
            const producto = { ...doc.data(), id: doc.id };
            //console.log(producto.id);

            // Obtén la primera imagen del array
            const imgURL = await getDownloadURL(ref(storage, producto.imagenes[0]));
            //Actualizamos path de la imagen a la url de la base de datos
            producto.imagen = imgURL;

            return producto;
        }));
        return productos;
    })
    .then((productos) => {
        productos.forEach(producto => {
            console.log(producto.id);
            // Obtiene el contenedor de productos
            const productContainer = document.getElementById("product-container");

            const cardHtml = `
                <div class="card">
                    <div class="fixed-card">
                        <img src="${producto.imagen}" class="img-container" data-product="${producto.id}"   alt="${producto.nombre}">
                        <div class="description">
                        <span class="title">${producto.nombre}</span> 
                            
                        </div>
                    </div>
                </div>
            `;

            // Agrega la tarjeta al contenedor de productos
            productContainer.innerHTML += cardHtml;

            // Obtén los elementos de las cards
            const imgContainer = document.querySelectorAll('.img-container');

            // Maneja el clic en los botones
            imgContainer.forEach(function (card) {
                card.addEventListener('click', function (event) {
                    // Obtén el identificador del producto desde el atributo data-product
                    const productId = event.target.getAttribute('data-product');

                    // Redirige al usuario a la página de detalles del producto con el identificador del producto
                    window.location.href = `detallesProducto.html?id=${productId}`;
                });
            });
        });
    })
    .catch(err => {
        console.log(err.message);
    });

// funcion barra de busqueda
function buscarPorNombre() {
    let input = document.getElementById("searchInput").value;
    /* Limpiamos el input | No case sensitive, No importa tildes */
    input = quitarTildes(input.toLowerCase());

    /* Quitamos lo que no coincide con la busqueda */
    const productContainer = document.getElementById("product-container");
    let productos = Array.from(productContainer.children);
    productos.forEach(p => {
        const productName = p.querySelector(".title").textContent;

        if (quitarTildes(productName.toLowerCase()).includes(input))
            p.classList.remove("d-none");
        else
            p.classList.add("d-none");
    });
}

function quitarTildes(str) {
    return str.normalize('NFD')
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();
} /* Source: https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos */

document.getElementById("applyFiltersBtn").addEventListener("click", buscarPorNombre);


//---------------------Subir JSON a la base de datos----------------------
/* 
const jsonPath = "json/productos.json";

async function leerYProcesarJson() {
    try {

        const response = await fetch(jsonPath);
        const data = await response.json();
        //------DEBUG--------
        // console.log(data);
        // for (const p of data) {
        //   console.log(p);
        // }
        //-------------------
        data.forEach(p => {

            let id = `${p.id}`;

            //Hace que los id tengan el formato 000, para que quede ordenados por id
            const maxLength = 3;
            const idStringLength = maxLength - id.length;
            for (let i = 0; i < idStringLength; i++)
                id = '0' + id;

            delete p.id; //Quita el id de dentro objeto para no subirlo a la db

            setDoc(doc(db, 'productos', id), p);
        });

    } catch (error) {
        console.log(`Se produjo un error: ${error}`);
    }
}
*/

//const subirJsonBtn = document.querySelector('#SubirJson');
//subirJsonBtn.addEventListener('click', leerYProcesarJson);

//--------Test----------------
//getDocs(collection(db, collectionName))
//    .then((snapshot) => {
//        // console.log(snapshot);
//        let arr = [];
//        snapshot.docs.forEach((doc) => {
//            arr.push({ ...doc.data(), id: doc.id })
//        });
//        console.log(arr);
//    })
//    .catch(err => {
//        console.log(err.message);
//    })