<?php
require "./database/database.php";

try {
    // Crea una instancia de la clase Database
    $database = new Database();

    // Obtiene la conexión
    $conn = $database->getConnection();

    // Obtener el número de página desde la solicitud AJAX
$pagina = isset($_GET['pagina']) ? intval($_GET['pagina']) : 1;
$por_pagina =  9; // Cantidad de imágenes por página

// Calcula el inicio y fin para la consulta SQL
$inicio = ($pagina - 1) * $por_pagina;

    // Obtener el término de búsqueda enviado desde el formulario
    if (isset($_POST['search'])) {
        $searchTerm = $_POST['search'];

        // Consulta SQL para buscar una imagen por descripción
        $sql = "SELECT * FROM imagenes_sueltas WHERE descripcion LIKE :searchTerm";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':searchTerm', '%' . $searchTerm . '%', PDO::PARAM_STR);
        $stmt->execute();

        // Crear un array para almacenar los datos de las imágenes
        $imagenes = array();
        
        while ($post = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $imagesName = explode(",", $post['imagen']);
        
            // Agrega los datos de cada imagen al array
            $imagen = array(
                'id_imagen' => $post['id_imagen'],
                'descripcion' => $post['descripcion'],
                'imagenes' => $imagesName,
                'pagina_actual' => $pagina, // Agrega el número de página actual
            );
        
            $imagenes[] = $imagen;
        }
        
        // Obtener el número total de imágenes
        $queryTotal = "SELECT COUNT(*) as total FROM imagenes_sueltas";
        $stmtTotal = $conn->prepare($queryTotal);
        $stmtTotal->execute();
        $total = $stmtTotal->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Calcular el número total de páginas
        $totalPaginas = ceil($total / $por_pagina);
        
        // Crear un array que incluya las imágenes y el número total de páginas
        $respuesta = array(
            'imagenes' => $imagenes,
            'totalPaginas' => $totalPaginas
        );
        
        // Retorna los datos de las imágenes y el número total de páginas en formato JSON
        echo json_encode($respuesta);
        } else {
            // Si no se encontraron resultados
            echo json_encode(array('error' => 'No se encontraron imágenes que coincidan con la búsqueda.'));
        }
        
} catch (PDOException $e) {
    // Manejo de errores en la conexión a la base de datos
    echo json_encode(array('error' => 'Error en la conexión a la base de datos: ' . $e->getMessage()));
}
?>