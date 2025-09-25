-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "date" DATETIME NOT NULL,
    "time" TEXT,
    "clubId" TEXT NOT NULL,
    "recurrenceFrequency" TEXT,
    "recurrenceInterval" INTEGER,
    "recurrenceCount" INTEGER,
    "recurrenceUntil" DATETIME,
    "isSacPriority" BOOLEAN NOT NULL DEFAULT false,
    "recurringEventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("clubId", "createdAt", "date", "description", "id", "location", "recurrenceCount", "recurrenceFrequency", "recurrenceInterval", "recurrenceUntil", "time", "title", "updatedAt") SELECT "clubId", "createdAt", "date", "description", "id", "location", "recurrenceCount", "recurrenceFrequency", "recurrenceInterval", "recurrenceUntil", "time", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
