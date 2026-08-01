-- Docs: DailyQuest MySQL schema. Applied when storage.type=mysql (idempotent CREATE IF NOT EXISTS).
-- Period keys: daily/checkin use yyyy-MM-dd; weekly uses yyyy-'W'ww in reset-timezone.

CREATE TABLE IF NOT EXISTS dq_quest_progress (
    uuid           CHAR(36)     NOT NULL,
    quest_id       VARCHAR(64)  NOT NULL,
    period_type    VARCHAR(16)  NOT NULL,
    period_key     VARCHAR(16)  NOT NULL,
    revision       INT          NOT NULL DEFAULT 1,
    progress       INT          NOT NULL DEFAULT 0,
    completed      TINYINT(1)   NOT NULL DEFAULT 0,
    claimed        TINYINT(1)   NOT NULL DEFAULT 0,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid, quest_id, period_type, period_key),
    INDEX idx_dq_quest_period (period_type, period_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS dq_checkin (
    uuid            CHAR(36)    NOT NULL,
    last_checkin    DATE        NOT NULL,
    streak          INT         NOT NULL DEFAULT 0,
    total_checkins  INT         NOT NULL DEFAULT 0,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Idempotent clear-all (and future period) bonus claims.
CREATE TABLE IF NOT EXISTS dq_period_bonus (
    uuid           CHAR(36)     NOT NULL,
    period_type    VARCHAR(16)  NOT NULL,
    period_key     VARCHAR(16)  NOT NULL,
    bonus_id       VARCHAR(64)  NOT NULL,
    claimed_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid, period_type, period_key, bonus_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Per-player daily quest assignment (rank-frozen + random pool).
CREATE TABLE IF NOT EXISTS dq_quest_assignment (
    uuid           CHAR(36)     NOT NULL,
    period_type    VARCHAR(16)  NOT NULL,
    period_key     VARCHAR(16)  NOT NULL,
    rank_id        INT          NOT NULL,
    quest_ids      TEXT         NOT NULL,
    reroll_count   INT          NOT NULL DEFAULT 0,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid, period_type, period_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
