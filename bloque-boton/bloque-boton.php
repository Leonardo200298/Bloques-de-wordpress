<?php
/**
 * Plugin Name: Bloque Boton
 * Description: Un botón personalizable para Gutenberg.
 * Version: 1.0
 * Author: Leonardo
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// 🔹 Log para confirmar ejecución del plugin
error_log("✅ Plugin cargado: Bloque Boton");

// 🔹 Registrar bloque y script correctamente
function registrar_bloque_boton() {
    error_log("✅ Ejecutando registrar_bloque_boton()");

    // Registrar el script JS del bloque con dependencias correctas
    wp_register_script(
        'bloque-boton-script',
        plugins_url( 'build/bloque-boton/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/bloque-boton/index.js' )
    );

    // Registrar el bloque (usa el block.json si existe)
    register_block_type( 'mi-bloque/boton', array(
        'editor_script' => 'bloque-boton-script',
    ) );

    error_log("✅ Bloque Boton registrado correctamente");
}
add_action( 'init', 'registrar_bloque_boton' );
