
import re

b64_file = r"D:\GitHub\TEST\Solid Todo App\png_b64.txt"
target_file = r"D:\GitHub\TEST\Solid Todo App\src\index.jsx"

with open(b64_file, 'r', encoding='ascii') as f:
    b64_content = f.read().strip().replace('\n', '').replace('\r', '')

# Construct the CSS string with the PNG data URI
# background: #324fff url('data:image/png;base64,...') no-repeat ...
new_url_part = f"url('data:image/png;base64,{b64_content}')"

with open(target_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Regex to find the existing url('...') part inside the console.log style string
# It matches url('data:image/...') until the closing quote
# The previous attempt used single quotes for the URL inside the backticks.
pattern = r"url\('data:image/[^']+'\)"

# Check if pattern implies SVG or just any data URI
# The currently broken one is data:image/svg+xml;base64,...
# We want to replace ANY data image url there.

if re.search(pattern, js_content):
    new_js_content = re.sub(pattern, new_url_part, js_content, count=1)
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_js_content)
    print("Successfully reverted to PNG.")
else:
    print("Could not find data URI to replace.")

