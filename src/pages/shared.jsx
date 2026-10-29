import React, { useEffect, useRef, useState } from 'react';
import Logo from '../assets/LinguaApp_logo-removebg-preview (1).png';
import { Link, NavLink } from '../router.jsx';
import {
  LuBookOpen as BookOpen,
  LuBookText as BookText,
  LuCheck as Check,
  LuChevronDown as ChevronDown,
  LuGlobe as Globe,
  LuHouse as HomeIcon,
  LuLanguages as Languages,
  LuLogOut as LogOut,
  
  
  LuTrophy as Trophy,
  LuUserRound as UserRound,
} from 'react-icons/lu';
import { useApp } from '../main.jsx';

function LanguagePicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  const options = [
    ['ru', 'Русский', 'RU'],
    ['uz', 'O‘zbekcha', 'UZ'],
    ['en', 'English', 'EN'],
  ];

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label="Выбрать язык интерфейса"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-sm font-extrabold transition ${open ? 'border-sky-300 bg-sky-50 text-brand dark:border-sky-800 dark:bg-sky-950' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700'}`}
      >
        <Globe size={16} aria-hidden="true" />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-gray-700 dark:bg-gray-900">
          {options.map(([code, name, short]) => (
            <button
              role="menuitem"
              type="button"
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${lang === code ? 'bg-sky-50 text-brand dark:bg-sky-950' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-gray-800'}`}
            >
              <span className={`grid h-8 w-9 place-items-center rounded-lg text-xs font-black ${lang === code ? 'bg-white text-brand dark:bg-gray-900' : 'bg-slate-100 text-slate-500 dark:bg-gray-800'}`}>{short}</span>
              <span className="flex-1 text-sm font-bold">{name}</span>
              {lang === code && <Check size={16} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const copy = {
  ru: {
    ranking: '\u0420\u0435\u0439\u0442\u0438\u043d\u0433',
    home: 'Главная', learn: 'Обучение', dict: 'Словарь', trans: 'Переводчик', profile: 'Профиль', sign: 'Войти', out: 'Выйти',
    start: 'Начать учиться', units: 'уроков', done: 'завершено', words: 'Слова', tag: 'Твой путь к уверенному английскому',
    subtitle: '172 урока от первых фраз до уверенного владения языком: шесть уровней CEFR, практика и понятный прогресс.',
    heroTitle: 'Английский — шаг за шагом, с реальным прогрессом.', today: 'Продолжай каждый день', goal: 'Цель урока', vocab: 'Лексика', example: 'Пример', grammar: 'Тема',
    check: 'Проверить ответ', next: 'Дальше', finish: 'Завершить урок', course: 'К урокам', correct: 'Верно! Отлично.', wrong: 'Пока неверно. ', translate: 'Перевести',
    source: 'С языка', target: 'На язык', placeholder: 'Введи слово, фразу или текст до 4500 символов…', loading: 'Переводим…', saved: 'Сохранено', save: 'Сохранить',
    search: 'Поиск…', noResults: 'Ничего не найдено.', account: 'Учётная запись', progress: 'Мой прогресс', xp: 'Опыт', streak: 'Дней подряд', completed: 'Уроков завершено',
    lesson: 'урок', back: 'Назад', email: 'Электронная почта', password: 'Пароль', name: 'Имя', login: 'Войти', register: 'Регистрация', welcome: 'С возвращением',
    makeAccount: 'Создай аккаунт', loginHint: 'Войди, чтобы продолжить занятия. Прогресс будет связан с твоим аккаунтом.', registerHint: 'Создай аккаунт, чтобы сохранять результаты и продолжать учиться с любого устройства.',
    noAccount: 'Нет аккаунта?', hasAccount: 'Уже есть аккаунт?', error: 'Ошибка', limit: 'Бесплатный сервис перевода имеет ограничения. Не отправляй конфиденциальный текст.',
    dictTitle: 'Английский словарь', dictHint: 'Ищи слова, слушай произношение и сохраняй лексику из уроков.', learnTitle: 'Твоя программа обучения',
    learnHint: '172 урока на шести последовательных уровнях CEFR.', searchLesson: 'Найти урок или тему…', all: 'Все уровни', noLessons: 'Уроки не найдены.',
    translateTitle: 'Переводчик предложений', translateHint: 'Переводи текст между английским, русским и узбекским языками.', profileTitle: 'Мой профиль',
    wordsLearned: 'изучено слов', continue: 'Продолжить обучение', startPlan: 'Составить план', yourProgress: 'Твой прогресс',
    featuresTitle: 'Учись в своём темпе', featureGoals: 'Понятные цели каждого урока', featureProgress: 'Прогресс сохраняется в аккаунте', featureDictionary: 'Слова из уроков в личном словаре',
    level: 'Уровень', lessonsDone: 'уроков пройдено', searchLabel: 'Поиск по урокам', clearSearch: 'Очистить поиск',
  },
  en: {
    ranking: 'Ranking',
    home: 'Home', learn: 'Learn', dict: 'Dictionary', trans: 'Translator', profile: 'Profile', sign: 'Log in', out: 'Log out',
    start: 'Start learning', units: 'lessons', done: 'completed', words: 'Words', tag: 'Your path to confident English',
    subtitle: '172 lessons from your first phrases to confident English, across six CEFR levels with clear progress along the way.',
    heroTitle: 'English, one real step at a time.', today: 'Keep going every day', goal: 'Lesson goal', vocab: 'Vocabulary', example: 'Example', grammar: 'Focus',
    check: 'Check answer', next: 'Next', finish: 'Finish lesson', course: 'All lessons', correct: 'Correct! Nicely done.', wrong: 'Not quite. ', translate: 'Translate',
    source: 'From', target: 'To', placeholder: 'Enter a word, phrase or text up to 4500 characters…', loading: 'Translating…', saved: 'Saved', save: 'Save',
    search: 'Search…', noResults: 'Nothing found.', account: 'Account', progress: 'My progress', xp: 'Experience', streak: 'Day streak', completed: 'Lessons completed',
    lesson: 'lesson', back: 'Back', email: 'Email', password: 'Password', name: 'Name', login: 'Log in', register: 'Register', welcome: 'Welcome back',
    makeAccount: 'Create an account', loginHint: 'Log in to continue. Your progress is saved with your account.', registerHint: 'Create an account to save your progress and keep learning on any device.',
    noAccount: 'New here?', hasAccount: 'Already have an account?', error: 'Error', limit: 'The free translation provider has usage limits. Avoid sending confidential text.',
    dictTitle: 'English dictionary', dictHint: 'Find words, hear pronunciation and save vocabulary from your lessons.', learnTitle: 'Your learning programme',
    learnHint: '172 lessons across six progressive CEFR levels.', searchLesson: 'Search lessons or topics…', all: 'All levels', noLessons: 'No lessons found.',
    translateTitle: 'Sentence translator', translateHint: 'Translate between English, Russian and Uzbek.', profileTitle: 'My profile',
    wordsLearned: 'words learned', continue: 'Continue learning', startPlan: 'Create your plan', yourProgress: 'Your progress',
    featuresTitle: 'Learn at your own pace', featureGoals: 'Clear goals in every lesson', featureProgress: 'Progress saved to your account', featureDictionary: 'Lesson words in your personal dictionary',
    level: 'Level', lessonsDone: 'lessons completed', searchLabel: 'Search lessons', clearSearch: 'Clear search',
  },
  uz: {
    ranking: 'Reyting',
    home: 'Bosh sahifa', learn: 'Ta’lim', dict: 'Lug‘at', trans: 'Tarjimon', profile: 'Profil', sign: 'Kirish', out: 'Chiqish',
    start: 'O‘rganishni boshlash', units: 'dars', done: 'yakunlandi', words: 'So‘z', tag: 'Ishonchli ingliz tili sari yo‘l',
    subtitle: 'Birinchi iboralardan erkin muloqotgacha 172 ta dars: CEFRning olti bosqichi, mashqlar va aniq natijalar.',
    heroTitle: 'Ingliz tili — har kuni yangi qadam.', today: 'Har kuni davom et', goal: 'Dars maqsadi', vocab: 'Lug‘at', example: 'Misol', grammar: 'Mavzu',
    check: 'Tekshirish', next: 'Keyingi', finish: 'Darsni tugatish', course: 'Darslarga qaytish', correct: 'To‘g‘ri! Barakalla.', wrong: 'Xato. ', translate: 'Tarjima',
    source: 'Qaysi tildan', target: 'Qaysi tilga', placeholder: 'So‘z yoki matnni kiriting (4500 belgigacha)…', loading: 'Tarjima qilinmoqda…', saved: 'Saqlandi', save: 'Saqlash',
    search: 'Qidirish…', noResults: 'Hech narsa topilmadi.', account: 'Akkaunt', progress: 'Natijalarim', xp: 'Tajriba', streak: 'Kun ketma-ket', completed: 'Tugallangan darslar',
    lesson: 'dars', back: 'Orqaga', email: 'Elektron pochta', password: 'Parol', name: 'Ism', login: 'Kirish', register: 'Ro‘yxatdan o‘tish', welcome: 'Qaytganingizdan xursandmiz',
    makeAccount: 'Akkaunt yarating', loginHint: 'Davom etish uchun akkauntga kiring. Natijalaringiz saqlanadi.', registerHint: 'Natijalaringizni saqlash va istalgan qurilmada davom etish uchun akkaunt yarating.',
    noAccount: 'Akkauntingiz yo‘qmi?', hasAccount: 'Akkauntingiz bormi?', error: 'Xato', limit: 'Tarjima xizmatida bepul foydalanish cheklovi bor. Maxfiy matn yubormang.',
    dictTitle: 'Inglizcha lug‘at', dictHint: 'So‘zlarni qidiring, talaffuzini tinglang va darslardagi so‘zlarni saqlang.', learnTitle: 'O‘quv dasturingiz',
    learnHint: 'CEFRning olti bosqichida ketma-ket tuzilgan 172 ta dars.', searchLesson: 'Dars yoki mavzuni qidiring…', all: 'Barcha darajalar', noLessons: 'Dars topilmadi.',
    translateTitle: 'Gaplar tarjimoni', translateHint: 'Ingliz, rus va o‘zbek tillari orasida tarjima qiling.', profileTitle: 'Mening profilim',
    wordsLearned: 'o‘rganilgan so‘z', continue: 'O‘qishni davom ettirish', startPlan: 'Reja tuzish', yourProgress: 'Natijalaringiz',
    featuresTitle: 'O‘z sur’atingizda o‘rganing', featureGoals: 'Har bir dars uchun aniq maqsad', featureProgress: 'Natijalar akkauntingizda saqlanadi', featureDictionary: 'Darslardagi so‘zlar shaxsiy lug‘atda',
    level: 'Bosqich', lessonsDone: 'dars yakunlandi', searchLabel: 'Darslardan qidirish', clearSearch: 'Qidiruvni tozalash',
  },
};

export function Shell({ children }) {
  const { lang, setLang, user, logout } = useApp();
  const t = copy[lang] || copy.ru;
  const items = [
    ['/', t.home, HomeIcon],
    ['/learn', t.learn, BookOpen],
    ['/ranking', t.ranking, Trophy],
    ['/dictionary', t.dict, BookText],
    ['/translator', t.trans, Languages],
    ['/profile', t.profile, UserRound],
  ];

  return (
    <div className="app-shell min-h-screen bg-white text-slate-800 dark:bg-gray-950 dark:text-white">
      <a className="skip-link" href="#main-content">К содержимому</a>
      <header className="app-header sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" aria-label="LinguaApp — главная" className="flex shrink-0 items-center gap-2.5 rounded-xl text-xl font-black tracking-tight">
            <img src={Logo} alt="" className="h-10 w-10 rounded-xl object-cover shadow-sm" />
            <span>Lingua<span className="text-brand">App</span></span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
            {items.map(([to, label, Icon]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-sky-50 text-brand dark:bg-sky-950' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-gray-800 dark:hover:text-white'}`}
              >
                <Icon size={17} aria-hidden="true" />{label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguagePicker lang={lang} setLang={setLang} />
            {user ? (
              <button
                type="button"
                title={t.out}
                aria-label={t.out}
                onClick={logout}
                className="icon-button h-10 w-10 rounded-xl bg-slate-100 text-slate-600 transition hover:bg-sky-50 hover:text-brand dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
              ><LogOut size={18} aria-hidden="true" /></button>
            ) : (
              <Link to="/login" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-sm shadow-sky-500/20 transition hover:bg-sky-600">
                {t.sign}
              </Link>
            )}
          </div>
        </div>

        <nav aria-label="Мобильная навигация" className="mobile-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-slate-200/90 bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),6px)] pt-1.5 shadow-[0_-8px_24px_-20px_rgba(15,23,42,.5)] backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/95 lg:hidden">
          {items.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 text-[10px] font-bold leading-none transition ${isActive ? 'text-brand' : 'text-slate-400 hover:text-slate-600 dark:text-slate-400'}`}
            >
              <Icon size={19} strokeWidth={2.1} aria-hidden="true" />
              <span className="max-w-full truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
      <footer className="mt-16 border-t border-slate-200 bg-white py-7 pb-24 text-center text-sm text-slate-400 dark:border-gray-800 dark:bg-gray-900 lg:pb-7">
        <b className="text-slate-700 dark:text-white">LinguaApp</b><span aria-hidden="true"> · </span>{t.tag}
      </footer>
    </div>
  );
}

export function Page({ title, sub, children }) {
  return (
    <main id="main-content" className="page-content mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 sm:py-12 lg:pb-12">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <p className="text-xs font-black uppercase tracking-[.18em] text-brand">LinguaApp <span aria-hidden="true">·</span> English</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
        {sub && <p className="mt-3 text-base leading-7 text-slate-500 dark:text-slate-300">{sub}</p>}
      </header>
      {children}
    </main>
  );
}
