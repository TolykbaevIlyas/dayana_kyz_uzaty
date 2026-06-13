# Инструкция по деплою, базе данных и Telegram-боту

Эта инструкция подходит для текущего Next.js-приложения. Сайт принимает RSVP-ответы, сохраняет их в Supabase и отправляет уведомления в Telegram-бота.

## 1. Что лучше выбрать для деплоя

### Бесплатный вариант

Рекомендую начать с **Vercel + Supabase Free + Telegram Bot API**.

- **Vercel Free**: хорошо подходит для Next.js, автоматически понимает проект, умеет API routes и serverless-функции.
- **Supabase Free**: бесплатная PostgreSQL-база, для RSVP-списка гостей хватит с большим запасом.
- **Telegram Bot API**: бесплатно.

Для приглашения на мероприятие этого обычно достаточно. Гости открывают ссылку, отправляют форму, данные сохраняются, а вам приходит уведомление в Telegram.

### Стабильные платные варианты

Если хочется больше надежности и меньше ограничений:

- **Vercel Pro**: самый простой платный вариант для этого проекта. Хорошая стабильность, удобные логи, домены, переменные окружения.
- **Supabase Pro**: платная база, если гостей много, нужны бэкапы и больше ресурсов.
- **Railway** или **Render**: тоже можно задеплоить Next.js, но для новичка Vercel обычно проще.

Мой практичный совет: начните с бесплатного Vercel + Supabase. Если все работает и сайт нужен только для рассылки гостям, платный тариф может вообще не понадобиться.

## 2. Подготовка Supabase

1. Зайдите на [supabase.com](https://supabase.com).
2. Создайте аккаунт или войдите.
3. Нажмите **New project**.
4. Укажите название проекта, например `dayana-qyz-uzatu`.
5. Придумайте пароль базы и сохраните его.
6. Выберите ближайший регион.
7. Дождитесь создания проекта.

После создания:

1. Откройте проект Supabase.
2. Перейдите в **SQL Editor**.
3. Откройте файл проекта `supabase/schema.sql`.
4. Скопируйте весь SQL-код из файла.
5. Вставьте его в Supabase SQL Editor.
6. Нажмите **Run**.

После этого появится таблица `rsvp_responses`. В нее будут сохраняться регистрации гостей.

## 3. Где взять Supabase-ключи

В Supabase откройте:

**Project Settings -> API**

Нужны три значения:

- **Project URL** -> это `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** -> это `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role secret** -> это `SUPABASE_SERVICE_ROLE_KEY`

Важно: `SUPABASE_SERVICE_ROLE_KEY` нельзя показывать гостям и нельзя вставлять в клиентский код. В этом проекте он используется только на сервере.

## 4. Создание Telegram-бота

1. Откройте Telegram.
2. Найдите бота **@BotFather**.
3. Отправьте команду:

```text
/newbot
```

4. Введите название бота, например:

```text
Dayana RSVP Bot
```

5. Введите username бота. Он должен заканчиваться на `bot`, например:

```text
dayana_rsvp_bot
```

6. BotFather выдаст токен вида:

```text
1234567890:AA....
```

Это значение нужно сохранить как `TELEGRAM_BOT_TOKEN`.

## 5. Как узнать TELEGRAM_CHAT_ID

`TELEGRAM_CHAT_ID` - это id чата, куда бот будет отправлять уведомления.

Самый простой способ:

1. Напишите любое сообщение своему новому боту в Telegram, например `/start`.
2. В браузере откройте ссылку:

```text
https://api.telegram.org/botTELEGRAM_BOT_TOKEN/getUpdates
```

Замените `TELEGRAM_BOT_TOKEN` на настоящий токен бота.

3. В ответе найдите примерно такой кусок:

```json
"chat":{"id":123456789}
```

Число `123456789` - это ваш `TELEGRAM_CHAT_ID`.

Если уведомления должны приходить нескольким людям, можно указать несколько chat id через запятую:

```env
TELEGRAM_CHAT_ID=123456789,987654321
```

Перед этим каждый человек должен хотя бы один раз написать вашему боту.

## 6. Переменные окружения

В проекте есть файл `.env.local.example`. Для локального запуска создайте рядом файл `.env.local` и заполните:

```env
NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=ваш_supabase_service_role_key
TELEGRAM_BOT_TOKEN=токен_бота_от_BotFather
TELEGRAM_CHAT_ID=ваш_chat_id
TELEGRAM_WEBHOOK_SECRET=любая_длинная_секретная_строка
```

Для `TELEGRAM_WEBHOOK_SECRET` можно придумать любую сложную строку, например:

```text
dayana-rsvp-secret-2026-very-long
```

Она нужна, чтобы Telegram webhook принимал запросы только с правильным секретом.

## 7. Локальная проверка

Установить зависимости, если они еще не установлены:

```bash
npm install
```

Запустить сайт:

```bash
npm run dev
```

На Windows, если PowerShell ругается на `npm.ps1`, используйте:

```bash
npm.cmd run dev
```

Откройте:

```text
http://localhost:3000
```

Проверьте форму RSVP. Если Supabase-ключи заполнены, запись должна появиться в таблице `rsvp_responses`.

## 8. Деплой на Vercel

### Вариант через GitHub

1. Создайте аккаунт на [github.com](https://github.com), если его нет.
2. Создайте новый репозиторий.
3. Загрузите туда проект.
4. Зайдите на [vercel.com](https://vercel.com).
5. Нажмите **Add New -> Project**.
6. Выберите ваш GitHub-репозиторий.
7. Vercel сам определит Next.js.
8. В разделе **Environment Variables** добавьте:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
TELEGRAM_WEBHOOK_SECRET
```

9. Нажмите **Deploy**.

После деплоя Vercel даст ссылку вида:

```text
https://your-project.vercel.app
```

Эту ссылку уже можно отправлять гостям после проверки.

## 9. Подключение Telegram webhook после деплоя

После деплоя нужно сказать Telegram, куда отправлять команды бота.

Откройте в браузере ссылку:

```text
https://api.telegram.org/botTELEGRAM_BOT_TOKEN/setWebhook?url=https://YOUR_DOMAIN/api/telegram/webhook&secret_token=TELEGRAM_WEBHOOK_SECRET
```

Замените:

- `TELEGRAM_BOT_TOKEN` на токен бота.
- `YOUR_DOMAIN` на домен сайта, например `dayana-qyz-uzatu.vercel.app`.
- `TELEGRAM_WEBHOOK_SECRET` на секрет из переменных окружения.

Пример:

```text
https://api.telegram.org/bot1234567890:AAxxxx/setWebhook?url=https://dayana-qyz-uzatu.vercel.app/api/telegram/webhook&secret_token=dayana-rsvp-secret-2026-very-long
```

Если все хорошо, Telegram вернет:

```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

## 10. Команды Telegram-бота

Бот понимает команды:

```text
/summary
```

Показывает сводку:

- сколько всего ответов;
- сколько гостей придет;
- сколько не придет;
- сколько сопровождающих;
- сколько всего людей ожидается.

```text
/list
```

Показывает список последних регистраций.

```text
/export
```

Присылает CSV-файл со всеми регистрациями. Его можно открыть в Excel или Google Sheets.

Также под каждым новым уведомлением есть кнопки:

- **Сводка**
- **Список**
- **CSV выгрузка**

## 11. Как проверить все после деплоя

1. Откройте сайт по ссылке Vercel.
2. Заполните RSVP-форму тестовым именем.
3. Проверьте Supabase:
   - Table Editor;
   - таблица `rsvp_responses`;
   - должна появиться новая строка.
4. Проверьте Telegram:
   - должно прийти уведомление о новой регистрации.
5. В Telegram отправьте боту:

```text
/summary
```

6. Потом:

```text
/export
```

Если пришел CSV-файл, все настроено правильно.

## 12. Частые проблемы

### Форма отправляется, но в Telegram ничего не приходит

Проверьте:

- `TELEGRAM_BOT_TOKEN` указан правильно;
- `TELEGRAM_CHAT_ID` указан правильно;
- вы написали боту хотя бы одно сообщение до проверки;
- переменные окружения добавлены именно в Vercel;
- после изменения переменных окружения вы сделали redeploy.

### Команды бота не работают

Проверьте webhook:

```text
https://api.telegram.org/botTELEGRAM_BOT_TOKEN/getWebhookInfo
```

Если там неправильный URL, заново выполните `setWebhook`.

### В Supabase нет записей

Проверьте:

- выполнен ли `supabase/schema.sql`;
- правильно ли указан `NEXT_PUBLIC_SUPABASE_URL`;
- правильно ли указан `SUPABASE_SERVICE_ROLE_KEY`;
- нет ли ошибок в логах Vercel.

### На Vercel после изменения переменных ничего не поменялось

После изменения Environment Variables нужно сделать новый деплой:

**Vercel -> Project -> Deployments -> Redeploy**

## 13. Что отправлять гостям

После проверки можно отправлять гостям обычную ссылку:

```text
https://YOUR_DOMAIN
```

Если купите красивый домен, например `dayana-toy.kz` или похожий, его можно подключить в Vercel в разделе **Domains**.
