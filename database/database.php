<?php

// Verifica si la clase ya está definida antes de declararla
if (!class_exists('Database')) {
    class Database
    {
        private $server = '192.168.12.40';
        private $username = 'Hola';
        private $password = 'HolaHola';
        private $database = 'galeria';
        private $conn;

        public function __construct()
        {
            try {
                $this->conn = new PDO("mysql:host=$this->server;dbname=$this->database;", $this->username, $this->password);
                // Configuración adicional si es necesario
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die('Connection failed: ' . $e->getMessage());
            }
        }

        public function getConnection()
        {
            return $this->conn;
        }
    }
}

?>
