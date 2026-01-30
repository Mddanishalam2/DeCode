const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
const util = require('util');
const execPromise = util.promisify(exec);

const writeCodeToFile = (language, code, input) => {
  const jobId = uuid();
  const dirPath = path.join(__dirname, 'temp', jobId);
  fs.mkdirSync(dirPath, { recursive: true });

  const fileExtension = {
    c: 'c',
    cpp: 'cpp',
    java: 'java',
    python: 'py',
  }[language];

  const fileName = language === 'java' ? 'Main.java' : `main.${fileExtension}`;
  const filePath = path.join(dirPath, fileName);
  const inputPath = path.join(dirPath, 'input.txt');

  fs.writeFileSync(filePath, code);
  fs.writeFileSync(inputPath, input || '');

  return { dirPath, filePath, inputPath, fileName };
};

const runCode = async (code, language, input) => {
  const { dirPath, filePath, inputPath, fileName } = writeCodeToFile(language, code, input);

  let dockerCommand = '';

  switch (language) {
    case 'c':
      dockerCommand = `docker run --rm -v ${dirPath}:/app gcc:latest sh -c "gcc /app/${fileName} -o /app/a.out && /app/a.out < /app/input.txt"`;
      break;
    case 'cpp':
      dockerCommand = `docker run --rm -v ${dirPath}:/app gcc:latest sh -c "g++ /app/${fileName} -o /app/a.out && /app/a.out < /app/input.txt"`;
      break;
    case 'java':
      dockerCommand = `docker run --rm -v ${dirPath}:/app openjdk:latest sh -c "javac /app/${fileName} && java -cp /app Main < /app/input.txt"`;
      break;
    case 'python':
      dockerCommand = `docker run --rm -v ${dirPath}:/app python:3.10-alpine python /app/${fileName} < /app/input.txt`;
      break;
    default:
      throw new Error('Unsupported language');
  }

  try {
    const { stdout, stderr } = await execPromise(dockerCommand, { timeout: 5000 });

    if (stderr) return stderr;
    return stdout || 'Program finished with no output.';
  } catch (err) {
    return err.stderr || err.message || 'Unknown error';
  } finally {
    // Clean up temp directory (optional: disable in dev)
    // fs.rmSync(dirPath, { recursive: true, force: true });
  }
};

module.exports = runCode;