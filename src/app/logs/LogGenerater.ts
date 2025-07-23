import fs from 'fs';
import path from 'path';

type infoType = "INFO" | "ERROR"

export const LogGenerater = (message: string, infoType: infoType = "INFO") => {
  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, 'system.log');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] [${infoType}] ${message}\n`);
};
