// Constantes importantes para el funcionamiento
const imgDefault = "img/default.jpg"

//DOM Initials
let content = document.getElementById('content')
let productsFilter = document.getElementById('products_filter')
let productsList = document.getElementById('products_list')
let productListContent = document.getElementById('productListContent')

//Valores iniciales del filtro
let colorFilter = ""
let categoryFilter = document.getElementById('selector')
let searchInput = document.getElementById('searchInput')

//FUNCTIONS

// Función para capitalizar la primera letra de cada palabra
function capitalizeFirstLetter(string) {
    return string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}

//Api conect
//GET Inventarios
const url = 'https://apipromocionales.marpico.co/api/inventarios/materialesAPI';
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.R0FNQSBNQVJLRVRJTkcgQ1JFQVRJVk8.-5qbXqQ-FvkSud5vYCq8IwXGVl6evAtQ8zrk0YYcohc'
const headers = new Headers({
    'Authorization': `Api-Key ${apiKey}`,
    'Content-Type': 'application/json'
});
//Adquiere todos los productos desde la API
fetch(url, {
    method: 'GET',
    headers: headers
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}).then(products => {
    let categoriasSet = new Set()
    let colorSet = new Set()
    //Extraer los sets de los productos
    products.results.forEach(product => {
        //Extraer las categorías        
        categoriasSet.add(product.subcategoria_1.nombre)
        //Estraer colores existentes
        product.materiales.forEach(hijo => {
            colorSet.add(hijo.color_nombre)
        })
    })

    //Extrae los valores únicos de los sets
    let categorias = Array.from(categoriasSet)
    let categoriasModificadas = categorias.map(categoria => {
        return {
            original: categoria,
            show: capitalizeFirstLetter(categoria)
        };
    });

    //Evento de cambio del selector
    categoryFilter.addEventListener('change', function (event) {
        // Llama a la función para mostrar los productos filtrados
        printFilter(products.results)
    });

    //Evento de cambio del filtro de busqueda
    searchInput.addEventListener('change', function (event) {
        // Llama a la función para mostrar los productos filtrados
        printFilter(products.results)
    });


    categoriasModificadas.forEach(categoria => {
        let option = document.createElement('option');
        option.value = categoria.original;
        option.innerHTML = categoria.show;
        categoryFilter.appendChild(option);
    });

    //Mostrar productos
    showProducts(products.results)

    //Agrega el boton del Pop-UP para cerrar
    document.getElementById("closePopupBtn").addEventListener("click", function () {
        closePopup();
    });


}).catch(error => {
    console.error('Problemas al adquirir los productos de la API', error);
});


//-------------------FUNCIONES------------------------
//Paginación de los productos
function paginateProducts() {

}
//Imprimir filtro
function printFilter(products) {
    //Filtra los productos
    const filteredProducts = filterProducts(products)
    //Imprime los valores nuevamente en la lista de productos
    productsList.innerHTML = ""
    if (filteredProducts.length > 0) {
        let noProducts = document.getElementById('noProducts')
        if (noProducts) {
            productListContent.removeChild(noProducts)
        }
        showProducts(filteredProducts)
    } else {
        if (categoryFilter.value == "Todas las Categorías") {
            let noProducts = document.getElementById('noProducts')
            if (noProducts) {
                productListContent.removeChild(noProducts)
            }
            if (searchInput.value != "") {
                noProductError()
            } else {
                showProducts(products)
            }

        } else {
            //Imprimir mensaje de no hay productos
            noProductError()
        }
    }
}
//Error de no encontro producto
function noProductError() {
    let noProducts = document.getElementById('noProducts')
    if (noProducts) {

    } else {
        let noProducts = document.createElement('p')
        noProducts.classList.add('no_products')
        noProducts.id = 'noProducts'
        noProducts.innerHTML = " No se ha encontrado ningún producto 😔"
        productListContent.appendChild(noProducts)
    }
}
//Filtrar productos
function filterProducts(products) {

    let filteredProducts = products.filter(product => {
        const matchesColor = !colorFilter || product.hijos.some(hijo => hijo.color === colorFilterValue);
        const matchesSearch = !searchInput.value || product.descripcion_comercial.toLowerCase().includes(searchInput.value);
        if (categoryFilter.value == "Todas las Categorías") {
            return matchesColor && matchesSearch;
        } else {
            const matchesCategory = !categoryFilter.value || product.subcategoria_1.nombre === categoryFilter.value;
            return matchesCategory && matchesColor && matchesSearch;
        }
    });
    return filteredProducts
}

//Mostrar los productos
function showProducts(products, initial_product, end_product) {
    // Iterar sobre cada producto y agregarlo a la lista
    products.slice(initial_product, end_product).forEach(product => {

        //Crear una tarjeta por cada producto
        let card = document.createElement('a')
        card.classList.add('product_card')
        card.setAttribute("href", "#")
        card.id = product.familia.replace(" ", "-")
        //Crea la imagen
        let img = document.createElement('img')
        img.classList.add('product_img')
        if (product.imagen != null) {
            img.src = product.imagen
        } else {
            img.src = imgDefault
        }


        //Crea el título
        let title = document.createElement('h3')
        title.classList.add('product_title')
        title.innerHTML = capitalizeFirstLetter(product.descripcion_comercial)

        //Agregar elementos a la tarjeta
        card.appendChild(img)
        card.appendChild(title)

        //Agregar la tarjeta al contenedor
        productsList.appendChild(card)
    });

    //Trabaja con cada elemento y lo muestra en el pup up
    let productCards = document.getElementsByClassName("product_card");
    for (let i = 0; i < productCards.length; i++) {
        //Agrega un evento click a cada elemento
        productCards[i].addEventListener("click", function (event) {
            event.preventDefault();
            //Mostrar el Pop Up
            showPopup();

            //Adquiere el ID del elemento clickeado y agrega guiones en los espacios
            const idProducto = this.id.replace("-", " ")

            //Encuentra el Elemento en el array de products
            let productoAsociado = products.find(findProduct => {
                return findProduct.familia === idProducto;
            });

            //Imprime el producto dentro del Pop-Up
            printProduct(productoAsociado)
        });
    }
}

//Funciones para el Pop-Up
function showPopup() {
    let popup = document.getElementById("popup")
    popup.style.display = 'block';
    setTimeout(() => {
        popup.querySelector('.popup-content').style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50); // Retraso pequeño para asegurar la animación
}

function closePopup() {
    let popup = document.getElementById("popup")
    popup.querySelector('.popup-content').style.transform = 'translate(-50%, -50%) scale(0.1)';
    popup.style.display = 'none';
    document.getElementById('popup-principal-content').innerHTML = ""

}

//Imprimir producto dentro del Pop-Up
async function printProduct(prodImp) {
    let popupContent = document.getElementById('popup-principal-content')

    //Estructura del contenido
    //Contenedor parte superior del pop up
    let upContent = document.createElement('div')
    upContent.classList.add('up-content')
    //Contenedor de los divs de las imagenes
    let popupImgContent = document.createElement('div')
    popupImgContent.classList.add('popup-img-content')
    //Contenedor de la imagen principal
    let primaryImg = document.createElement('div')
    primaryImg.classList.add('primary-img')
    primaryImg.id = "primaryImg"
    //Contenedor otras vistas
    let alternativeImg = document.createElement('div')
    alternativeImg.classList.add('alternative-img')
    //Contenedor información principal
    let primaryInformation = document.createElement('div')
    primaryInformation.classList.add('primary-information')
    //Contenedor de la información secundaria
    let secondaryInformation = document.createElement('div')
    secondaryInformation.classList.add('secondary-information')

    popupContent.appendChild(upContent)
    popupContent.appendChild(secondaryInformation)
    upContent.appendChild(popupImgContent)
    upContent.appendChild(primaryInformation)
    popupImgContent.appendChild(primaryImg)
    popupImgContent.appendChild(alternativeImg)

    //Adquiere la imagen
    let img = document.createElement('img')
    img.classList.add('popup_product_img')
    if (prodImp.imagen) {
        img.src = prodImp.imagen
    } else {
        img.src = imgDefault
    }

    //Adquiere las imagenes unicas de los productos
    console.log(prodImp)
    //Mostrar las imagenes al dar click y cargar la lista de imagenes
    for (i = 0; i < prodImp.imagenes.length; i++) {
        let imgInContent = document.createElement('div')
        imgInContent.classList.add('img_in_content')
        let secondaryImg = document.createElement('img')
        secondaryImg.classList.add('secondary_img')
        secondaryImg.id = "img" + i
        secondaryImg.src = prodImp.imagenes[i]

        imgInContent.appendChild(secondaryImg)
        alternativeImg.appendChild(imgInContent)

        secondaryImg.addEventListener('click', function (e) {
            e.preventDefault()
            img.src = this.src

            let images = document.getElementsByClassName('secondary_img')
            for(i=0 ; i<images.length ; i++){
                images[i].classList.remove('img_active')
            }
            this.classList.add('img_active')
        })
    }

    //-----Adquiere Informacion Primaria---------
    //Adquiere el título
    let title = document.createElement('h3')
    title.classList.add('popup_product_title')
    title.innerHTML = capitalizeFirstLetter(prodImp.descripcion_comercial)
    //Adquiere la descripcion
    let description = document.createElement('p')
    description.classList.add('popup_product_description')
    description.innerHTML = capitalizeFirstLetter(prodImp.descripcion_larga)
    //Adquiere el precio
    let precio = document.createElement('p')
    precio.classList.add('popup_product_price')
    precio.innerHTML = capitalizeFirstLetter("$0.00")
    //Titulo "Colores"
    let colorTitle = document.createElement('h3')
    colorTitle.classList.add('popup_product_title')
    colorTitle.innerHTML = 'Colores'
    //Div que contiene los colores
    let contentColors = document.createElement('div')
    contentColors.classList.add('popup_content_colors')
    //Adquiere el color
    prodImp.materiales.forEach(hijo => {
        //Encuentra el Elemento en el array de Colors
        let colorProd = colors.find(findColor => {
            return findColor.color === hijo.color_nombre;
        });
        let colorProduct = document.createElement('a')
        colorProduct.classList.add('popup_product_colors')
        colorProduct.id = 'p' + hijo.codigo
        if (colorProd) {
            colorProduct.style.backgroundColor = colorProd.codigo
        } else {
            colorProduct.style.backgroundColor = "#fff"
        }
        contentColors.appendChild(colorProduct)
    })

    //Titulo "Disponible"
    let stockTitle = document.createElement('h3')
    stockTitle.classList.add('popup_product_title')
    stockTitle.innerHTML = "Disponible"

    //Stock Disponible
    let stock = document.createElement('p')
    stock.classList.add('popup_product_price')
    stock.innerHTML = "Seleccione un Color para Revisar el Stock"
    stock.id = "stockDisponible"

    //--------Adquiere Informacion secundaria----
    //Titulo Descripcion
    let descripcion = document.createElement('h3')
    descripcion.classList.add('popup_title_info')
    descripcion.innerHTML = "Descripción"


    //----------Informacion Primaria-------------
    //Agregar elementos al contenido del Pop Up
    //Imagen principal
    primaryImg.appendChild(img)
    //Titulo
    primaryInformation.appendChild(title)
    //Descripcion
    primaryInformation.appendChild(description)
    // //Precio
    // primaryInformation.appendChild(precio)
    //Titulo "Colores"
    primaryInformation.appendChild(colorTitle)
    //Div que contiene Colores
    primaryInformation.appendChild(contentColors)
    //Titulo Disponible
    primaryInformation.appendChild(stockTitle)
    //Stock Disponible
    primaryInformation.appendChild(stock)
    printStock(prodImp)

    //---------Informacion Secundaria------------
    //Titulo Descripcion
    secondaryInformation.appendChild(descripcion)

    // Añadir información sobre la impresión
    addInformation("Técnica de Impresión", prodImp.tecnica_marca_descripcion, secondaryInformation);
    addInformation("Área de Impresión", prodImp.area_impresion, secondaryInformation);

    // Añadir información sobre las medidas
    if (prodImp.medidas_alto != null) {
        addInformation("Alto", prodImp.medidas_alto, secondaryInformation);
    }
    if (prodImp.medidas_ancho != null) {
        addInformation("Ancho", prodImp.medidas_ancho, secondaryInformation);
    }
    if (prodImp.medidas_largo != null) {
        addInformation("Largo", prodImp.medidas_largo, secondaryInformation);
    }
    if (prodImp.medidas_diametro != null) {
        addInformation("Diametro", prodImp.medidas_diametro, secondaryInformation);
    }



    // Añadir información sobre el material
    addInformation("Material", prodImp.material, secondaryInformation);

    // // Añadir información sobre la capacidad
    // addInformation("Capacidad", prodImp.capacidad, secondaryInformation);

    // Añadir información sobre el paquete
    addInformation("Alto Paquete", prodImp.empaque_alto, secondaryInformation);
    addInformation("Largo Paquete", prodImp.empaque_largo, secondaryInformation);
    addInformation("Ancho Paquete", prodImp.empaque_ancho, secondaryInformation);
    // addInformation("Piezas por Caja", prodImp.paquete.PiezasCaja, secondaryInformation);
    // addInformation("Piezas por Inner", prodImp.paquete.PiezasInner, secondaryInformation);
    // addInformation("Caja Individual", prodImp.paquete.cajaIndividual, secondaryInformation);
    // addInformation("Cantidad Inner", prodImp.paquete.cantidadInner, secondaryInformation);
    // addInformation("Peso Bruto", prodImp.paquete.pesoBruto, secondaryInformation);
    // addInformation("Peso Neto", prodImp.paquete.pesoNeto, secondaryInformation);
    // addInformation("Unidad de Peso", prodImp.paquete.unidadPeso, secondaryInformation);
    // addInformation("Unidad de Volumen", prodImp.paquete.unidadVolumen, secondaryInformation);

    //Hacer el div de la imagen principal cuadrado
    const squareDiv = document.querySelector('.primary-img');
    if (squareDiv) {
        const width = squareDiv.offsetWidth;
        squareDiv.style.height = `${width}px`;
    }


}
//Agregar elemento a la descripcion secundaria
function addInformation(label, contenido, secondaryInformation) {
    let elemento = document.createElement('p');
    elemento.classList.add('popup_descripcion_info');
    elemento.innerHTML = "<b>" + label + ":</b> " + contenido;
    secondaryInformation.appendChild(elemento);
}
//Pintar Stock en Pop-UP
function printStock(prodImp) {
    let productColors = document.getElementsByClassName("popup_product_colors");
    for (let i = 0; i < productColors.length; i++) {
        productColors[i].addEventListener('click', async function (event) {
            const stockDocument = document.getElementById('stockDisponible');
            const idProducto = this.id.replace("p", "")
            //Adquirir stock Disponible
            let stockDisponible = 0
            if (prodImp.materiales.status == 0) {
            } else {
                stockDisponible = getStock(prodImp, idProducto)
                if (stockDisponible != null) {
                    stockDocument.innerHTML = stockDisponible
                } else {
                    stockDocument.innerHTML = 0
                }
            }
        })
    }
}
//Adquiere el stock
function getStock(prodImp, code) {
    let filterStock = prodImp.materiales.filter(product => {
        let matchesCode = null
        if (product.codigo) {
            matchesCode = !code || product.codigo.toString().includes(code);
        } else {
            matchesCode = null;
        }
        return matchesCode
    });

    if (filterStock[0]) {
        return filterStock[0].inventario_almacen[0].cantidad
    }
    return null
}
