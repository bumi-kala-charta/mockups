"""Create review thumbnails from actual browser screenshots; never alter DS source assets."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
source = root / 'docs' / 'heroes'
target = root / 'public' / 'hero-previews'
target.mkdir(parents=True, exist_ok=True)

items = ['kontur', 'orbit', 'sinyal', 'indeks']
mobile_board = Image.new('RGB', (1610, 1223), '#EDECE9')
for index, slug in enumerate(items):
    screenshot = Image.open(source / f'{slug}-cover.png').convert('RGB')
    screenshot.save(target / f'{slug}.webp', quality=91, method=6)
    mobile = Image.open(source / f'{slug}-mobile.png').convert('RGB')
    mobile_board.paste(mobile, (10 + index * 400, 24))
mobile_board.save(source / 'four-heroes-mobile.png')
print('4 WebP previews and mobile contact sheet created from verified screenshots.')
