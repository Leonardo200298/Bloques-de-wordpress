/**
 * Edit.js - Editor del bloque Barra de Navegación
 * Aquí definimos la UI que ve el cliente dentro de Gutenberg.
 */

import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls, MediaUpload, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, RangeControl, Button, TextControl, Notice } from '@wordpress/components';

const DEFAULT_ICONS = { facebook: '', instagram: '', linkedin: '' };

export default function Edit({ attributes, setAttributes }) {
  // Destructuramos atributos
  const {
    backgroundColor,
    textColor,
    hoverColor,
    spacing,
    logoUrl,
    logoSize,
    socials,
    menuItems
  } = attributes;

  // Block wrapper class y estilo básico
  const blockProps = useBlockProps({
    className: 'barra-de-navegacion',
    style: { backgroundColor, color: textColor }
  });

  // Actualizadores auxiliares
  const updateMenuItem = (index, key, value) => {
    const items = JSON.parse(JSON.stringify(menuItems));
    items[index][key] = value;
    setAttributes({ menuItems: items });
  };

  const addMenuItem = () => {
    const items = [...menuItems, { text: 'Nuevo', href: '#' }];
    setAttributes({ menuItems: items });
  };

  const removeMenuItem = (index) => {
    const items = menuItems.filter((_, i) => i !== index);
    setAttributes({ menuItems: items });
  };

  const updateSocial = (index, key, value) => {
    const list = JSON.parse(JSON.stringify(socials));
    list[index][key] = value;
    setAttributes({ socials: list });
  };

  // Small preview: show hamburger when width < 600 in editor? (just static preview)
  // (Real responsive behavior is in CSS for front-end)
  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="Colores" initialOpen>
          <p><strong>Fondo</strong></p>
          <ColorPalette value={backgroundColor} onChange={(c) => setAttributes({ backgroundColor: c })} />
          <p><strong>Texto</strong></p>
          <ColorPalette value={textColor} onChange={(c) => setAttributes({ textColor: c })} />
          <p><strong>Hover</strong></p>
          <ColorPalette value={hoverColor} onChange={(c) => setAttributes({ hoverColor: c })} />
        </PanelBody>

        <PanelBody title="Logo" initialOpen={false}>
          <p>Altura del logo (px)</p>
          <RangeControl
            value={logoSize}
            onChange={(v) => setAttributes({ logoSize: v })}
            min={16}
            max={200}
          />
          <MediaUpload
            onSelect={(media) => setAttributes({ logoUrl: media.url })}
            render={({ open }) => (
              <Button onClick={open} isSecondary>
                {logoUrl ? 'Cambiar logo' : 'Seleccionar logo'}
              </Button>
            )}
          />
          { !logoUrl && <Notice status="info" isDismissible={false}>Sube un logo o deja vacío.</Notice> }
        </PanelBody>

        <PanelBody title="Separación (spacing)" initialOpen={false}>
          <RangeControl
            label="Separación entre items (px)"
            value={spacing}
            onChange={(v) => setAttributes({ spacing: v })}
            min={0}
            max={80}
          />
        </PanelBody>

        <PanelBody title="Redes sociales" initialOpen={false}>
          {socials.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <TextControl
                label={`${s.name} - URL`}
                value={s.url}
                onChange={(v) => updateSocial(i, 'url', v)}
              />
              <MediaUpload
                onSelect={(m) => updateSocial(i, 'img', m.url)}
                render={({ open }) => (
                  <Button onClick={open} isSecondary>
                    { s.img ? 'Cambiar imagen' : 'Seleccionar imagen' }
                  </Button>
                )}
              />
            </div>
          ))}
        </PanelBody>

        <PanelBody title="Menú" initialOpen={false}>
          <Button isPrimary onClick={addMenuItem}>Agregar ítem</Button>
          { menuItems.map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid #eee', paddingTop: 8, marginTop: 8 }}>
              <TextControl
                label={`Texto #${i+1}`}
                value={item.text}
                onChange={(v) => updateMenuItem(i, 'text', v)}
              />
              <TextControl
                label={`Href #${i+1} (ej: #seccion o /otra-pagina)`}
                value={item.href}
                onChange={(v) => updateMenuItem(i, 'href', v)}
              />
              <Button isDestructive onClick={() => removeMenuItem(i)}>Eliminar</Button>
            </div>
          )) }
        </PanelBody>
      </InspectorControls>

      {/* Vista dentro del editor */}
      <nav {...blockProps} style={{ padding: 10 }}>
        <div className="barra-left" style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          {logoUrl ? <img src={logoUrl} alt="Logo" style={{ height: `${logoSize}px` }} /> : <div style={{ width: logoSize, height: logoSize, background: '#eee' }} />}
        </div>

        <ul className="menu-items" style={{ display: 'flex', gap: `${spacing}px`, listStyle: 'none', margin: 0, padding: 0 }}>
          {menuItems.map((m, idx) => (
            <li key={idx}>
              <RichText
                tagName="a"
                value={m.text}
                onChange={(v) => updateMenuItem(idx, 'text', v)}
                placeholder="Texto del menú"
                keepPlaceholderOnFocus
                style={{ color: textColor }}
              />
            </li>
          ))}
        </ul>

        <div className="social-icons" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {socials.map((s, i) => (
            s.img ? <a key={i} href={s.url}><img src={s.img} alt={s.name} style={{ height: 24 }} /></a> : <a key={i} href={s.url} style={{ fontSize: 18 }}>{s.name[0]}</a>
          ))}
        </div>
      </nav>
    </Fragment>
  );
}
