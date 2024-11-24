-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2024 a las 22:02:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `retrobits`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descuentos`
--

CREATE TABLE `descuentos` (
  `codigo` varchar(20) NOT NULL,
  `porcentaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descuentos`
--

INSERT INTO `descuentos` (`codigo`, `porcentaje`) VALUES
('blackfriday', 25),
('navidad24', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `descuento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `stock` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `idSeccion` int(11) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `descuento`, `idSeccion`, `deleted`) VALUES
(1, 'PlayStation 5', 'Consola de videojuegos de última generación', 499.99, 100, 0, 1, 0),
(2, 'Xbox Series X', 'Consola de videojuegos de última generación de Microsoft', 499.99, 80, 0, 1, 0),
(3, 'Laptop Gaming', 'Laptop con tarjeta gráfica potente', 1299.99, 50, 10, 2, 0),
(4, 'MacBook Pro', 'Laptop de alto rendimiento para profesionales', 2399.99, 30, 5, 2, 0),
(5, 'Cámara DSLR', 'Cámara profesional para fotografía', 799.99, 30, 5, 3, 0),
(6, 'Cámara de acción', 'Cámara portátil resistente al agua', 299.99, 25, 15, 3, 0),
(7, 'Radio Bluetooth', 'Radio portátil con conectividad Bluetooth', 59.99, 200, 0, 4, 0),
(8, 'Smartphone XYZ', 'Teléfono inteligente con gran cámara', 699.99, 75, 15, 5, 0),
(9, 'Smartwatch', 'Reloj inteligente con monitor de salud', 199.99, 150, 20, 5, 0),
(10, 'Licuadora', 'Electrodoméstico para hacer batidos', 49.99, 150, 0, 6, 0),
(11, 'Aspiradora Robot', 'Aspiradora inteligente para el hogar', 299.99, 40, 10, 6, 0),
(12, 'Televisor 4K', 'Televisor con resolución 4K y Smart TV', 999.99, 60, 25, 6, 0),
(13, 'Teclado Mecánico', 'Teclado gamer con retroiluminación', 89.99, 100, 5, 2, 0),
(14, 'Ratón Gaming', 'Ratón con alta precisión y diseño ergonómico', 49.99, 120, 0, 2, 0),
(15, 'Monitor 27\"', 'Monitor Full HD ideal para gaming y trabajo', 249.99, 50, 10, 2, 0),
(16, 'Impresora Multifuncional', 'Impresora que escanea y copia', 199.99, 30, 0, 2, 0),
(17, 'Auriculares Inalámbricos', 'Auriculares Bluetooth con cancelación de ruido', 149.99, 80, 15, 5, 0),
(18, 'Proyector Portátil', 'Proyector compacto para presentaciones', 399.99, 20, 5, 4, 0),
(19, 'Cargador Solar', 'Cargador portátil que utiliza energía solar', 39.99, 200, 0, 5, 0),
(20, 'Batidora', 'Batidora eléctrica con varios niveles de velocidad', 59.99, 100, 0, 6, 0),
(21, 'Gafas de Sol', 'Gafas de sol polarizadas', 49.99, 150, 0, 5, 0),
(22, 'Silla Gaming', 'Silla ergonómica para largas sesiones de juego', 199.99, 50, 20, 2, 0),
(23, 'Teclado de Membrana', 'Teclado silencioso y compacto', 29.99, 200, 0, 2, 0),
(24, 'Cámara Web', 'Cámara HD para videollamadas', 79.99, 100, 10, 5, 0),
(25, 'Microondas', 'Microondas con grill', 149.99, 80, 0, 6, 0),
(26, 'Cafetera', 'Cafetera de goteo con temporizador', 79.99, 150, 0, 6, 0),
(27, 'Robot de Cocina', 'Robot multifuncional para cocinar', 199.99, 50, 15, 6, 0),
(28, 'Ventilador', 'Ventilador portátil', 39.99, 100, 0, 6, 0),
(29, 'Calentador de Agua', 'Calentador eléctrico para baño', 129.99, 30, 5, 6, 0),
(30, 'Barra de Sonido', 'Sistema de sonido envolvente', 249.99, 40, 10, 6, 0),
(31, 'Bicicleta Estática', 'Bicicleta para ejercicios en casa', 299.99, 20, 15, 6, 0),
(32, 'Patinete Eléctrico', 'Patinete para transporte urbano', 499.99, 25, 5, 6, 0),
(33, 'Cámara de Seguridad', 'Cámara IP para vigilancia', 89.99, 100, 0, 4, 0),
(34, 'Almohada Ergonómica', 'Almohada para un mejor descanso', 39.99, 150, 0, 6, 0),
(35, 'Colchón', 'Colchón ortopédico', 399.99, 30, 20, 6, 0),
(36, 'Mochila', 'Mochila de viaje', 49.99, 120, 0, 5, 0),
(37, 'Maleta', 'Maleta de viaje con ruedas', 99.99, 60, 10, 5, 0),
(38, 'Zapatos Deportivos', 'Zapatos cómodos para hacer ejercicio', 69.99, 80, 5, 5, 0),
(39, 'Reloj Analógico', 'Reloj elegante para ocasiones especiales', 149.99, 70, 0, 5, 0),
(40, 'Manta', 'Manta suave para el hogar', 29.99, 150, 0, 6, 0),
(41, 'Paraguas', 'Paraguas resistente al viento', 19.99, 200, 0, 5, 0),
(42, 'Sofá', 'Sofá de tres plazas', 599.99, 10, 10, 6, 0),
(43, 'Mesa de Comedor', 'Mesa de madera para seis personas', 399.99, 15, 5, 6, 0),
(44, 'Silla de Oficina', 'Silla ergonómica para oficina', 129.99, 50, 15, 6, 0),
(45, 'Escritorio', 'Escritorio de estudio', 199.99, 40, 0, 6, 0),
(46, 'Estantería', 'Estantería de madera para libros', 149.99, 30, 10, 6, 0),
(47, 'Cortinas', 'Cortinas blackout para privacidad', 39.99, 80, 0, 6, 0),
(48, 'Jarrón Decorativo', 'Jarrón de cerámica para decoración', 29.99, 150, 0, 6, 0),
(49, 'Ropa de Cama', 'Juego de sábanas y fundas', 49.99, 100, 5, 6, 0),
(50, 'Móvil para Bebés', 'Móvil musical para cuna', 49.99, 70, 0, 6, 0),
(51, 'Cojín', 'Cojín decorativo', 19.99, 120, 0, 6, 0),
(52, 'Cámara Instantánea', 'Cámara que imprime fotos al instante', 149.99, 40, 10, 3, 0),
(53, 'Drone', 'Drone con cámara HD', 299.99, 25, 5, 4, 0),
(54, 'Raspador de Barba', 'Raspador eléctrico para barba', 59.99, 80, 0, 5, 0),
(55, 'Secador de Pelo', 'Secador potente con difusor', 39.99, 150, 0, 6, 0),
(56, 'Plancha de Ropa', 'Plancha de vapor', 49.99, 100, 0, 6, 0),
(57, 'Recortadora', 'Recortadora de cabello recargable', 59.99, 90, 5, 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_pedidos`
--

CREATE TABLE `productos_pedidos` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seccion`
--

INSERT INTO `seccion` (`id`, `nombre`) VALUES
(1, 'consolas'),
(2, 'computadoras'),
(3, 'camaras'),
(4, 'radios'),
(5, 'telefonos'),
(6, 'electrodomesticos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `admin`, `deleted`) VALUES
(26, 'admin', 'admin@admin.admin', '$2y$10$NGQwZPII1I4yVSrFGUcSx.GSNcMSCYvizE1AXBegnBq55wrSUZni2', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `descuentos`
--
ALTER TABLE `descuentos`
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSeccion` (`idSeccion`);

--
-- Indices de la tabla `productos_pedidos`
--
ALTER TABLE `productos_pedidos`
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idSeccion`) REFERENCES `seccion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_pedidos`
--
ALTER TABLE `productos_pedidos`
  ADD CONSTRAINT `productos_pedidos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_pedidos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
