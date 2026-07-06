"""Custom fence formatter that uses 'ct-mermaid' class instead of 'mermaid'
to prevent Material for MkDocs' built-in mermaid renderer (v10.x) from
competing with our extra.js renderer (v11.13.0+)."""

from xml.etree.ElementTree import Element
from pymdownx.superfences import _escape as escape


def fence_mermaid(source, language, class_name, options, md, **kwargs):
    return '<pre class="ct-mermaid"><code>%s</code></pre>' % escape(source)
