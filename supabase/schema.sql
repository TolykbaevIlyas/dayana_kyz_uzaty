-- ================================================
-- Қыз Ұзату — Даяна · База данных
-- Выполнить в Supabase SQL Editor
-- ================================================

-- 1. Таблица ответов RSVP
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Гость
  full_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  language TEXT DEFAULT 'ru' CHECK (language IN ('ru', 'kz')),
  
  -- Сопровождающие
  guest_count INTEGER DEFAULT 0 CHECK (guest_count >= 0 AND guest_count <= 10),
  companions TEXT[] DEFAULT '{}',
  
  -- Дополнительно
  comment TEXT,
  
  -- Уведомления
  notification_sent BOOLEAN DEFAULT FALSE,
  reminder_sent BOOLEAN DEFAULT FALSE,
  
  -- Метаданные
  ip_address TEXT,
  user_agent TEXT
);

-- 2. Индексы
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp_responses(attending);
CREATE INDEX IF NOT EXISTS idx_rsvp_created ON rsvp_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_name ON rsvp_responses(full_name);

-- 3. Представление статистики
CREATE OR REPLACE VIEW rsvp_stats AS
SELECT 
  COUNT(*) FILTER (WHERE attending = true) AS will_attend,
  COUNT(*) FILTER (WHERE attending = false) AS will_not_attend,
  COALESCE(SUM(guest_count) FILTER (WHERE attending = true), 0) AS total_companions,
  COALESCE(SUM(guest_count + 1) FILTER (WHERE attending = true), 0) AS total_people,
  COUNT(*) AS total_responses,
  COUNT(*) FILTER (WHERE language = 'ru') AS ru_responses,
  COUNT(*) FILTER (WHERE language = 'kz') AS kz_responses
FROM rsvp_responses;

-- 4. Row Level Security
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Любой может добавить запись (гости отправляют форму)
CREATE POLICY "public_insert" ON rsvp_responses
  FOR INSERT TO anon
  WITH CHECK (true);

-- Читать могут только через service_role (бэкенд)
CREATE POLICY "service_read" ON rsvp_responses
  FOR SELECT TO service_role
  USING (true);

-- Обновлять только через service_role (пометить уведомления)
CREATE POLICY "service_update" ON rsvp_responses
  FOR UPDATE TO service_role
  USING (true);

-- 5. Функция получения сводки
CREATE OR REPLACE FUNCTION get_rsvp_summary()
RETURNS TABLE (
  will_attend BIGINT,
  will_not_attend BIGINT,
  total_people BIGINT,
  total_responses BIGINT
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    COUNT(*) FILTER (WHERE attending = true),
    COUNT(*) FILTER (WHERE attending = false),
    COALESCE(SUM(guest_count + 1) FILTER (WHERE attending = true), 0),
    COUNT(*)
  FROM rsvp_responses;
$$;

-- ================================================
-- Проверка: просмотр статистики
-- ================================================
-- SELECT * FROM rsvp_stats;

-- Просмотр всех гостей
-- SELECT full_name, attending, guest_count, companions, comment, created_at
-- FROM rsvp_responses
-- ORDER BY created_at DESC;
