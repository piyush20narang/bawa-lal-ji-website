import glob

files = glob.glob('*.html')

navbar_insert = '          <li><a href="aarti.html"><span class="lang-en">Aarti</span><span class="lang-hi">आरती</span></a></li>\n'
footer_insert = '            <li><a href="aarti.html"><span class="lang-en">Aarti</span><span class="lang-hi">आरती</span></a></li>\n'

for filepath in files:
    if filepath == 'aarti.html':
        continue # Already contains it

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if '<a href="gaddies.html"' in line and '<span class="lang-hi">गद्दियां</span>' in line:
            new_lines.append(line)
            # Check if we are in navbar or footer
            if '<li>' in line:
                if '          <li>' in line:
                    new_lines.append(navbar_insert)
                elif '            <li>' in line:
                    new_lines.append(footer_insert)
                else:
                    new_lines.append(navbar_insert)
        else:
            new_lines.append(line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

print("Updated links to Aarti")
