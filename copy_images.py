import os
import shutil

src_dest_map = {
    '/Users/namanopedia/Downloads/temple - The Boali.jpg': 'temple-baoli.jpg',
    '/Users/namanopedia/Downloads/Temple - Sarovar.jpg': 'temple-sarovar.jpg',
    '/Users/namanopedia/Downloads/temple - Kachi Samadhi .jpg': 'temple-kachi-samadhi.jpg',
    '/Users/namanopedia/Downloads/dhianpur.jpg': 'dhianpur.jpg',
    '/Users/namanopedia/Downloads/bawa lala ji 11.jpg': 'bawa-lal-ji-11.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji.jpg': 'bawa-lal-ji.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji 12.jpg': 'bawa-lal-ji-12.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji -10.jpg': 'bawa-lal-ji-10.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji - 7.jpg': 'bawa-lal-ji-7.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji - 6.jpg': 'bawa-lal-ji-6.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji - 5.jpg': 'bawa-lal-ji-5.jpg',
    '/Users/namanopedia/Downloads/bawa lal ji - 3.jpg': 'bawa-lal-ji-3-new.jpg',
    '/Users/namanopedia/Downloads/Bawa lal dayal ji.jpg': 'bawa-lal-dayal-ji.jpg'
}

dest_dir = '/Users/namanopedia/.gemini/antigravity/scratch/bawa-lal-ji/images/gallery'

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for src, dest_name in src_dest_map.items():
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src):
        shutil.copy2(src, dest_path)
        print(f"Copied {src} to {dest_path}")
    else:
        print(f"File not found: {src}")
