<?php
// This file is generated. Do not modify it manually.
return array(
	'barra-de-navegacion' => array(
		'apiVersion' => 3,
		'name' => 'mi-bloque/barra-de-navegacion',
		'title' => 'Barra de Navegación Personalizable',
		'category' => 'design',
		'icon' => 'menu',
		'attributes' => array(
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'hoverColor' => array(
				'type' => 'string',
				'default' => '#0073aa'
			),
			'spacing' => array(
				'type' => 'number',
				'default' => 20
			),
			'logoUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'logoSize' => array(
				'type' => 'number',
				'default' => 40
			),
			'socials' => array(
				'type' => 'array',
				'default' => array(
					array(
						'name' => 'Facebook',
						'url' => '#',
						'img' => ''
					),
					array(
						'name' => 'Instagram',
						'url' => '#',
						'img' => ''
					),
					array(
						'name' => 'LinkedIn',
						'url' => '#',
						'img' => ''
					)
				)
			),
			'menuItems' => array(
				'type' => 'array',
				'default' => array(
					array(
						'text' => 'Inicio',
						'href' => '#inicio'
					),
					array(
						'text' => '¿Quiénes somos?',
						'href' => '#quienes-somos'
					),
					array(
						'text' => '¿Qué hacemos?',
						'href' => '#que-hacemos'
					),
					array(
						'text' => 'Servicios',
						'href' => '#servicios'
					),
					array(
						'text' => 'Cursos',
						'href' => '#cursos'
					),
					array(
						'text' => 'Equipo',
						'href' => '#equipo'
					),
					array(
						'text' => 'Contacto',
						'href' => '#contacto'
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	)
);
