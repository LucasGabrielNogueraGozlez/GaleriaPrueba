$(document).ready(function() {
    console.log("Script de edición de Cargado de Imagenes cargado.");

    const generarListadoImagenes = (data) => {
        data.imagenes.forEach(function(imagen) {
            // Create a new element .col and .card with jQuery
            var colCardContainer = $('<div>');
            colCardContainer.addClass('col');
            colCardContainer.attr('id', 'col' + imagen.id_imagen);

            var cardElement = $('<div>');
            cardElement.addClass('card');

            // Create a new element div with jQuery
            var carouselElement = $('<div>');

            // Assign the ID dynamically to the carousel element
            carouselElement.attr('id', 'carousel' + imagen.id_imagen);
            carouselElement.addClass('carousel slide');
            carouselElement.attr('data-bs-ride', 'carousel');

            // Create the carousel container outside the loop
            var carouselInner = $('<div class="carousel-inner"></div>');

            // Loop through the images and create the carousel-item elements
            $.each(imagen.imagenes, function(j, imageName) {
                var isActive = j === 0 ? 'active' : '';

                // Create the carousel item
                var carouselItem = $('<div>');
                carouselItem.addClass('carousel-item ' + isActive);

                // Add the carousel item to the carousel inner
                carouselInner.append(carouselItem);

                // Create the modal dynamically
                var modal = $('<div class="modal fade" id="modal' + imagen.id_imagen + '-' + j + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">');
                var modalDialog = $('<div class="modal-dialog modal-dialog-centered modal-lg">');
                var modalContent = $('<div class="modal-content">');
                var modalBody = $('<div class="modal-body">');

                // Create the carousel element
                var carouselElement = $('<div>');
                carouselElement.addClass('carousel slide');
                carouselElement.attr('id', 'carousel' + imagen.id_imagen + '-' + j);
                carouselElement.attr('data-bs-ride', 'carousel');

                // Create the carousel inner element
                var modalCarouselInner = $('<div>');
                modalCarouselInner.addClass('carousel-inner');

                 // Create the link and the image container
                 var link = $('<a>');
                 link.attr('href', '#');
                 link.attr('data-bs-toggle', 'modal');
                 link.attr('data-bs-target', '#modal' + imagen.id_imagen + '-' + j);
             
                 var imageContainer = $('<div>');
                 imageContainer.addClass('image-container');
                 imageContainer.attr('id', 'image-' + imagen.id_imagen + '-' + j);
                 imageContainer.attr('data-description', imagen.descripcion[j]);
                 imageContainer.css('background-image', 'url(\'./assets/images/posts/' + imageName + '\')');
             
                 link.append(imageContainer);
                 carouselItem.append(link);

                // Loop through the images and create the carousel-item elements
                $.each(imagen.imagenes, function(k, modalImageName) {
                    var modalIsActive = k === j ? 'active' : '';

                    // Create the carousel item
                    var modalCarouselItem = $('<div>');
                    modalCarouselItem.addClass('carousel-item ' + modalIsActive);

                    // Create the image element
                    var modalImageElement = $('<img>');
                    modalImageElement.attr('src', './assets/images/posts/' + modalImageName);
                    modalImageElement.addClass('d-block w-100');

                    // Add the image to the carousel item
                    modalCarouselItem.append(modalImageElement);

                    // Add the carousel item to the carousel inner
                    modalCarouselInner.append(modalCarouselItem);
                });

                // Add the carousel inner to the carousel element
                carouselElement.append(modalCarouselInner);

                // Create navigation buttons for the carousel
                var prevButton = $('<button class="carousel-control-prev" data-bs-target="#carousel' + imagen.id_imagen + '-' + j + '" data-bs-slide="prev">');
                prevButton.html('<span class="carousel-control-prev-icon" aria-hidden="true"></span>');
                var nextButton = $('<button class="carousel-control-next" data-bs-target="#carousel' + imagen.id_imagen + '-' + j + '" data-bs-slide="next">');
                nextButton.html('<span class="carousel-control-next-icon" aria-hidden="true"></span>');

                // Add the navigation buttons to the carousel
                carouselElement.append(prevButton);
                carouselElement.append(nextButton);

                // Add the carousel to the modal body
                modalBody.append(carouselElement);

                // Add CSS to the modal body to make it fill the entire modal
                modalBody.css('justify-content', 'center');
                modalBody.css('align-items', 'center');

                modalContent.append(modalBody);
                modalDialog.append(modalContent);
                modal.append(modalDialog);

                // Add the modal to the end of the document
                $('body').append(modal);
            });

            // Add the carousel inner to the carousel element
            carouselElement.append(carouselInner);

            // Add the carousel to the card element
            cardElement.append(carouselElement);

            // Add the card to the column container
            colCardContainer.append(cardElement);

            // Add the column container to the row container
            $('#row').append(colCardContainer);

                // Crear el elemento card-body dentro de la .card
                var cardBodyElement = $('<div>').addClass('card-body');
                cardBodyElement.attr('id', 'card-body-' + imagen.id_imagen);
                cardBodyElement.append('<div class="original-description" id="DescriptionID-' + imagen.id_imagen + '">' + imagen.descripcion + '</div>');

                
                // Crear el contenedor para botones-utilidades y agregar botones
                var botonesUtilidadesContainer = $('<div>').addClass('botones-utilidades');
                botonesUtilidadesContainer.append('<button class="delete-button" data-image-id="' + imagen.id_imagen + '"><i class="bi bi-trash3 fa-6x"></i></button>');
                botonesUtilidadesContainer.append('<button class="btn-edit-description" data-image-id="' + imagen.id_imagen +'"><i class="bi bi-pencil-square"></i></button>');
                botonesUtilidadesContainer.append('<a class="download-button" href="#" data-images="' + imagen.imagenes.join(',') + '" data-description="' + imagen.descripcion + '" data-descriptions="' + imagen.descripcion + '"><i class="bi bi-download"></i></a>');
                
                // Agregar el contenedor de botones-utilidades al card-body
                cardBodyElement.append(botonesUtilidadesContainer);
        

                carouselElement.append(carouselInner);
                cardElement.append(carouselElement, cardBodyElement);
                colCardContainer.append(cardElement);
                

                // Crea el elemento .description-edit-container
                var descriptionEditContainer = $("<div>").addClass("description-edit-container").attr("id", "description-edit-" + imagen.id_imagen).css("display", "none");

                // Crea el formulario dentro del contenedor
                var formElement = $("<form>").attr("action", "editar-descripcion.php").attr("method", "POST").attr("id", "edit-form-" + imagen.id_imagen);

                // Crea el textarea dentro del formulario
                var textareaElement = $("<textarea>").attr("maxlength", "25").attr("name", "new-description").addClass("form-control").text(imagen.descripcion);

                // Crea los elementos input ocultos dentro del formulario
                var hiddenInputId = $("<input>").attr("type", "hidden").attr("name", "id_imagen").val(imagen.id_imagen);
                var hiddenInputEditDescription = $("<input>").attr("type", "hidden").attr("name", "edit-description").val(imagen.descripcion || ''); // Cambia esto según tu necesidad
                var hiddenInputPaginaActual = $("<input>").attr("type", "hidden").attr("name", "pagina_actual").val(imagen.pagina_actual); // Cambia esto según tu necesidad

                // Crea el botón "Guardar" dentro del formulario
                var saveButton = $("<button>").attr("type", "submit").addClass("btn btn-primary").attr("id","guardar-btn").text("Guardar");

                // Crea el enlace "Cancelar" dentro del formulario
                var cancelButton = $("<a>").attr("href", "#").addClass("btn btn-secondary cancel-edit").attr("data-image-id", imagen.id_imagen).text("Cancelar"); 

                // Agrega los elementos al formulario
                formElement.append(textareaElement, hiddenInputId, hiddenInputEditDescription, hiddenInputPaginaActual, saveButton, cancelButton);

                // Agrega el formulario al contenedor .description-edit-container
                descriptionEditContainer.append(formElement);

                // Agrega el contenedor al lugar adecuado en tu página (por ejemplo, a un div con un ID específico)
                colCardContainer.find('.card-body').append(descriptionEditContainer); // Cambia ".card-body" al selector adecuado dentro del contexto de colCardContainer

                // Agregar el elemento carousel al DOM (por ejemplo, a un contenedor con clase "container")
                $('#image-container').append(colCardContainer);
            });

        //Descargar Imágenes
        downloadimage();

        //activar el botón de eliminar
        BotonEliminar();
        console.log("Botón de eliminar correctamente activado");
        
        //Activa y desactiva el modo oscuro en la página
        ModoOscuro();
    }

    // Función para cargar las imágenes y luego activar la edición
    function cargarImagenesYActivarEdicion(pagina) {
        var container = $("#image-container"); // El contenedor de imágenes
        container.empty(); // Vacía el contenedor antes de cargar nuevas imágenes
    
        $.ajax({
            type: "GET",
            url: "cargar_Imagenes.php?pagina=" + pagina,
            dataType: "json",
            success: function (data) {
                container.empty();

                generarBotonesPaginacion(data.totalPaginas, pagina);
                generarListadoImagenes(data);
                // Create a new carousel item for each image uploaded
                
            },
                error: function(error) {
                    console.error("Error en la solicitud AJAX:", error);
                    // Manejar errores de la solicitud AJAX aquí
                }
        });
    }
    //Paginación
    const generarBotonesPaginacion = (totalPaginas, paginaActual) => {
        var paginationContainer = $("#pagination-container");
        var paginationList = paginationContainer.find("ul.pagination");
        paginationList.empty();
    
        var prevButton = $("<li class='page-item'><a class='page-link' href='#'><-</a></li>");
        prevButton.click(function (event) {
            event.preventDefault();
            if (paginaActual > 1) {
                cargarImagenesYActivarEdicion(paginaActual - 1);
            }
        });
    
        var nextButton = $("<li class='page-item'><a class='page-link' href='#'>-></a></li>");
        nextButton.click(function (event) {
            event.preventDefault();
            if (paginaActual < totalPaginas) {
                cargarImagenesYActivarEdicion(paginaActual + 1);
            }
        });
    
        paginationList.append(prevButton);
    
        // Calcula el rango de páginas a mostrar (máximo 5 páginas)
        var startPage = Math.max(1, paginaActual - 2);
        var endPage = Math.min(startPage + 4, totalPaginas);
    
        for (var i = startPage; i <= endPage; i++) {
            var pageButton = $("<li class='page-item'><a class='page-link' href='#'>" + i + "</a></li>");
    
            if (i === paginaActual) {
                pageButton.addClass("active");
            }
    
            pageButton.click(function (event) {
                event.preventDefault();
                var newPage = parseInt($(this).text());
                cargarImagenesYActivarEdicion(newPage);
                history.pushState({}, "", "index2.php?page=" + newPage);
            });
    
            paginationList.append(pageButton);
        }
    
        paginationList.append(nextButton);
    }
    

    // Llamada inicial para generar la paginación
    cargarImagenesYActivarEdicion(1);  

    // Llama a la función para adjuntar el manejador de eventos
     GuardarDescripcionAJAX(); 


//Función para el modo oscuro de la página
function ModoOscuro() {
            $(document).ready(function() {
                // Función para guardar el estado del modo en una cookie
                function saveDarkModeStateToCookie(isDarkMode) {
                    document.cookie = `darkMode=${isDarkMode}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/`;
                }
            
                // Función para cargar el estado del modo desde la cookie
                function loadDarkModeStateFromCookie() {
                    const cookies = document.cookie.split(';');
                    for (const cookie of cookies) {
                        const [name, value] = cookie.trim().split('=');
                        if (name === 'darkMode') {
                            return value === 'true';
                        }
                    }
                    return false;
                }
            
                // Función para habilitar el modo oscuro
                function enableDarkMode() {
                    console.log("Modo oscuro activado");
                    $("body").addClass("dark");
                    $(".card-body").addClass("dark");
                    $(".modal-body").addClass("dark");
                    $(".mode-text").text("Modo Oscuro");
                    $(".LogoVierciBlanco").css("display", "block");
                    $(".LogoVierciAzul").css("display", "none");
                }
            
                // Función para deshabilitar el modo oscuro
                function disableDarkMode() {
                    console.log("Modo oscuro desactivado");
                    $("body").removeClass("dark");
                    $(".card-body").removeClass("dark");
                    $(".modal-body").removeClass("dark");
                    $(".mode-text").text("Modo Claro");
                    $(".LogoVierciBlanco").css("display", "none");
                    $(".LogoVierciAzul").css("display", "block");
                }
            
                // Cargar el estado del modo al cargar la página
                const isDarkMode = loadDarkModeStateFromCookie();
                if (isDarkMode) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            
                // Manejar el cambio de modo
                $(document).on('click', '#darkModeSwitch', function() {
                    const isDarkMode = $("body").hasClass("dark");
                    if (isDarkMode) {
                        // Desactivar el modo oscuro
                        disableDarkMode();
                    } else {
                        // Activar el modo oscuro
                        enableDarkMode();
                    }
                    // Guardar el estado del modo en una cookie
                    saveDarkModeStateToCookie(!isDarkMode);
                });
                $(document).off('click', '#darkModeSwitch').on('click', '#darkModeSwitch', function() {
                    const isDarkMode = $("body").hasClass("dark");
                    if (isDarkMode) {
                        // Desactivar el modo oscuro
                        disableDarkMode();
                    } else {
                        // Activar el modo oscuro
                        enableDarkMode();
                    }
                    // Guardar el estado del modo en una cookie
                    saveDarkModeStateToCookie(!isDarkMode);
                });
            });
}
// Controlador de la carga de imágenes
$(document).ready(function () {
    //la función se ejecuta cuando se hace click en el botón de cargar imágenes
    $("#btn-new-post-photo").click(function () {
        var formData = new FormData($("#uploadForm")[0]);

        $(this).prop('disabled', true);

        console.log("Iniciando carga de imágenes...");

        $.ajax({
            type: "POST",
            url: "controllers/new-post-photo.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Respuesta exitosa de la carga de imágenes:", response);

                if (response.success) {
                    // Elimina todas las imágenes existentes antes de agregar las nuevas
                    console.log("Eliminando imágenes existentes...");
                    $("#image-container").empty();

                    //Entonces carga las imágenes cuando se haya eliminado las anteriores
                    //para despues volver a cargar las imágenes
                    console.log("Cargando imágenes...");
                    cargarImagenesYActivarEdicion(1);

                    // Mostrar mensaje de éxito
                    console.log("Mensaje de éxito:", response.success);
                    alert(response.success); 
                    $("#btn-new-post-photo").prop('disabled', false);
                } else if (response.error) {
                    // Mostrar mensaje de error
                    console.log("Mensaje de error:", response.error);
                    alert(response.error);
                    $("#btn-new-post-photo").prop('disabled', false);
                }
            },
            error: function (error) {
                // Maneja errores aquí.
                console.log("Error al cargar imágenes:", error);
                alert("Hubo un error al subir las imágenes." + error);
            }
        });
    });
});


$("#search-form").on("submit", function(e) {
  e.preventDefault(); // Evita que el formulario se envíe de manera tradicional

  var searchTerm = $("#search-input").val();

  $.ajax({
      url: "buscar_img.php",
      method: "POST",
      data: { search: searchTerm },
      dataType: "json",
      success: function(data) {
          if (data.error) {
              // Manejar el caso de que no se encontraron resultados
              console.log(data.error);
          } else {
              // Manejar el caso de que se encontraron imágenes
              console.log("Imágenes encontradas:", data);
      
              // Limpiar la galería antes de agregar nuevas imágenes
              var container = $("#image-container"); // El contenedor de imágenes
              container.empty();
              

              generarBotonesPaginacion(data.totalPaginas, pagina=1);
              generarListadoImagenes(data);
          }
      },
      
      error: function(xhr, status, error) {
          console.log('Error en la solicitud AJAX:');
          console.log('Status:', status);
          console.log('Error:', error);
      }
  });
}); 


 //Función BotonEliminar
 function BotonEliminar() {
    $(".delete-button").click(function(event) {
        event.preventDefault();

        const paginaActual = parseInt($('.page-item.active .page-link').text()); // Captura la página actual

        const imageId = $(this).data("image-id");
        const confirmacion = confirm("¿Quieres eliminar la imagen?");

        if (confirmacion) {
            $.ajax({
                url: "eliminar-imagen.php",
                method: "POST",
                data: { id_imagen: imageId },
                dataType: "json",
                success: function(response) {
                    if (response.success) {
                        $(`#col${imageId}`).remove(); // Elimina la imagen

                        // Recalcular la página actual después de eliminar

                        const newPage = paginaActual;

                        // Volver a cargar la página correspondiente a la imagen eliminada
                        cargarImagenesYActivarEdicion(newPage);

                        setTimeout(function () {
                            alert("Imagen Eliminada Exitosamente.");
                        }, 100);
                    } else {
                        alert("Error al eliminar la imagen: " + response.error);
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
}
});

//Cambios revisados con el repo de Lucas.


function GuardarDescripcionAJAX() {
    $(document).ready(function() {
        // Agregar el controlador de eventos una vez en el documento listo
        $('body').on('click', '#guardar-btn', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
            // Obtener los valores del formulario
            var form = $(this).closest('form');
            var newDescription = form.find('textarea[name="new-description"]').val();
            var imageId = form.find('input[name="id_imagen"]').val();
            var paginaActual = form.find('input[name="pagina_actual"]').val();
    
            console.log('newDescription:', newDescription);
            console.log('imageId:', imageId);
            console.log('paginaActual:', paginaActual);
    
            // Realizar la solicitud AJAX
            $.ajax({
                url: 'editar-descripcion.php',
                type: 'POST',
                data: {
                    'new-description': newDescription,
                    'id_imagen': imageId,
                    'pagina_actual': paginaActual
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status === 'success') {
                        // Actualiza la descripción en la página sin recargarla
                        var originalDescription = form.closest('.card-body').find('.original-description');
                        originalDescription.text(newDescription);
    
                        // Restaura la visibilidad de la descripción original y los botones
                        form.closest('.description-edit-container').hide();
                        originalDescription.show();
                        form.closest('.card-body').find('.botones-utilidades').show();
    
                        // Muestra un mensaje de éxito
                        alert(response.message);
                    } else {
                        // Muestra un mensaje de error
                        alert(response.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Error en la solicitud AJAX:');
                    console.log('xhr:', xhr);
                    console.log('Status:', status);
                    console.log('Error:', error);
                }
            });
        });
    });    
//Eventos para la edicición de la descripción
$(document).ready(function() {
    $(document).on("click", ".btn-edit-description", function() {
        console.log("Botón de edición de descripción clickeado");

        var imageId = $(this).data("image-id");
        var cardBody = $(this).closest('.card-body');

        // Hide the original description and buttons
        cardBody.find('.botones-utilidades, .original-description').hide();

        // Create the description edit container
        var descriptionEditContainer = $(`#description-edit-${imageId}`);

        // Show the description edit container
        descriptionEditContainer.addClass('visible');
        descriptionEditContainer.css('display', 'block');
    });

    $(document).on("click", ".cancel-edit", function() {
        console.log("Botón de cancelación de descripción clickeado");

        var imageId = $(this).data("image-id");
        var cardBody = $(this).closest('.card-body');

        // Hide the description edit container
        // $(`#description-edit-${imageId}`).removeClass('visible');
        $(`#description-edit-${imageId}`).hide();
        // Show the original description and buttons
        cardBody.find('.botones-utilidades, .original-description').show();

    });
});

}