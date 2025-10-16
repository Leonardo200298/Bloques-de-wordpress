const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor || wp.editor;

registerBlockType('mi-bloque/boton', {
    title: 'Botón Personalizado',
    icon: 'button',
    category: 'design',
    attributes: {
        label: { type: 'string', default: 'Mi botón' },
        color: { type: 'string', default: '#30ade7ff' },
        size: { type: 'number', default: 16 }
    },
    edit: (props) => {
        const style = {
            backgroundColor: props.attributes.color,
            fontSize: props.attributes.size + 'px',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            display: 'inline-block',
            cursor: 'pointer'
        };

        return wp.element.createElement(
            'div',
            { style: { textAlign: 'center' } },
            wp.element.createElement(RichText, {
                tagName: 'span',
                style: style,
                value: props.attributes.label,
                onChange: (newLabel) => props.setAttributes({ label: newLabel })
            })
        );
    },
    save: (props) => {
        const style = {
            backgroundColor: props.attributes.color,
            fontSize: props.attributes.size + 'px',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            display: 'inline-block'
        };
        return wp.element.createElement('span', { style: style }, props.attributes.label);
    }
});
