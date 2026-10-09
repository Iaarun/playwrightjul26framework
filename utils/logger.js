const fs = require('node:fs'); // filesystem
const os = require('node:os');
const path = require('node:path');

const levels = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 50,
};

const logDirectory = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDirectory, 'api.log');
const configuredLevel = (process.env.LOG_LEVEL || 'silent').toLowerCase();

if (!Object.hasOwn(levels, configuredLevel)) {
  throw new Error(
    `Invalid LOG_LEVEL "${configuredLevel}". Use debug, info, warn, error, or silent.`,
  );
}

function log(level, message, context) {
  if (levels[level] < levels[configuredLevel]) {
    return;
  }

  const details = context ? ` ${JSON.stringify(context)}` : '';
  const output = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}${details}`;
  const write = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;

  write(output);
  fs.mkdirSync(logDirectory, { recursive: true });
  fs.appendFileSync(logFile, `${output}${os.EOL}`, 'utf8');
}

module.exports = {
  debug: (message, context) => log('debug', message, context),
  info: (message, context) => log('info', message, context),
  warn: (message, context) => log('warn', message, context),
  error: (message, context) => log('error', message, context),
};
