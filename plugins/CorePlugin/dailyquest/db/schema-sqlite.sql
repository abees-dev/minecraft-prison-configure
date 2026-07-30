-- Docs: DailyQuest SQLite schema. Applied when storage.type=sqlite (idempotent CREATE IF NOT EXISTS).
-- Period keys: daily/checkin use yyyy-MM-dd; weekly uses yyyy-'W'ww in reset-timezone.

CREATE TABLE IF NOT EXISTS dq_quest_progress (
    uuid           TEXT    NOT NULL,
    quest_id       TEXT    NOT NULL,
    period_type    TEXT    NOT NULL,
    period_key     TEXT    NOT NULL,
    revision       INTEGER NOT NULL DEFAULT 1,
    progress       INTEGER NOT NULL DEFAULT 0,
    completed      INTEGER NOT NULL DEFAULT 0,
    claimed        INTEGER NOT NULL DEFAULT 0,
    updated_at     TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (uuid, quest_id, period_type, period_key)
);

CREATE INDEX IF NOT EXISTS idx_dq_quest_period ON dq_quest_progress (period_type, period_key);

CREATE TABLE IF NOT EXISTS dq_checkin (
    uuid            TEXT    NOT NULL,
    last_checkin    TEXT    NOT NULL,
    streak          INTEGER NOT NULL DEFAULT 0,
    total_checkins  INTEGER NOT NULL DEFAULT 0,
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (uuid)
);

-- Idempotent clear-all (and future period) bonus claims.
CREATE TABLE IF NOT EXISTS dq_period_bonus (
    uuid           TEXT    NOT NULL,
    period_type    TEXT    NOT NULL,
    period_key     TEXT    NOT NULL,
    bonus_id       TEXT    NOT NULL,
    claimed_at     TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (uuid, period_type, period_key, bonus_id)
);
