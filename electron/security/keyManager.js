import fs from "fs";
import path from "path";
import crypto from "crypto";
import os from "os";

import { app } from "electron";

// ----------------------------------
// KEY FILE LOCATION
// ----------------------------------

const keyFile = path.join(app.getPath("userData"), "sbilliz.key");

// ----------------------------------
// MACHINE UNIQUE INFO
// ----------------------------------

const machineInfo = os.hostname() + os.platform() + os.arch();

// ----------------------------------
// GENERATE RANDOM SECRET
// ----------------------------------

function generateSecret() {
  return crypto.randomBytes(64).toString("hex");
}

// ----------------------------------
// GENERATE FINAL ENCRYPTION KEY
// ----------------------------------

function generateEncryptionKey(secret) {
  return crypto
    .pbkdf2Sync(secret, machineInfo, 100000, 32, "sha256")
    .toString("hex");
}

// ----------------------------------
// GET DATABASE KEY
// ----------------------------------

export function getDatabaseKey() {
  // Existing key
  if (fs.existsSync(keyFile)) {
    const savedSecret = fs.readFileSync(keyFile, "utf8");

    return generateEncryptionKey(savedSecret);
  }

  // Create new secret
  const secret = generateSecret();

  fs.writeFileSync(keyFile, secret);

  return generateEncryptionKey(secret);
}
