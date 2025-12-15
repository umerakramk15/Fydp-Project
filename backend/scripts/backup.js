import fs from "fs";
import path from "path";
import { exec } from "child_ process";
import { promisify } from "util";

const execAsync = promisify(exec);

const backupDatabase = async () => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const backupDir = path.join(process.cwd(), "backups", date);

    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Backup command
    const command = `mongodump --uri="${process.env.MONGODB_URI}" --out="${backupDir}"`;

    console.log(`Starting backup: ${date}`);
    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes("writing")) {
      console.error("Backup error:", stderr);
    } else {
      console.log(`✅ Backup completed: ${backupDir}`);
    }
  } catch (error) {
    console.error("Backup failed:", error.message);
  }
};

// Manual backup
if (process.argv[2] === "--run") {
  backupDatabase();
}

export default backupDatabase;
