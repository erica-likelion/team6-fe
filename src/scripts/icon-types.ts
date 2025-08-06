import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../assets/icons');
const OUTPUT_FILE = path.resolve(__dirname, '../components/Icon/icon-type.ts');

function generateIconTypes() {
  const iconTypes = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.replace('.svg', ''));

  const typeFile = `// ⚠️ This file is auto-generated.\n\nexport type iconTypes =\n  | ${iconTypes.map((name) => `'${name}'`).join('\n  | ')};\n`;

  fs.writeFileSync(OUTPUT_FILE, typeFile);
}

generateIconTypes();