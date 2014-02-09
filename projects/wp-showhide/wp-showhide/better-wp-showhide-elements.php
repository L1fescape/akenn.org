<?php
/*
Plugin Name: Better WP ShowHide Elements
Plugin URI: http://akenn.org
Description: Adds a Javascript for you to hide or show what ever ID you want with a mouse click. You need to add some code to your theme to make it work.
Version: 0.2
Author: Andrew Kennedy
Author URI: http://akenn.org
*/

function wp_showhide_header(){
	echo '<script type="text/javascript" src="'.get_settings('siteurl').'/wp-content/plugins/better-wp-showhide-elements/better-wp-showhide-elements.js"></script>';
}

function wp_showhide_footer(){ ?>
	<script>
	if ( typeof(window.addEventListener) !== 'undefined' )
		window.addEventListener( "load", wp_showhide.init(), false );
	else if ( typeof(window.attachEvent) !== 'undefined' )
		window.attachEvent( "onload", wp_showhide.init() );
	</script>
<?php }


add_action('wp_head', 'wp_showhide_header');
add_action('wp_footer', 'wp_showhide_footer');

?>