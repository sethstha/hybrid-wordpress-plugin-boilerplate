<?php
/**
 * Plugin Name: WordPress Hybrid Plugin
 * Plugin URI: 
 * Description: A Hybrid Plugin that uses Webpack
 * Author: Your Name
 * Author URI: 
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.2
 * Text Domain: hybrid
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */


/**
 * Add a page for plugin
 */

function hb_register_custom_menu_page()
{

    add_menu_page(__('Hybrid Plugin', 'hybrid'),
        'Hybrid Plugin',
        'manage_options',
        dirname(__FILE__) . '/page.php',
        '',
        90);
}
add_action('admin_menu', 'hb_register_custom_menu_page');

function hb_register_scripts()
{

    $script_dependencies = array(
        'dependencies' => null,
        'version' => null,
    );

    if (file_exists(__DIR__ . '/assets/js/build/app.asset.php')) {
        $script_dependencies = require __DIR__ . '/assets/js/build/app.asset.php';
    }


    wp_enqueue_script('hybrid-plugin', 'http://localhost:3000/dist/app.js', $script_dependencies['dependencies'], $script_dependencies['version'], true);
}
add_action('admin_init', 'hb_register_scripts');
?>