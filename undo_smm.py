file_path = r"c:\Users\ASUS\Downloads\ten\ten\ten\src\app\services\social-media-marketing\page.js"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

ranges_to_delete = [
    (60, 71),
    (76, 92),
    (616, 939), 
    (978, 1073) 
]

new_lines = []
for i, line in enumerate(lines):
    line_num = i + 1
    keep = True
    for start, end in ranges_to_delete:
        if start <= line_num <= end:
            keep = False
            break
    if keep:
        new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done")
