<?php

class VCarrito{

    public static function inithtml(){
    ?>
        <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Carrito</title>
            </head>
            <body>
            <div class="container">
        
    <?php    
    }
    
    public static function tablaCarrito($productosCarrito){
    ?> 
            <table>
                <tr>
                    <th>Pedido</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
                <?php
                    foreach ($productosCarrito as $productoCarrito){
                        echo '<td>' . $productoCarrito["idPedido"] . '</td>';
                        echo '<td>' . $productoCarrito["idProducto"] . '</td>';
                        echo '<td>' . $productoCarrito["Cantidad"] . '</td>';
                    }
                ?>
            </table>
       
   <?php
    }
    public static function endhtml(){
        ?>
        </div>
        </body>
        </html>
    <?php
    }
    
}



