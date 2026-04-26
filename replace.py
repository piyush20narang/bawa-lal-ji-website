import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace favicon
    content = re.sub(
        r'<link rel="icon" href="[^"]*">',
        '<link rel="icon" href="favicon.png">',
        content
    )

    # 2. Replace brand-icon content
    content = re.sub(
        r'<div class="brand-icon">🙏</div>',
        '<div class="brand-icon"><img src="images/tilak.jpg" alt="Tilak" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"></div>',
        content
    )

    # 3. Replace teaching-icon content
    content = re.sub(
        r'<span class="teaching-icon">🙏</span>',
        '<span class="teaching-icon"><img src="images/tilak.jpg" alt="Tilak" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;"></span>',
        content
    )

    # 4. Replace other occurrences in text with inline image
    content = content.replace('🙏', '<img src="images/tilak.jpg" alt="Tilak" class="tilak-icon-inline">')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated")
