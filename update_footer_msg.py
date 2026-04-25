import glob

files = glob.glob('*.html')

old_en = 'The Compassionate Lord of Dhianpur. An eternal Dharma Rakshak, a sage who bridged the chasm between religions and eras.'
old_hi = 'धियानपुर के दयालु भगवान। एक शाश्वत धर्म रक्षक, एक संत जिन्होंने धर्मों और युगों के बीच की खाई को पाटा।'

new_en = 'Walk the path of truth, stay humble, and remember the Divine in all that you do.<br><span style="opacity: 0.8; font-style: italic; font-size: 0.9em; display: block; margin-top: 0.5rem;">- Inspired by the teachings of Shri Bawa Lal Dayal ji</span>'
new_hi = 'सत्य के मार्ग पर चलें, विनम्र रहें और अपने सभी कार्यों में ईश्वर को याद रखें।<br><span style="opacity: 0.8; font-style: italic; font-size: 0.9em; display: block; margin-top: 0.5rem;">- श्री बावा लाल दयाल जी की शिक्षाओं से प्रेरित</span>'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    content = content.replace(old_en, new_en)
    content = content.replace(old_hi, new_hi)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Footer messages updated across {len(files)} files.")
