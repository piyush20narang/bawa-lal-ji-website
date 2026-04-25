import re
import glob

files = glob.glob('*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    # 1. Replace Acharyas with Vaishnavacharyas in menus
    content = content.replace(
        '<span class="lang-en">Acharyas</span><span class="lang-hi">आचार्य</span>', 
        '<span class="lang-en">Vaishnavacharyas</span><span class="lang-hi">वैष्णवाचार्य</span>'
    )
    
    # 2. Remove social links
    social_links_pattern = r'\s*<div class="social-links" style="margin-top: 1rem;">.*?</div>'
    content = re.sub(social_links_pattern, '', content, flags=re.DOTALL)
    
    # 3. Remove Media and Connect footer columns
    media_connect_pattern = r'\s*<div class="footer-col">\s*<h4 class="lang-en">Media</h4>.*?</ul>\s*</div>\s*<div class="footer-col">\s*<h4 class="lang-en">Connect</h4>.*?</ul>\s*</div>'
    content = re.sub(media_connect_pattern, '', content, flags=re.DOTALL)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Headers and Footers synced across {len(files)} files.")
