PRAGMA foreign_keys = ON;

INSERT
OR IGNORE INTO subscriptions (type, price)
VALUES
   ('Безкоштовна', 0),
   ('Базова', 99),
   ('Преміум', 199);

DELETE FROM users;

INSERT INTO
   users (
      user_id,
      first_name,
      last_name,
      email,
      password_hash,
      created_at,
      subscription_id
   )
VALUES
   (
      1,
      'Іван',
      'Петренко',
      'ivan.petrenko@mail.com',
      '$2b$10$placeholder',
      '2023-01-15 00:00:00',
      1
   ),
   (
      2,
      'Олена',
      'Сидоренко',
      'olena.sid@mail.com',
      '$2b$10$placeholder',
      '2023-02-10 00:00:00',
      2
   ),
   (
      3,
      'Андрій',
      'Шевченко',
      'andriy.shev@gmail.com',
      '$2b$10$placeholder',
      '2023-03-25 00:00:00',
      1
   ),
   (
      4,
      'Сергій',
      'Кравченко',
      'sergey.kr@mail.com',
      '$2b$10$placeholder',
      '2024-04-18 00:00:00',
      2
   ),
   (
      5,
      'Ольга',
      'Черненко',
      'olga.chern@mail.com',
      '$2b$10$placeholder',
      '2024-03-12 00:00:00',
      3
   ),
   (
      6,
      'Микола',
      'Білик',
      'm.bilyk@gmail.com',
      '$2b$10$placeholder',
      '2024-02-20 00:00:00',
      1
   ),
   (
      7,
      'Катерина',
      'Іванова',
      'katya.ivanova@mail.com',
      '$2b$10$placeholder',
      '2023-05-17 00:00:00',
      3
   ),
   (
      8,
      'Дмитро',
      'Коваленко',
      'd.kovalenko@gmail.com',
      '$2b$10$placeholder',
      '2023-06-01 00:00:00',
      2
   ),
   (
      9,
      'Марина',
      'Ткаченко',
      'marina.tkachenko@mail.com',
      '$2b$10$placeholder',
      '2023-07-15 00:00:00',
      1
   ),
   (
      10,
      'Вікторія',
      'Зайцева',
      'v.zaitseva@mail.com',
      '$2b$10$placeholder',
      '2024-01-14 00:00:00',
      2
   ),
   (
      11,
      'Олександр',
      'Савченко',
      'o.savchenko@mail.com',
      '$2b$10$placeholder',
      '2023-12-03 00:00:00',
      3
   ),
   (
      12,
      'Юлія',
      'Романенко',
      'julia.roman@gmail.com',
      '$2b$10$placeholder',
      '2023-11-05 00:00:00',
      1
   ),
   (
      13,
      'Артем',
      'Головко',
      'artem.gol@gmail.com',
      '$2b$10$placeholder',
      '2023-08-10 00:00:00',
      3
   ),
   (
      14,
      'Анна',
      'Литвиненко',
      'anna.litv@mail.com',
      '$2b$10$placeholder',
      '2023-09-22 00:00:00',
      2
   ),
   (
      15,
      'Богдан',
      'Чумак',
      'b.chumak@mail.com',
      '$2b$10$placeholder',
      '2023-10-10 00:00:00',
      3
   );

DELETE FROM transactions;

INSERT INTO
   transactions (
      user_id,
      subscription_id,
      started_at,
      expires_at,
      status
   )
VALUES
   (
      2,
      2,
      '2026-04-11 00:00:00',
      '2026-05-11 00:00:00',
      'active'
   ),
   (
      4,
      2,
      '2026-04-18 00:00:00',
      '2026-05-18 00:00:00',
      'active'
   ),
   (
      5,
      3,
      '2026-04-12 00:00:00',
      '2026-05-12 00:00:00',
      'active'
   ),
   (
      7,
      3,
      '2026-04-17 00:00:00',
      '2026-05-17 00:00:00',
      'active'
   ),
   (
      8,
      2,
      '2026-04-01 00:00:00',
      '2026-05-01 00:00:00',
      'active'
   ),
   (
      10,
      2,
      '2026-04-14 00:00:00',
      '2026-05-14 00:00:00',
      'active'
   ),
   (
      11,
      3,
      '2026-04-03 00:00:00',
      '2026-05-03 00:00:00',
      'active'
   ),
   (
      13,
      3,
      '2026-04-10 00:00:00',
      '2026-05-10 00:00:00',
      'active'
   ),
   (
      14,
      2,
      '2026-04-22 00:00:00',
      '2026-05-22 00:00:00',
      'active'
   ),
   (
      15,
      3,
      '2026-04-10 00:00:00',
      '2026-05-10 00:00:00',
      'active'
   ),
   (
      1,
      2,
      '2025-11-15 00:00:00',
      '2025-12-15 00:00:00',
      'expired'
   ),
   (
      3,
      1,
      '2025-10-25 00:00:00',
      '2025-11-25 00:00:00',
      'expired'
   ),
   (
      6,
      1,
      '2025-09-20 00:00:00',
      '2025-10-20 00:00:00',
      'expired'
   ),
   (
      9,
      2,
      '2025-08-15 00:00:00',
      '2025-09-15 00:00:00',
      'expired'
   ),
   (
      12,
      1,
      '2025-10-05 00:00:00',
      '2025-11-05 00:00:00',
      'expired'
   );

DELETE FROM content_genres;

DELETE FROM genres;

INSERT INTO
   genres (genre_id, name)
VALUES
   (1, 'Драма'),
   (2, 'Науково-фантастичний'),
   (3, 'Романтика'),
   (4, 'Трилер'),
   (5, 'Фантастика'),
   (6, 'Екшн'),
   (7, 'Комедія'),
   (8, 'Пригоди'),
   (9, 'Жахи'),
   (10, 'Біографічний'),
   (11, 'Історичний'),
   (12, 'Детектив');

DELETE FROM content_directors;

DELETE FROM directors;

INSERT INTO
   directors (director_id, full_name, biography)
VALUES
   (
      1,
      'Роберт Земекіс',
      'Американський режисер, відомий за фільм «Форрест Гамп».'
   ),
   (2, 'Сем Есмейл', 'Режисер серіалу «Пан Робот».'),
   (3, 'Тодд Філліпс', 'Режисер фільму «Джокера».'),
   (
      4,
      'Піт Доктер',
      'Режисер анімаційних фільмів Pixar.'
   ),
   (
      5,
      'Віктор Флемінг',
      'Класичний режисер Голлівуду, зняв «Віднесені вітром».'
   ),
   (
      6,
      'Джеймс Кемерон',
      'Режисер «Титаніка» та «Аватара».'
   ),
   (
      7,
      'Крістофер Нолан',
      'Відомий за «Інтерстеллар» та інші захоплюючі кінострічки.'
   ),
   (
      8,
      'Мішель Гондрі',
      'Режисер «Вічне сяйво чистого розуму».'
   ),
   (
      9,
      'Вінс Ґілліган',
      'Автор серіалів «Пуститися берега», «Краще подзвоніть Солу».'
   ),
   (
      10,
      'Френк Дарабонт',
      'Відомий за кінострічку «Втеча з Шоушенка».'
   ),
   (
      11,
      'Мартін Скорсезе',
      'Легендарний режисер «Острова проклятих».'
   ),
   (12, 'Ґері Росс', 'Автор фільму «Голодні ігри».'),
   (
      13,
      'Філ Лорд',
      'Американський режисер і сценарист, відомий фільмами «Мачо і ботан» та «Лего. Фільм».'
   ),
   (
      14,
      'Кріс Міллер',
      'Американський режисер, співтворець «Мачо і ботан» та «Лего. Фільм».'
   ),
   (
      15,
      'Джон Роберт Леонетті',
      'Американський режисер і оператор, відомий фільмом «Прокляття Аннабель».'
   ),
   (
      16,
      'Джон Фавро',
      'Американський режисер і актор, творець «Залізної людини».'
   ),
   (
      17,
      'Майкл Бей',
      'Американський режисер, відомий блокбастером «Трансформери».'
   ),
   (
      18,
      'Меттью Вон',
      'Британський режисер, творець «Люди Ікс: Перший клас» та «Kingsman».'
   ),
   (
      19,
      'Скотт Дерріксон',
      'Американський режисер, відомий фільмом «Доктор Стрендж» та хорорами.'
   ),
   (
      20,
      'Стівен Спілберг',
      'Культовий режисер, автор «Парк Юрського періоду» та «Список Шиндлера».'
   ),
   (
      21,
      'Лана Вачовскі',
      'Американська режисерка, співавторка «Матриці».'
   ),
   (
      22,
      'Ліллі Вачовскі',
      'Американська режисерка, співавторка «Матриці».'
   ),
   (
      23,
      'Квентін Тарантіно',
      'Американський режисер, сценарист, відомий нестандартними діалогами та стилістикою.'
   ),
   (
      24,
      'Пітер Джексон',
      'Новозеландський режисер, відомий трилогією «Володар перснів».'
   ),
   (
      25,
      'Девід Фінчер',
      'Американський режисер, майстер психологічних трилерів.'
   );

DELETE FROM content_actors;

DELETE FROM actors;

INSERT INTO
   actors (actor_id, full_name, biography)
VALUES
   (
      1,
      'Рамі Малек',
      'Виконавець головної ролі у «Пан Робот».'
   ),
   (2, 'Кейт Вінслет', 'Актриса «Титаніка».'),
   (3, 'Еллен Пейдж', 'Канадська актриса і режисер.'),
   (
      4,
      'Леонардо Ді Капріо',
      'Відомий за «Острів проклятих» та безліч інших ролей.'
   ),
   (
      5,
      'Брайан Кренстон',
      'Відомий за роль Волтера Вайта у серіалі «Пуститися берега».'
   ),
   (6, 'Гоакін Фенікс', 'Виконавець ролі Джокера.'),
   (
      7,
      'Том Генкс',
      'Зіграв головну роль у «Форрест Гамп».'
   ),
   (8, 'Вів''єн Лі', 'Зірка «Віднесених вітром».'),
   (
      9,
      'Меттью Макконахі',
      'Грав головного героя фільму «Інтерстеллар».'
   ),
   (10, 'Дженніфер Лоуренс', 'Зірка «Голодних ігор».'),
   (11, 'Тім Роббінс', 'Актор «Втечі з Шоушенка».'),
   (
      12,
      'Боб Оденкірк',
      'Відігравав головну роль у «Краще подзвоніть Солу».'
   ),
   (
      13,
      'Аннабель Волліс',
      'Британська актриса, зірка фільму «Прокляття Аннабель».'
   ),
   (
      14,
      'Роберт Дауні (молодший)',
      'Американський актор, відомий роллю Тоні Старка у кіновсесвіті Marvel.'
   ),
   (
      15,
      'Шая Лабаф',
      'Американський актор, популярний завдяки франшизі «Трансформери».'
   ),
   (
      16,
      'Майкл Фассбендер',
      'Ірландський актор, зірка франшизи «Люди Ікс».'
   ),
   (
      17,
      'Бенедикт Камбербетч',
      'Британський актор, відомий ролями у «Шерлок» та «Доктор Стрендж».'
   ),
   (
      18,
      'Джефф Голдблюм',
      'Американський актор, зірка «Парк Юрського періоду».'
   ),
   (
      19,
      'Кіану Рівз',
      'Канадський актор, найвідоміший за «Матрицю» та «Джон Вік».'
   ),
   (
      20,
      'Зої Салдана',
      'Американська актриса, зірка «Аватара» та «Вартових Галактики».'
   ),
   (
      21,
      'Кіліан Мерфі',
      'Ірландський актор, відомий роллю Томмі Шелбі у серіалі «Peaky Blinders».'
   ),
   (
      22,
      'Бред Пітт',
      'Американський актор і продюсер.'
   ),
   (
      23,
      'Метт Деймон',
      'Американський актор і сценарист.'
   ),
   (
      24,
      'Скарлетт Йоганссон',
      'Американська актриса, одна з найвищооплачуваніших у світі.'
   ),
   (
      25,
      'Крістіан Бейл',
      'Британський актор, відомий радикальними фізичними трансформаціями.'
   ),
   (
      26,
      'Том Харді',
      'Британський актор, відомий різноплановими ролями.'
   );

DELETE FROM episodes;

DELETE FROM seasons;

DELETE FROM series;

DELETE FROM films;

DELETE FROM content;

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      1,
      'film',
      'Форрест Гамп',
      1994,
      'Дивовижна одіссея простодушного, але добросердечного чоловіка крізь ключові події американської історії.',
      8.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159969/forrest_gump_ekak6t.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      1,
      142,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780273067/forrest_gump_trailer_kasatg.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      2,
      'film',
      'Титанік',
      1997,
      'Епічна романтична драма про трагічне кохання на борту легендарного лайнера.',
      7.9,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159978/titanic_i5noja.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      2,
      194,
      'https://res.cloudinary.com/demo/video/upload/titanic_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      3,
      'film',
      'Початок',
      2010,
      'Крадій, який краде корпоративні секрети через технологію спільних сновидінь, отримує завдання вкласти ідею у розум генерального директора.',
      8.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159971/inception_rqffkc.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      3,
      148,
      'https://res.cloudinary.com/demo/video/upload/inception_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      4,
      'film',
      'Інтерстеллар',
      2014,
      'Команда астронавтів вирушає крізь червоточину в пошуках нового дому для людства.',
      8.6,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159971/interstellar_wif2ss.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      4,
      169,
      'https://res.cloudinary.com/demo/video/upload/interstellar_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      5,
      'film',
      'Джокер',
      2019,
      'Провальний комік стає жертвою суспільства байдужості й поступово перетворюється на символ хаосу - Джокера.',
      8.5,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159972/joker_weu6rj.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      5,
      122,
      'https://res.cloudinary.com/demo/video/upload/joker_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      6,
      'film',
      'Втеча з Шоушенка',
      1994,
      'Банкір, несправедливо засуджений за вбивство, знаходить порятунок у дружбі та надії у в''язниці суворого режиму.',
      9.3,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159976/shawshank_nfy3tv.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      6,
      142,
      'https://res.cloudinary.com/demo/video/upload/shawshank_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      7,
      'film',
      'Голодні ігри',
      2012,
      'У постапокаліптичному суспільстві молода дівчина бореться за виживання у жорстоких телевізійних іграх.',
      7.2,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159969/hunger_games_jsd4tk.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      7,
      142,
      'https://res.cloudinary.com/demo/video/upload/hunger_games_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      8,
      'film',
      'Залізна людина',
      2008,
      'Мільярдер-зброярник створює бойовий костюм і стає супергероєм Залізна Людина.',
      7.9,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159971/iron_man_xb2hfd.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      8,
      126,
      'https://res.cloudinary.com/demo/video/upload/iron_man_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      9,
      'film',
      'Матриця',
      1999,
      'Хакер дізнається, що реальність є комп''ютерною симуляцією, і приєднується до повстання проти машин.',
      8.7,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159974/matrix_edw16b.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      9,
      136,
      'https://res.cloudinary.com/demo/video/upload/matrix_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      10,
      'film',
      'Острів проклятих',
      2010,
      'Двоє федеральних маршалів розслідують зникнення пацієнтки з ізольованої психіатричної лікарні.',
      8.1,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159977/shutter_island_otk7ej.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      10,
      138,
      'https://res.cloudinary.com/demo/video/upload/shutter_island_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      11,
      'film',
      'Парк Юрського періоду',
      1993,
      'Вчені клонують динозаврів для тематичного парку, але хаос неминучий, коли тварини виходять з-під контролю.',
      8.2,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159973/jurassic_park_bmud9l.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      11,
      127,
      'https://res.cloudinary.com/demo/video/upload/jurassic_park_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      12,
      'film',
      'Вічне сяйво чистого розуму',
      2004,
      'Пара після болісного розставання вирішує видалити спогади одне про одного, проте почуття виявляються сильнішими за технології.',
      8.3,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159968/eternal_sunshine_borhe6.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      12,
      108,
      'https://res.cloudinary.com/demo/video/upload/eternal_sunshine_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      13,
      'film',
      'Лего. Фільм',
      2014,
      'Звичайний Лего-персонаж опиняється в центрі пригоди, покликаної врятувати увесь Лего-всесвіт.',
      7.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159974/lego_movie_l4thxr.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      13,
      100,
      'https://res.cloudinary.com/demo/video/upload/lego_movie_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      14,
      'film',
      'Доктор Стрендж',
      2016,
      'Блискучий хірург після аварії відкриває світ містичних мистецтв і стає верховним магом.',
      7.5,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159968/doctor_strange_hmjvyv.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      14,
      115,
      'https://res.cloudinary.com/demo/video/upload/doctor_strange_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      15,
      'film',
      'Трансформери',
      2007,
      'Підліток несподівано опиняється між двома ворогуючими расами роботів-прибульців у битві за долю Землі.',
      7.0,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159979/transformers_prtr7n.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      15,
      144,
      'https://res.cloudinary.com/demo/video/upload/transformers_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      16,
      'film',
      'Прокляття Аннабель',
      2014,
      'Моторошна лялька стає каналом для злого духа, що тероризує молоду сім''ю.',
      6.5,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159967/annabelle_fkonke.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      16,
      99,
      'https://res.cloudinary.com/demo/video/upload/annabelle_trailer.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      17,
      'series',
      'Пан Робот',
      2015,
      'Параноїдальний хакер вступає до підпільної групи, яка планує знищити найбільшу корпорацію у світі.',
      8.7,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780160992/mr_robot_drprgf.jpg'
   );

INSERT INTO
   series (series_id)
VALUES
   (17);

INSERT INTO
   seasons (series_id, season_number, title)
VALUES
   (17, 1, 'Сезон 1'),
   (17, 2, 'Сезон 2'),
   (17, 3, 'Сезон 3'),
   (17, 4, 'Сезон 4');

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      1,
      1,
      'eps1.0_hellofriend.mov',
      62,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229439/mrrobot_s1e1_hrywqe.mp4'
   ),
   (
      1,
      2,
      'eps1.1_ones-and-zer0es.mpeg',
      48,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229437/mrrobot_s1e2_bzvsda.mp4'
   ),
   (
      1,
      3,
      'eps1.2_d3bug.mkv',
      46,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229451/mrrobot_s1e3_uyqajc.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      2,
      1,
      'eps2.0_unm4sk-pt1.tc',
      41,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229428/mrrobot_s2e1_ldgwgq.mp4'
   ),
   (
      2,
      2,
      'eps2.0_unm4sk-pt2.tc',
      42,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229431/mrrobot_s2e2_tesoez.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      3,
      1,
      'eps3.0_power-saver-mode.h',
      53,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229438/mrrobot_s3e1_yo4vh0.mp4'
   ),
   (
      3,
      2,
      'eps3.1_undo.gz',
      47,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229449/mrrobot_s3e2_zjrfz0.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      4,
      1,
      '401 Unauthorized',
      61,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229432/mrrobot_s4e1_kxrh8y.mp4'
   ),
   (
      4,
      2,
      '402 Payment Required',
      48,
      'https://res.cloudinary.com/ddlxntp79/video/upload/v1780229430/mrrobot_s4e2_ewcpyi.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      18,
      'series',
      'Пуститися берега',
      2008,
      'Учитель хімії, дізнавшись про невиліковну хворобу, починає виготовляти метамфетамін разом із колишнім учнем.',
      9.5,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780160992/breaking_bad_xvin3l.jpg'
   );

INSERT INTO
   series (series_id)
VALUES
   (18);

INSERT INTO
   seasons (series_id, season_number, title)
VALUES
   (18, 1, 'Сезон 1'),
   (18, 2, 'Сезон 2'),
   (18, 3, 'Сезон 3'),
   (18, 4, 'Сезон 4'),
   (18, 5, 'Сезон 5');

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      5,
      1,
      'Пілот',
      58,
      'https://res.cloudinary.com/demo/video/upload/bb_s1e1.mp4'
   ),
   (
      5,
      2,
      'Кіт у мішку...',
      48,
      'https://res.cloudinary.com/demo/video/upload/bb_s1e2.mp4'
   ),
   (
      5,
      3,
      '...А мішок у річці',
      48,
      'https://res.cloudinary.com/demo/video/upload/bb_s1e3.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      6,
      1,
      'Сімсот тридцять сім',
      47,
      'https://res.cloudinary.com/demo/video/upload/bb_s2e1.mp4'
   ),
   (
      6,
      2,
      'Смажений',
      48,
      'https://res.cloudinary.com/demo/video/upload/bb_s2e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      7,
      1,
      'No Más',
      47,
      'https://res.cloudinary.com/demo/video/upload/bb_s3e1.mp4'
   ),
   (
      7,
      2,
      'Caballo sin Nombre',
      48,
      'https://res.cloudinary.com/demo/video/upload/bb_s3e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      8,
      1,
      'Різак для коробок',
      47,
      'https://res.cloudinary.com/demo/video/upload/bb_s4e1.mp4'
   ),
   (
      8,
      2,
      'Тридцять вісім кирпатих',
      46,
      'https://res.cloudinary.com/demo/video/upload/bb_s4e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      9,
      1,
      'Живи вільно або помри',
      43,
      'https://res.cloudinary.com/demo/video/upload/bb_s5e1.mp4'
   ),
   (
      9,
      2,
      'Мадригал',
      46,
      'https://res.cloudinary.com/demo/video/upload/bb_s5e2.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      19,
      'series',
      'Краще подзвоніть Солу',
      2015,
      'Передісторія «Пуститися берега»: як невдаха-адвокат Джиммі Макгілл перетворюється на аферистського Солу Ґудмена.',
      8.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780160991/better_call_saul_dptzuq.jpg'
   );

INSERT INTO
   series (series_id)
VALUES
   (19);

INSERT INTO
   seasons (series_id, season_number, title)
VALUES
   (19, 1, 'Сезон 1'),
   (19, 2, 'Сезон 2'),
   (19, 3, 'Сезон 3'),
   (19, 4, 'Сезон 4'),
   (19, 5, 'Сезон 5'),
   (19, 6, 'Сезон 6');

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      10,
      1,
      'Уно',
      53,
      'https://res.cloudinary.com/demo/video/upload/bcs_s1e1.mp4'
   ),
   (
      10,
      2,
      'Мійо',
      46,
      'https://res.cloudinary.com/demo/video/upload/bcs_s1e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      11,
      1,
      'Перемикач',
      46,
      'https://res.cloudinary.com/demo/video/upload/bcs_s2e1.mp4'
   ),
   (
      11,
      2,
      'Латач',
      47,
      'https://res.cloudinary.com/demo/video/upload/bcs_s2e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      12,
      1,
      'Мейбл',
      51,
      'https://res.cloudinary.com/demo/video/upload/bcs_s3e1.mp4'
   ),
   (
      12,
      2,
      'Свідок',
      51,
      'https://res.cloudinary.com/demo/video/upload/bcs_s3e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      13,
      1,
      'Дим',
      49,
      'https://res.cloudinary.com/demo/video/upload/bcs_s4e1.mp4'
   ),
   (
      13,
      2,
      'Дихати',
      45,
      'https://res.cloudinary.com/demo/video/upload/bcs_s4e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      14,
      1,
      'Чарівник',
      54,
      'https://res.cloudinary.com/demo/video/upload/bcs_s5e1.mp4'
   ),
   (
      14,
      2,
      'Знижка 50%',
      46,
      'https://res.cloudinary.com/demo/video/upload/bcs_s5e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      15,
      1,
      'Вино та Троянди',
      60,
      'https://res.cloudinary.com/demo/video/upload/bcs_s6e1.mp4'
   ),
   (
      15,
      2,
      'Батіг і Пряник',
      61,
      'https://res.cloudinary.com/demo/video/upload/bcs_s6e2.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      20,
      'series',
      'Гострі картузи',
      2013,
      'Кримінальна сага про гангстерську родину Шелбі у Бірмінгемі після Першої світової війни.',
      8.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780160993/peaky_blinders_pogylc.jpg'
   );

INSERT INTO
   series (series_id)
VALUES
   (20);

INSERT INTO
   seasons (series_id, season_number, title)
VALUES
   (20, 1, 'Сезон 1'),
   (20, 2, 'Сезон 2'),
   (20, 3, 'Сезон 3'),
   (20, 4, 'Сезон 4'),
   (20, 5, 'Сезон 5'),
   (20, 6, 'Сезон 6');

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      16,
      1,
      'Епізод #1.1',
      58,
      'https://res.cloudinary.com/demo/video/upload/pb_s1e1.mp4'
   ),
   (
      16,
      2,
      'Епізод #1.2',
      58,
      'https://res.cloudinary.com/demo/video/upload/pb_s1e2.mp4'
   ),
   (
      16,
      3,
      'Епізод #1.3',
      56,
      'https://res.cloudinary.com/demo/video/upload/pb_s1e3.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      17,
      1,
      'Епізод #2.1',
      59,
      'https://res.cloudinary.com/demo/video/upload/pb_s2e1.mp4'
   ),
   (
      17,
      2,
      'Епізод #2.2',
      58,
      'https://res.cloudinary.com/demo/video/upload/pb_s2e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      18,
      1,
      'Епізод #3.1',
      56,
      'https://res.cloudinary.com/demo/video/upload/pb_s3e1.mp4'
   ),
   (
      18,
      2,
      'Епізод #3.2',
      57,
      'https://res.cloudinary.com/demo/video/upload/pb_s3e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      19,
      1,
      'Петля',
      60,
      'https://res.cloudinary.com/demo/video/upload/pb_s4e1.mp4'
   ),
   (
      19,
      2,
      'Язичники',
      57,
      'https://res.cloudinary.com/demo/video/upload/pb_s4e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      20,
      1,
      'Чорний вівторок',
      56,
      'https://res.cloudinary.com/demo/video/upload/pb_s5e1.mp4'
   ),
   (
      20,
      2,
      'Чорні коти',
      58,
      'https://res.cloudinary.com/demo/video/upload/pb_s5e2.mp4'
   );

INSERT INTO
   episodes (
      season_id,
      episode_number,
      title,
      duration,
      video_url
   )
VALUES
   (
      21,
      1,
      'Чорний день',
      58,
      'https://res.cloudinary.com/demo/video/upload/pb_s6e1.mp4'
   ),
   (
      21,
      2,
      'Чорна сорочка',
      59,
      'https://res.cloudinary.com/demo/video/upload/pb_s6e2.mp4'
   );

INSERT INTO
   content (
      content_id,
      content_type,
      title,
      release_year,
      description,
      rating,
      poster_url
   )
VALUES
   (
      21,
      'film',
      'Люди Ікс: Перший клас',
      2011,
      'Передісторія всесвіту Людей Ікс: молоді Чарльз Ксав''єр і Магнето об''єднуються проти спільного ворога.',
      7.8,
      'https://res.cloudinary.com/ddlxntp79/image/upload/v1780159979/xmen_first_class_nrawzm.jpg'
   );

INSERT INTO
   films (film_id, duration, video_url)
VALUES
   (
      21,
      131,
      'https://res.cloudinary.com/demo/video/upload/xmen_first_class_trailer.mp4'
   );

INSERT INTO
   content_genres (content_id, genre_id)
VALUES
   (1, 1),
   (2, 1),
   (2, 3),
   (3, 2),
   (3, 4),
   (4, 2),
   (4, 1),
   (5, 1),
   (5, 4),
   (6, 1),
   (7, 8),
   (7, 6),
   (7, 5),
   (8, 6),
   (8, 5),
   (9, 2),
   (9, 6),
   (10, 4),
   (10, 12),
   (11, 8),
   (11, 5),
   (12, 3),
   (12, 1),
   (13, 7),
   (13, 8),
   (14, 6),
   (14, 5),
   (15, 6),
   (15, 5),
   (16, 9),
   (17, 4),
   (17, 12),
   (18, 1),
   (18, 4),
   (19, 1),
   (19, 12),
   (20, 1),
   (20, 12),
   (21, 6),
   (21, 5);

INSERT INTO
   content_directors (content_id, director_id)
VALUES
   (1, 1),
   (2, 6),
   (3, 7),
   (4, 7),
   (5, 3),
   (6, 10),
   (7, 12),
   (8, 16),
   (9, 21),
   (9, 22),
   (10, 11),
   (11, 20),
   (12, 8),
   (13, 13),
   (13, 14),
   (14, 19),
   (15, 17),
   (16, 15),
   (17, 2),
   (18, 9),
   (19, 9),
   (21, 18);

INSERT INTO
   content_actors (content_id, actor_id)
VALUES
   (1, 7),
   (2, 2),
   (2, 4),
   (3, 4),
   (3, 3),
   (4, 9),
   (4, 23),
   (5, 6),
   (6, 11),
   (7, 10),
   (8, 14),
   (9, 19),
   (10, 4),
   (11, 18),
   (14, 17),
   (15, 15),
   (16, 13),
   (17, 1),
   (18, 5),
   (19, 12),
   (20, 21),
   (21, 16);

DELETE FROM reviews;

INSERT INTO
   reviews (
      review_id,
      user_id,
      content_id,
      text,
      rating,
      created_at
   )
VALUES
   (1, 3, 1, 'Шедевр', 10, '2025-01-10 14:00:00'),
   (2, 7, 2, 'Неймовірно', 10, '2025-01-15 10:30:00'),
   (
      3,
      12,
      3,
      'Фільм гарний, але не більше',
      7,
      '2025-02-01 18:00:00'
   ),
   (
      4,
      8,
      4,
      'Це було щось!',
      10,
      '2025-02-10 20:00:00'
   ),
   (
      5,
      4,
      5,
      'Класика на всі часи',
      9,
      '2025-03-05 09:00:00'
   ),
   (
      6,
      15,
      6,
      'Сюжет мене не зачепив',
      4,
      '2025-03-12 11:00:00'
   ),
   (
      7,
      10,
      7,
      'Шедевр кінематографу',
      10,
      '2025-04-01 15:00:00'
   ),
   (
      8,
      2,
      8,
      'Симпатичний фільм',
      8,
      '2025-04-08 17:00:00'
   ),
   (
      9,
      5,
      9,
      'Дуже емоційно!',
      9,
      '2025-04-15 19:00:00'
   ),
   (
      10,
      9,
      10,
      'Непоганий, але затягнутий',
      6,
      '2025-05-01 13:00:00'
   ),
   (
      11,
      1,
      11,
      'Відмінний фільм для вечора',
      9,
      '2025-05-10 21:00:00'
   ),
   (
      12,
      6,
      12,
      'Мені не сподобалося',
      3,
      '2025-06-01 16:00:00'
   ),
   (
      13,
      14,
      13,
      'Це геніально!',
      10,
      '2025-06-15 12:00:00'
   ),
   (
      14,
      11,
      14,
      'Неймовірний акторський склад',
      9,
      '2025-07-01 10:00:00'
   ),
   (
      15,
      13,
      15,
      'Середній фільм, нічого особливого',
      6,
      '2025-07-15 14:00:00'
   ),
   (
      16,
      3,
      16,
      'Мій улюблений фільм',
      10,
      '2025-08-01 11:00:00'
   ),
   (
      17,
      8,
      17,
      'Вражаюча історія!',
      9,
      '2025-08-10 18:00:00'
   ),
   (
      18,
      2,
      18,
      'Сюжет втратив мене на середині',
      5,
      '2025-09-01 20:00:00'
   ),
   (19, 7, 19, 'Шедевр', 10, '2025-09-15 09:00:00'),
   (
      20,
      15,
      20,
      'Дуже красиво знято',
      8,
      '2025-10-01 15:00:00'
   ),
   (
      22,
      12,
      21,
      'Фільм із душею',
      10,
      '2025-11-01 16:00:00'
   ),
   (
      23,
      1,
      3,
      'Класика на століття',
      9,
      '2025-11-10 10:00:00'
   ),
   (
      24,
      4,
      6,
      'Вартий перегляду',
      7,
      '2025-11-20 12:00:00'
   ),
   (
      25,
      1,
      7,
      'Шедевр для всіх віків',
      10,
      '2025-12-01 14:00:00'
   ),
   (
      26,
      4,
      10,
      'Дуже глибокий сюжет',
      9,
      '2025-12-10 17:00:00'
   ),
   (
      27,
      1,
      12,
      'Не мій жанр, але цікаво',
      6,
      '2026-01-05 11:00:00'
   ),
   (
      28,
      4,
      14,
      'Мій улюблений фільм',
      10,
      '2026-01-15 13:00:00'
   ),
   (
      29,
      1,
      16,
      'Непоганий фільм',
      7,
      '2026-02-01 15:00:00'
   ),
   (
      30,
      4,
      18,
      'Це було цікаво, але затягнуто',
      6,
      '2026-02-15 18:00:00'
   ),
   (
      31,
      1,
      20,
      'Дуже красиво знято',
      8,
      '2026-03-01 09:00:00'
   ),
   (
      32,
      4,
      21,
      'Середній фільм, нічого особливого',
      6,
      '2026-03-15 10:00:00'
   );
