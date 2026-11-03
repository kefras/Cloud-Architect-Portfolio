"""Small decorative SVG icons; no remote icon font or runtime dependency."""

PATHS = {
    "robotics": '<rect x="4" y="6" width="16" height="13" rx="4"/><path d="M12 2v4M1 11v5m22-5v5M8 22v-3m8 3v-3M9 15h6"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/>',
    "cloud": '<path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 8a5 5 0 0 0 1 10Z"/>',
    "pipeline": '<path d="M5 5v14h14M5 12h7V5h7v14"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/>',
    "containers": '<path d="m12 3 8 4v10l-8 4-8-4V7Zm-8 4 8 4 8-4M12 11v10M8 5l8 4"/>',
    "code": '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
    "server": '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h.01M7 17h.01M12 6h5M12 17h5"/>',
    "window": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 6.5h.01M10 6.5h.01m0 6-3 2 3 2m4-4 3 2-3 2"/>',
    "database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    "ai": '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4Z"/>',
    "terminal": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 0h5"/>',
    "award": '<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>',
}


def icon(name):
    """Render a trusted decorative icon alongside visible text."""
    return (
        '<svg class="line-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
        + PATHS[name]
        + "</svg>"
    )
