import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { backgroundColor, textColor, hoverColor, spacing, logoUrl, logoSize, socials, menuItems } = attributes;

  const blockStyle = {
    backgroundColor,
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px'
  };

  return (
    <header {...useBlockProps.save({
      className: 'barra-de-navegacion',
      style: blockStyle
    })}>
      <div className="barra-left">
        {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: `${logoSize}px` }} />}
      </div>

      <nav className="barra-center">
        <button className="hamburger" aria-expanded="false" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>

        <ul className="menu-items" style={{ display: 'flex', gap: `${spacing}px`, listStyle: 'none', margin: 0, padding: 0 }}>
          {menuItems.map((m, i) => (
            <li key={i}>
              {/* usar href tal cual; puede ser anchor interno (#id) para SPA */}
              <a href={m.href}>{m.text}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="barra-right">
        <div className="social-icons">
          {socials.map((s, i) => (s.img ? <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"><img src={s.img} alt={s.name} style={{ height: 24 }} /></a> : null))}
        </div>
      </div>

      {/* Inline styles for hover color (applied in DOM) */}
      <style>{`
        .barra-de-navegacion .menu-items li a { color: ${textColor}; transition: color .2s ease; text-decoration: none; }
        .barra-de-navegacion .menu-items li a:hover { color: ${hoverColor}; }
        /* hamburger visible only on small screens via CSS file as well */
      `}</style>
    </header>
  );
}
