"""Rebuilds fonts/fonts.js and fonts/fonts.css from the font folders + tools/fontmeta/*.pb (Google Fonts METADATA).
Run after adding or removing a font folder:  python3 tools/build_fonts.py"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FD, MD = os.path.join(ROOT, 'fonts'), os.path.join(ROOT, 'tools', 'fontmeta')
out = []
for d in sorted(os.listdir(FD)):
    p = os.path.join(FD, d)
    if not os.path.isdir(p):
        continue
    files = sorted(f for f in os.listdir(p) if f.endswith(('.ttf', '.otf', '.woff2')))
    meta = os.path.join(MD, d + '.pb')
    if os.path.exists(meta):
        m = open(meta, encoding='utf-8').read()
        fam = re.search(r'^name:\s*"([^"]+)"', m, re.M).group(1)
        cat = (re.search(r'^category:\s*"([^"]+)"', m, re.M) or [None, ''])[1]
        arabic = '"arabic"' in m
        axes = {a: (float(lo), float(hi)) for a, lo, hi in re.findall(r'axes\s*\{\s*tag:\s*"(\w+)"\s*min_value:\s*([\d.]+)\s*max_value:\s*([\d.]+)', m)}
        weights = {fn: int(w) for w, fn in re.findall(r'weight:\s*(\d+)\s*filename:\s*"([^"]+)"', m)}
    else:  # Geist Mono (not a Google Fonts folder)
        fam, cat, arabic, axes, weights = 'Geist Mono', 'MONOSPACE', False, {'wght': (100, 900)}, {}
    faces = []
    for f in files:
        if 'wght' in axes and ('[' in f or f.endswith('Variable.woff2')):
            w = '%d %d' % axes['wght']
        else:
            w = str(weights.get(f, 400))
        faces.append([d + '/' + f, w])
    ws = sorted({int(x) for _, w in faces for x in w.split()})
    out.append({'family': fam, 'folder': d, 'arabic': arabic, 'category': cat, 'faces': faces, 'weights': [ws[0], ws[-1]]})

open(os.path.join(FD, 'fonts.js'), 'w', encoding='utf-8').write('window.ML_FONTS = ' + json.dumps(out, ensure_ascii=False, indent=0) + ';\n')
css = '/* Motion Library fonts — every family is SIL Open Font License 1.1 (OFL.txt in each folder). */\n'
for f in out:
    for file, w in f['faces']:
        css += "@font-face{font-family:'%s';src:url(\"%s\");font-weight:%s;font-display:block}\n" % (f['family'], file.replace('[', '%5B').replace(']', '%5D'), w)
open(os.path.join(FD, 'fonts.css'), 'w', encoding='utf-8').write(css)
print(len(out), 'families,', sum(f['arabic'] for f in out), 'with Arabic')
for f in out:
    print(' ', f['family'], '| AR' if f['arabic'] else '| LAT', f['weights'], f['category'])
