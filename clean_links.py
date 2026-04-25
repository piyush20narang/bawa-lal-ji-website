import re
import glob

files = glob.glob('*.html')
targets = ['story.html', 'events.html', 'video.html', 'bhajan.html', 'donation.html', 'contact.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    for target in targets:
        # Remove nav and footer list items
        content = re.sub(r'\s*<li>\s*<a href="' + re.escape(target) + r'"[^>]*>.*?</a>\s*</li>', '', content, flags=re.DOTALL)
        
        # Remove standalone buttons (like 'Read Full Story')
        content = re.sub(r'\s*<a href="' + re.escape(target) + r'"[^>]*class="[^"]*btn[^"]*"[^>]*>.*?</a>', '', content, flags=re.DOTALL)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Cleaned navigation and buttons from {len(files)} files.")
