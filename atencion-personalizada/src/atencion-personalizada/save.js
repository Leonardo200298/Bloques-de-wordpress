import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { activeTab, accentColor, imageAtencion, imageCalidad, imageExperiencia } =
		attributes;

	const getImageForTab = () => {
		if (activeTab === 'atencion') return imageAtencion;
		if (activeTab === 'calidad') return imageCalidad;
		if (activeTab === 'experiencia') return imageExperiencia;
		return '';
	};

	const blockProps = useBlockProps.save({ className: 'seccion-destacada' });

	return (
		<div {...blockProps} data-color={accentColor}>
			<div className="col-izquierda">{/* contenido dinámico */}</div>
			<div className="col-derecha">
				{getImageForTab() && (
					<img src={getImageForTab()} alt="Imagen de la sección" />
				)}
			</div>
		</div>
	);
}
