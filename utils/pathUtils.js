import path from 'path';

/*
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the project root (one level above utils)
const projectRoot = path.resolve(__dirname, '..');

export default projectRoot;
*/

const pathAbsolute = new URL('.', import.meta.url).pathname;
const __dirname = path.dirname(pathAbsolute).slice(1);
export default __dirname;