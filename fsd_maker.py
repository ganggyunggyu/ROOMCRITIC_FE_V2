import os
import sys

if len(sys.argv) != 3:
    print("Usage: python generate_fsd.py <depth> <domain>")
    sys.exit(1)

depth = sys.argv[1]
domain = sys.argv[2]

dirs = ['api', 'ui', 'hooks', 'model']
base_path = f'src/{depth}/{domain}'

for d in dirs:
    path = f'{base_path}/{d}'
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/index.ts', 'w') as f:
        f.write(f"export * from './{domain}.{d}';\n")
    with open(f'{path}/{domain}.{d}.ts', 'w') as f:
        f.write(f"export const {d}{domain.capitalize()}Fn = () => {{}};\n")

with open(f'{base_path}/index.ts', 'w') as f:
    f.write("export * from './api'\nexport * from './hooks'\nexport * from './model'\nexport * from './ui'\n")

print(f"✅ FSD 구조 생성 완료: src/{depth}/{domain}")