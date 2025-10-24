import { useState } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, Button, ColorPalette, TextareaControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		activeTab,
		accentColor,
		imageAtencion,
		imageCalidad,
		imageExperiencia,
		contentAtencion,
		contentCalidad,
		contentExperiencia,
		listAtencion,
		extraExperiencia,
	} = attributes;

	const blockProps = useBlockProps();

	const handleTabClick = (tab) => {
		setAttributes({ activeTab: tab });
	};

	const getImageForTab = () => {
		if (activeTab === 'atencion') return imageAtencion;
		if (activeTab === 'calidad') return imageCalidad;
		if (activeTab === 'experiencia') return imageExperiencia;
		return '';
	};

	const getLabelColor = (tab) =>
		activeTab === tab
			? { color: accentColor, fontWeight: '700' }
			: { color: '#333' };

	return (
		<>
			{/* PANEL LATERAL DE OPCIONES */}
			<InspectorControls>
				<PanelBody title="🎨 Ajustes de Colores" initialOpen={true}>
					<p>
						<strong>Color de acento:</strong>
					</p>
					<ColorPalette
						value={accentColor}
						onChange={(newColor) => setAttributes({ accentColor: newColor })}
					/>
				</PanelBody>

				<PanelBody title="🖼 Imágenes de cada pestaña" initialOpen={false}>
					<p><strong>Atención Personalizada</strong></p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageAtencion: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{imageAtencion ? 'Cambiar imagen' : 'Seleccionar imagen'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					<p><strong>Calidad</strong></p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageCalidad: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{imageCalidad ? 'Cambiar imagen' : 'Seleccionar imagen'}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					<p><strong>Experiencia</strong></p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ imageExperiencia: media.url })
							}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{imageExperiencia ? 'Cambiar imagen' : 'Seleccionar imagen'}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody title="✏️ Contenido editable" initialOpen={true}>
					<TextareaControl
						label="Atención Personalizada (texto principal)"
						value={contentAtencion}
						onChange={(val) => setAttributes({ contentAtencion: val })}
					/>

					<TextareaControl
						label="Lista - Atención Personalizada (una línea por ítem)"
						value={listAtencion}
						onChange={(val) => setAttributes({ listAtencion: val })}
						help="Edita los ítems de la lista, uno por línea."
					/>

					<TextareaControl
						label="Calidad"
						value={contentCalidad}
						onChange={(val) => setAttributes({ contentCalidad: val })}
					/>

					<TextareaControl
						label="Experiencia (texto principal)"
						value={contentExperiencia}
						onChange={(val) => setAttributes({ contentExperiencia: val })}
					/>

					<TextareaControl
						label="Párrafo adicional - Experiencia"
						value={extraExperiencia}
						onChange={(val) => setAttributes({ extraExperiencia: val })}
					/>
				</PanelBody>
			</InspectorControls>

			{/* BLOQUE PRINCIPAL */}
			<div {...blockProps} className="seccion-destacada">
				<div className="col-izquierda">
					<div className="tabs">
						<span
							style={getLabelColor('atencion')}
							onClick={() => handleTabClick('atencion')}
						>
							▣ Atención Personalizada
						</span>

						<div className="arreglo">
							<span
								style={getLabelColor('calidad')}
								onClick={() => handleTabClick('calidad')}
							>
								▣ Calidad
							</span>
							<span
								style={getLabelColor('experiencia')}
								onClick={() => handleTabClick('experiencia')}
							>
								▣ Experiencia
							</span>
						</div>
					</div>

					<div className="contenido">
						{/* ATENCIÓN PERSONALIZADA */}
						{activeTab === 'atencion' && (
							<div>
								<p>
									{contentAtencion ||
										'Brindamos nuestros servicios en constante diálogo con nuestros clientes. Clarté trabaja junto a:'}
								</p>
								<ul>
									{(listAtencion
										? listAtencion.split('\n').filter(Boolean)
										: [
												'■ Emprendedores/as.',
												'■ Profesionales.',
												'■ Artistas.',
												'■ Pymes.',
												'■ Empresas.',
										  ]
									).map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							</div>
						)}

						{/* CALIDAD */}
						{activeTab === 'calidad' && (
							<div
								className="grid-calidad"
								dangerouslySetInnerHTML={{
									__html:
										contentCalidad ||
										`<div>1. Máximo impacto en nuestras acciones.</div>
										 <div>2. Estándar de calidad en cada proyecto.</div>
										 <div>3. Evaluar y medir resultados es clave.</div>
										 <div>4. Ética en la base de todo lo que hacemos.</div>`,
								}}
							/>
						)}

						{/* EXPERIENCIA */}
						{activeTab === 'experiencia' && (
							<div>
								<p>
									{contentExperiencia ||
										'Contamos con más de 7 años en el mercado brindando soluciones integrales de comunicación.'}
								</p>
								<p>
									{extraExperiencia ||
										'■ Sabemos lo importante que es para vos desarrollar y contar tu proyecto. Te brindamos la mejor atención personalizada para concretar nuestros objetivos.'}
								</p>
							</div>
						)}
					</div>
				</div>

				<div className="col-derecha">
					{getImageForTab() && (
						<img src={getImageForTab()} alt="Imagen de la sección" />
					)}
				</div>
			</div>
		</>
	);
}
