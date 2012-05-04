<?php 

/*
	Plugin Name: Responsive Everything
	Description: A plugin to make everything responsive! This plugin removes all height & width attributes as well as inline height and width styles.
	Author: Patrick Rauland
	Author URI: http://www.patrickrauland.com
	
	Version: 1.0.0
	
	License: GNU General Public License v2.0
	License URI: http://www.opensource.org/licenses/gpl-license.php
*/

add_action( 'init', 'WPFluidSettingsInit', 15 );
function WPFluidSettingsInit() {
	//Translations
	if ( !is_admin() ) { // instruction to only load if it is not the admin area
		$foo_loc = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));
		$js_loc = $foo_loc . '/lib/';
		wp_register_script('fluidimage', $js_loc.'fluidimage.js', array('jquery'), '1.0',false);
		wp_enqueue_script('fluidimage');
	}
}


add_action ( 'wp_footer','fluidstyle' );
function fluidstyle() {
	if(!is_admin()) {
		echo '<style type="text/css">img{max-width:97%;height:auto;}</style>';
	}
}

add_filter( 'post_thumbnail_html', 's25_remove_image_dimensions', 10 );
add_filter( 'image_send_to_editor', 's25_remove_image_dimensions', 10 );
function s25_remove_image_dimensions($html){
	$html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html );
	return $html;
}

