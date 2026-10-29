import React,{useState}from'react';import{Link,useNavigate,useParams,Navigate}from'../router.jsx';import{LuArrowRight as ArrowRight,LuBookOpen as BookOpen,LuBookText as BookText,LuLanguages as Languages,LuStar as Star,LuFlame as Flame,LuCircleCheck as CheckCircle2,LuTarget as Target,LuClock as Clock,LuLockKeyhole as LockKeyhole,LuChevronLeft as ChevronLeft,LuSearch as Search,LuBookmark as Bookmark,LuVolume2 as Volume2,LuLoaderCircle as LoaderCircle,LuShieldCheck as ShieldCheck,LuEye as Eye,LuEyeOff as EyeOff}from'react-icons/lu';import{C,tr}from'../main.jsx';import{Shell,Page,copy}from'./shared';import{lessons}from'../data/course';
export function Home() {
  const { user, progress, lang } = React.useContext(C);
  const t = copy[lang] || copy.ru;
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const completed = progress.completed || [];
  const startIndex = Math.max(0, levels.indexOf(progress.studyPlan?.startLevel || 'A1'));
  let unlockedIndex = startIndex;
  while (unlockedIndex < levels.length - 1 && progress.assessmentResults?.[levels[unlockedIndex]]?.passed) unlockedIndex += 1;
  const currentLessons = lessons.filter((lesson) => lesson.levelCode === levels[unlockedIndex]);
  const recommended = progress.studyPlan?.startLevel
    ? currentLessons.find((lesson) => !completed.includes(lesson.id)) || currentLessons.at(-1) || lessons[0]
    : lessons[0];
  const completion = Math.round((completed.length / lessons.length) * 100);
  const primaryTo = user ? (progress.studyPlan?.startLevel ? `/learn/${recommended.id}` : '/assessment?type=placement') : '/register';

  return (
    <Shell>
      <main id="main-content">
        <section className="home-hero relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-white text-slate-900">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-900/20" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider text-brand shadow-sm dark:border-sky-900 dark:bg-gray-900/80">
                <Star size={14} fill="currentColor" aria-hidden="true" />{t.tag}
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{t.heroTitle}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to={primaryTo} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-extrabold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-600">
                  {user && progress.studyPlan?.startLevel ? t.continue : user ? t.startPlan : t.start}<ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to={user ? '/learn' : '/login'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-6 py-3.5 font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50">
                  <BookOpen size={17} aria-hidden="true" />{t.learn}
                </Link>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:mt-12 sm:gap-6">
                {[[lessons.length, t.units], [6, 'CEFR'], [(progress.learnedWords || []).length, t.wordsLearned]].map(([value, label]) => (
                  <div key={label} className="border-l-2 border-sky-200 pl-3 dark:border-sky-800 sm:pl-4">
                    <p className="text-xl font-black tracking-tight sm:text-2xl">{value}</p>
                    <p className="mt-1 text-xs leading-4 text-slate-500 dark:text-slate-400 sm:text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="mx-auto w-full max-w-lg rounded-[1.75rem] border border-sky-100 bg-white p-4 shadow-xl shadow-slate-900/5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 sm:p-5">
              <div className="flex items-center justify-between gap-4 px-1 pb-3">
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{user?.name || 'LinguaApp'}</p><h2 className="mt-1 text-xl font-black tracking-tight">{t.today}</h2></div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-brand dark:bg-sky-950"><Flame size={21} aria-hidden="true" /></span>
              </div>
              <article className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 dark:border-gray-800 dark:bg-gray-950/70 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-brand dark:bg-sky-950">{recommended.levelCode} <span aria-hidden="true">·</span> CEFR</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400"><Clock size={14} aria-hidden="true" /> {recommended.questions.length} {lang === 'ru' ? 'заданий' : lang === 'uz' ? 'savol' : 'questions'}</span>
                </div>
                <h3 className="mt-4 text-xl font-black leading-snug">{recommended.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{recommended.goal}</p>
                <div className="mt-5 flex items-center justify-between gap-3 text-xs font-bold text-slate-500 dark:text-slate-400"><span>{t.yourProgress}</span><span>{completed.length} / {lessons.length} {t.done}</span></div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-gray-800" role="progressbar" aria-label={t.yourProgress} aria-valuenow={completion} aria-valuemin="0" aria-valuemax="100">
                  <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${completion}%` }} />
                </div>
                <Link to={primaryTo} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-extrabold text-white transition hover:bg-sky-600">{user && progress.studyPlan?.startLevel ? t.continue : t.start}<ArrowRight size={17} aria-hidden="true" /></Link>
              </article>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-sky-50 px-5 py-3.5 dark:bg-sky-950/60">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300"><Star size={16} className="text-brand" aria-hidden="true" />{t.xp}</span><b className="text-sm">{progress.xp || 0} XP</b>
              </div>
            </aside>
          </div>
        </section>
        <section aria-labelledby="features-title" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-6 max-w-2xl"><p className="text-sm font-extrabold text-brand">LinguaApp</p><h2 id="features-title" className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{t.featuresTitle}</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[[BookOpen, t.featureGoals], [ShieldCheck, t.featureProgress], [Languages, t.featureDictionary]].map(([Icon, label]) => (
              <article key={label} className="rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-900 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-brand dark:bg-sky-950"><Icon size={20} aria-hidden="true" /></span><h3 className="mt-4 font-extrabold leading-6">{label}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
export function Learn() {
  const { progress, lang } = React.useContext(C);
  const t = copy[lang] || copy.ru;
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const plan = progress.studyPlan || {};
  const completed = progress.completed || [];
  const startIndex = Math.max(0, levels.indexOf(plan.startLevel || 'A1'));
  let unlockedIndex = startIndex;
  while (unlockedIndex < levels.length - 1 && progress.assessmentResults?.[levels[unlockedIndex]]?.passed) unlockedIndex += 1;
  const filtered = lessons.filter((lesson) =>
    (levelFilter === 'all' || lesson.levelCode === levelFilter) &&
    `${lesson.title} ${lesson.goal}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const visibleLevels = levels.filter((level) =>
    (levelFilter === 'all' || levelFilter === level) &&
    (!query.trim() || filtered.some((lesson) => lesson.levelCode === level)),
  );
  const completion = Math.round((completed.length / lessons.length) * 100);

  if (!plan.startLevel) return <Navigate to="/assessment?type=placement" replace />;

  return (
    <Shell>
      <Page title={t.learnTitle} sub={t.learnHint}>
        <section className="mb-7 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 dark:border-sky-900/60 dark:from-sky-950/60 dark:to-gray-900 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-wider text-brand">{t.yourProgress}</p>
              <h2 className="mt-1 text-lg font-black">{lang === 'ru' ? `Твой план начинается с ${plan.startLevel}` : lang === 'uz' ? `Reja ${plan.startLevel} bosqichidan boshlanadi` : `Your plan starts at ${plan.startLevel}`}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{lang === 'ru' ? `${plan.dailyMinutes || 20} минут в день · ${completed.length} из ${lessons.length} уроков пройдено` : lang === 'uz' ? `Kuniga ${plan.dailyMinutes || 20} daqiqa · ${completed.length}/${lessons.length} dars tugatildi` : `${plan.dailyMinutes || 20} minutes a day · ${completed.length} of ${lessons.length} lessons completed`}</p>
            </div>
            <div className="w-full sm:max-w-xs">
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-300"><span>{t.completed}</span><span>{completion}%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white dark:bg-gray-800" role="progressbar" aria-label={t.yourProgress} aria-valuenow={completion} aria-valuemin="0" aria-valuemax="100"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${completion}%` }} /></div>
            </div>
          </div>
        </section>

        <section aria-label={t.searchLabel} className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
          <div className="relative">
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <label className="sr-only" htmlFor="lesson-search">{t.searchLabel}</label>
            <input id="lesson-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchLesson} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-sky-100 dark:border-gray-700 dark:bg-gray-800 dark:focus:bg-gray-900 dark:focus:ring-sky-900/40" />
            {query && <button type="button" aria-label={t.clearSearch} onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-brand dark:hover:bg-gray-700">{lang === 'ru' ? 'Очистить' : lang === 'uz' ? 'Tozalash' : 'Clear'}</button>}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={lang === 'ru' ? 'Фильтр по уровню' : lang === 'uz' ? 'Bosqich bo‘yicha saralash' : 'Filter by level'}>
            {[
              ['all', t.all],
              ...levels.map((level) => [level, level]),
            ].map(([value, label]) => (
              <button type="button" key={value} aria-pressed={levelFilter === value} onClick={() => setLevelFilter(value)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${levelFilter === value ? 'border-brand bg-brand text-white shadow-sm shadow-sky-500/20' : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-brand dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300'}`}>
                {label}
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-8">
          {visibleLevels.map((level) => {
            const index = levels.indexOf(level);
            const allAtLevel = lessons.filter((lesson) => lesson.levelCode === level);
            const rows = filtered.filter((lesson) => lesson.levelCode === level);
            const done = allAtLevel.filter((lesson) => completed.includes(lesson.id)).length;
            const ready = done >= Math.ceil(allAtLevel.length * 0.8);
            const result = progress.assessmentResults?.[level];
            const levelProgress = allAtLevel.length ? Math.round((done / allAtLevel.length) * 100) : 0;

            return (
              <section key={level} aria-labelledby={`level-${level}`}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div><p className="text-xs font-black uppercase tracking-wider text-brand">{t.level} {index + 1}</p><h2 id={`level-${level}`} className="mt-1 text-2xl font-black tracking-tight">{level}<span className="ml-2 text-base font-semibold text-slate-400">· {allAtLevel[0]?.level}</span></h2></div>
                  {index >= startIndex && index <= unlockedIndex && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{done} / {allAtLevel.length} {t.lessonsDone}</p>}
                </div>

                {index < startIndex ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-gray-800 dark:bg-gray-900">{lang === 'ru' ? 'Этот уровень пройден в диагностике. К урокам можно вернуться позже.' : lang === 'uz' ? 'Bu bosqich diagnostika orqali o‘tilgan. Darslarga keyinroq qaytishingiz mumkin.' : 'Covered by your placement. You can return to these lessons anytime.'}</div>
                ) : index > unlockedIndex ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-sm text-slate-500 dark:border-gray-700 dark:bg-gray-900/60">
                    <LockKeyhole size={18} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <span>{lang === 'ru' ? 'Заверши предыдущий уровень и пройди итоговый тест, чтобы открыть этот раздел.' : lang === 'uz' ? 'Bu bo‘limni ochish uchun avvalgi bosqichni tugatib, yakuniy testdan o‘ting.' : 'Finish the previous level and pass its check to unlock these lessons.'}</span>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {rows.map((lesson, lessonIndex) => {
                        const isDone = completed.includes(lesson.id);
                        return (
                          <Link key={lesson.id} to={`/learn/${lesson.id}`} className="group flex min-h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-800">
                            <div className="flex items-center justify-between gap-3">
                              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand dark:bg-sky-950">{level} <span aria-hidden="true">·</span> {lessonIndex + 1}</span>
                              {isDone ? <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><CheckCircle2 size={17} aria-hidden="true" />{lang === 'ru' ? 'Пройден' : lang === 'uz' ? 'Bajarildi' : 'Completed'}</span> : <ArrowRight size={17} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />}
                            </div>
                            <h3 className="mt-4 text-lg font-black leading-snug group-hover:text-brand">{lesson.title}</h3>
                            <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{lesson.goal}</p>
                            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-400 dark:border-gray-800">
                              <span className="inline-flex items-center gap-1.5"><Clock size={14} aria-hidden="true" />{lesson.questions.length} {lang === 'ru' ? 'заданий' : lang === 'uz' ? 'savol' : 'questions'}</span>
                              <span className="inline-flex items-center gap-1.5"><BookText size={14} aria-hidden="true" />{lesson.vocab.length} {t.words.toLowerCase()}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    {!result?.passed && (
                      <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-5 dark:border-sky-900/60 dark:bg-sky-950/40 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="max-w-2xl">
                            <h3 className="font-black">{lang === 'ru' ? `Итоговая проверка ${level}` : lang === 'uz' ? `${level} yakuniy testi` : `${level} level check`}</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{lang === 'ru' ? `Нужно пройти 80% уроков (${done} из ${allAtLevel.length}), затем набрать 75% в тесте.` : lang === 'uz' ? `Darslarning 80% ini (${done}/${allAtLevel.length}) tugatib, testdan kamida 75% oling.` : `Complete 80% of lessons (${done} of ${allAtLevel.length}), then score at least 75% on the check.`}</p>
                            {result && !result.passed && <p role="status" className="mt-2 text-sm font-bold text-rose-600">{lang === 'ru' ? `Последний результат: ${result.score}%. Повтори уроки и попробуй ещё раз.` : lang === 'uz' ? `Oxirgi natija: ${result.score}%. Darslarni takrorlab, yana urinib ko‘ring.` : `Last result: ${result.score}%. Review and try again.`}</p>}
                          </div>
                          <div className="shrink-0">
                            <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">{levelProgress}% {lang === 'ru' ? 'уроков' : lang === 'uz' ? 'dars' : 'of lessons'}</p>
                            {ready ? <Link to={`/assessment?type=level&level=${level}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-extrabold text-white transition hover:bg-sky-600">{lang === 'ru' ? 'Пройти тест' : lang === 'uz' ? 'Testdan o‘tish' : 'Take the check'}<ArrowRight size={17} aria-hidden="true" /></Link> : <span className="inline-flex min-h-11 items-center rounded-xl border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-500 dark:border-sky-900 dark:bg-gray-900 dark:text-slate-400">{lang === 'ru' ? `Осталось ${Math.max(0, Math.ceil(allAtLevel.length * 0.8) - done)} уроков` : lang === 'uz' ? `${Math.max(0, Math.ceil(allAtLevel.length * 0.8) - done)} dars qoldi` : `${Math.max(0, Math.ceil(allAtLevel.length * 0.8) - done)} more to go`}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                    {result?.passed && <p role="status" className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">{lang === 'ru' ? `Тест пройден на ${result.score}% — следующий уровень открыт.` : lang === 'uz' ? `Test ${result.score}% bilan topshirildi — keyingi bosqich ochildi.` : `Passed with ${result.score}% — the next level is unlocked.`}</p>}
                  </>
                )}
              </section>
            );
          })}
          {visibleLevels.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center dark:border-gray-700"><Search size={24} className="mx-auto text-slate-300" aria-hidden="true" /><p className="mt-3 font-bold text-slate-600 dark:text-slate-300">{t.noLessons}</p><button type="button" onClick={() => { setQuery(''); setLevelFilter('all'); }} className="mt-3 text-sm font-bold text-brand hover:underline">{lang === 'ru' ? 'Сбросить фильтры' : lang === 'uz' ? 'Filtrlarni tozalash' : 'Reset filters'}</button></div>}
        </div>
      </Page>
    </Shell>
  );
}
export function Lesson(){const{id}=useParams(),nav=useNavigate(),{lang,progress,save}=React.useContext(C),t=copy[lang],l=lessons.find(x=>x.id===id),[n,N]=useState(0),[choice,S]=useState(null),[result,R]=useState(''),[busy,B]=useState(false);if(!l)return <Shell><Page title="404"/></Shell>;if(!progress.studyPlan?.startLevel)return <Navigate to="/assessment?type=placement" replace/>;const levels=['A1','A2','B1','B2','C1','C2'],startIndex=Math.max(0,levels.indexOf(progress.studyPlan.startLevel));let unlocked=startIndex;while(unlocked<levels.length-1&&progress.assessmentResults?.[levels[unlocked]]?.passed)unlocked++;const lessonLevel=levels.indexOf(l.levelCode);if(lessonLevel<startIndex||lessonLevel>unlocked)return <Navigate to="/learn" replace/>;const q=l.questions[n];async function check(){if(choice===null)return;const ok=choice===q.answer;R(ok?'ok':'bad');if(ok&&n===l.questions.length-1&&!progress.completed.includes(l.id)){B(true);try{await save({...progress,xp:progress.xp+50,completed:[...progress.completed,l.id],learnedWords:[...new Map([...(progress.learnedWords||[]),...l.vocab.map(([en,ru,uz])=>({en,ru,uz,lessonId:l.id}))].map(w=>[w.en.toLowerCase(),w])).values()]})}catch{R('error')}finally{B(false)}}}function next(){if(result==='bad'){S(null);R('');return}if(n<l.questions.length-1){N(n+1);S(null);R('')}else nav('/learn')}return <Shell><Page title={l.title} sub={`${l.levelCode} · ${l.goal}`}><div className="mx-auto max-w-3xl"><Link to="/learn" className="mb-4 flex items-center gap-1 font-bold text-brand"><ChevronLeft size={17}/>{t.course}</Link><section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-9 dark:border-gray-800 dark:bg-gray-900"><div className="flex justify-between text-sm font-bold text-brand">{t.lesson} {n+1} / {l.questions.length} <span>{Math.round((n+(result?1:0))/l.questions.length*100)}%</span></div><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand" style={{width:`${(n+(result?1:0))/l.questions.length*100}%`}}/></div>{n===0&&<div className="my-6 grid gap-3 rounded-2xl bg-sky-50 p-4 sm:grid-cols-3 dark:bg-sky-950"><div><b className="text-xs text-brand">{t.goal}</b><p className="text-sm">{l.goal}</p></div><div><b className="text-xs text-brand">{t.grammar}</b><p className="text-sm">{l.focus}</p></div><div><b className="text-xs text-brand">{t.example}</b><p className="text-sm italic">{l.example}</p></div></div>}<h2 className="mt-7 text-2xl font-black">{q.prompt}</h2><div className="mt-5 grid gap-3">{q.choices.map((x,i)=><button disabled={!!result} onClick={()=>S(i)} key={i} className={`rounded-xl border-2 p-4 text-left font-bold ${choice===i?'border-brand bg-sky-50 text-brand':'border-slate-100 dark:border-gray-700'} ${result&&i===q.answer?'border-emerald-400 bg-emerald-50 text-emerald-700':''}`}>{x}</button>)}</div>{result&&<p className={`mt-4 rounded-lg p-3 text-sm font-bold ${result==='ok'?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-600'}`}>{result==='ok'?t.correct:result==='error'?t.error:t.wrong+q.explain}</p>}<button disabled={choice===null||busy} onClick={result?next:check} className="mt-6 flex w-full justify-center gap-2 rounded-xl bg-brand py-3 font-bold text-white disabled:opacity-40">{busy?<LoaderCircle className="animate-spin"/>:result==='bad'?'Попробовать ещё раз':result?n===l.questions.length-1?t.finish:t.next:t.check}<ArrowRight size={18}/></button></section><section className="mt-4 rounded-2xl bg-white p-5 dark:bg-gray-900"><h3 className="font-extrabold">{t.vocab}</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{l.vocab.map(([a,b,c])=><p key={a} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-gray-800"><b>{a}</b><span className="float-right text-slate-500">{lang==='uz'?c:b||'Определение будет в словаре после урока'}</span></p>)}</div></section></div></Page></Shell>}
export function Dictionary(){
 const{lang,progress,save}=React.useContext(C),t=copy[lang],[q,Q]=useState(''),[open,O]=useState(''),[definition,D]=useState(''),[sourceUrl,U]=useState(''),[busy,B]=useState(false),[defError,E]=useState('');
 const words=progress.learnedWords||[],list=words.filter(w=>`${w.en} ${w.ru} ${w.uz}`.toLowerCase().includes(q.toLowerCase()));
 async function toggle(w){await save({...progress,saved:progress.saved.includes(w)?progress.saved.filter(x=>x!==w):[...progress.saved,w]})}
 async function lookup(word){if(open===word){O('');return}O(word);D('');U('');E('');B(true);try{const r=await fetch('https://freedictionaryapi.com/api/v1/entries/en/'+encodeURIComponent(word)+'?translations=true');if(!r.ok)throw Error('Для этого слова пока нет определения в бесплатном словаре.');const data=await r.json();U(data.source?.url||'');const entries=(data.entries||[]).filter(e=>e.language?.code==='en'),senses=entries.flatMap(e=>(e.senses||[]).filter(x=>x.definition).slice(0,2).map(x=>({pos:e.partOfSpeech,definitions:[{definition:x.definition,example:x.examples?.[0]}]}))),translations=entries.flatMap(e=>(e.senses||[]).flatMap(x=>x.translations||[])).filter(x=>['ru','uz'].includes(x.language?.code)),unique=[...new Map(translations.map(x=>[x.language.code+'-'+x.word,{definition:(x.language.code==='ru'?'RU':'UZ')+' — '+x.word}])).values()].slice(0,8);D([{pos:'Перевод',definitions:unique},...senses].filter(x=>x.definitions.length))}catch(e){E(e.message||'Не удалось получить определение. Попробуйте позже.')}finally{B(false)}}
 return <Shell><Page title={t.dictTitle} sub='Здесь появляются слова из пройденных уроков. Нажми на слово, чтобы открыть определение.'><div className="relative mb-5 max-w-xl"><Search className="absolute left-3 top-3 text-slate-400" size={17}/><input value={q} onChange={e=>Q(e.target.value)} placeholder={t.search} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 dark:border-gray-700 dark:bg-gray-900"/></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map(({en,ru,uz,lessonId})=>{const saved=progress.saved.includes(en);return <article key={en} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"><div className="flex items-start justify-between gap-3"><div><button onClick={()=>lookup(en)} className="text-left text-lg font-extrabold hover:text-brand">{en}</button><p className="text-sm text-slate-500">{ru||uz?`${lang==='uz'?uz:ru} · ${lang==='uz'?ru:uz}`:'Значение откроется по нажатию на слово'}</p></div><div className="flex gap-2"><button aria-label="Listen" onClick={()=>{const u=new SpeechSynthesisUtterance(en);u.lang='en-US';speechSynthesis.speak(u)}} className="rounded-lg bg-sky-50 p-2.5 text-brand"><Volume2 size={17}/></button><button aria-label="Сохранить слово" onClick={()=>toggle(en)} className={`rounded-lg p-2.5 ${saved?'bg-sky-50 text-sky-500':'bg-slate-50 text-slate-400'}`}><Bookmark fill={saved?'currentColor':'none'} size={17}/></button></div></div>{open===en&&<div className="mt-3 border-t pt-3 text-sm dark:border-gray-700">{busy?'Загружаю определение…':defError?<p className="text-slate-500">{defError}</p>:definition.map(m=><div key={m.pos} className="mb-2"><b className="text-brand">{m.pos}</b>{m.definitions.map((d,i)=><p key={i} className="mt-1 text-slate-600 dark:text-slate-300">{d.definition}{d.example&&<span className="mt-1 block italic text-slate-400">“{d.example}”</span>}</p>)}</div>)}{sourceUrl&&<a className="mt-2 inline-block text-xs text-slate-400 underline" href={sourceUrl} target="_blank" rel="noreferrer">Источник: Wiktionary · CC BY-SA 4.0</a>}</div>}</article>})}</div>{!list.length&&<p className="rounded-2xl border border-dashed p-8 text-center text-slate-500">{progress.completed.length?'Подходящие слова не найдены.':'Слова появятся здесь после завершения урока.'}</p>}{list.length>0&&<p className="mt-5 text-xs text-slate-400">Определения: <a className="underline" href="https://freedictionaryapi.com/" target="_blank" rel="noreferrer">FreeDictionaryAPI.com</a>.</p>}</Page></Shell>
}
export function Translator(){const{lang}=React.useContext(C),t=copy[lang],[text,T]=useState(''),[source,S]=useState('en'),[target,D]=useState(lang==='en'?'ru':lang),[output,O]=useState(''),[error,E]=useState(''),[busy,B]=useState(false);async function send(e){e.preventDefault();B(true);E('');O('');try{const d=await tr('/translate',{body:{text,source,target},auth:false,method:'POST'});O(d.translatedText)}catch(e){E(e.message)}finally{B(false)}}return <Shell><Page title={t.translateTitle} sub={t.translateHint}><form onSubmit={send} className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"><div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-bold">{t.source}<select value={source} onChange={e=>S(e.target.value)} className="mt-2 block w-full rounded-xl border p-3 dark:bg-gray-900">{[['en','English'],['ru','Русский'],['uz','O‘zbekcha']].map(([v,x])=><option key={v} value={v}>{x}</option>)}</select></label><label className="text-sm font-bold">{t.target}<select value={target} onChange={e=>D(e.target.value)} className="mt-2 block w-full rounded-xl border p-3 dark:bg-gray-900">{[['en','English'],['ru','Русский'],['uz','O‘zbekcha']].filter(([v])=>v!==source).map(([v,x])=><option key={v} value={v}>{x}</option>)}</select></label></div><textarea required maxLength="4500" rows="7" value={text} onChange={e=>T(e.target.value)} placeholder={t.placeholder} className="mt-5 w-full rounded-xl border p-4 leading-7 outline-none focus:border-brand dark:bg-gray-900"/><div className="text-right text-xs text-slate-400">{text.length} / 4500</div><button disabled={busy} className="mt-3 flex w-full justify-center gap-2 rounded-xl bg-brand py-3 font-bold text-white disabled:opacity-50">{busy?<><LoaderCircle className="animate-spin"/>{t.loading}</>:<><Languages size={18}/>{t.translate}</>}</button><p className="mt-4 text-xs leading-5 text-slate-400">{t.limit}</p>{error&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-4 font-bold text-rose-600">{error}</p>}{output&&<div className="mt-5 rounded-xl bg-sky-50 p-5 dark:bg-sky-950"><b className="text-xs uppercase text-brand">{t.target}</b><p className="mt-2 whitespace-pre-wrap text-lg font-semibold leading-8">{output}</p></div>}</form></Page></Shell>}
export function Profile(){
 const{user,progress,lang}=React.useContext(C),t=copy[lang],[social,S]=useState({friends:[],requests:[],duels:[],friendCode:''}),[code,F]=useState(''),[msg,M]=useState(''),[busy,B]=useState(false);
 async function refresh(){try{S(await tr('/social'))}catch(e){M(e.message)}} React.useEffect(()=>{refresh()},[]);
 async function action(path,opts={}){B(true);M('');try{await tr(path,opts);await refresh()}catch(e){M(e.message)}finally{B(false)}}
 return <Shell><Page title={t.profileTitle}><div className="mx-auto max-w-4xl"><div className="flex items-center gap-5 rounded-3xl bg-gradient-to-br from-sky-600 to-sky-700 p-7 text-white"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-2xl font-black">{user.name[0].toUpperCase()}</span><div><h2 className="text-2xl font-black">{user.name}</h2><p className="text-sky-100">{user.email}</p></div></div>
 <h3 className="mb-4 mt-8 text-xl font-black">Учёба</h3><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[Flame,progress.streak||0,'дней подряд'],[Star,progress.xp+' XP',t.xp],[Target,progress.bestXp||progress.xp,'личный рекорд XP'],[CheckCircle2,progress.completed.length+' / '+lessons.length,t.completed]].map(([I,v,k])=><article key={k} className="rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><I className="text-brand"/><b className="mt-3 block text-xl">{v}</b><span className="text-sm text-slate-500">{k}</span></article>)}</div>
 <section className="mt-8 rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h3 className="text-xl font-black">Друзья</h3><p className="mt-2 text-sm text-slate-500">Код для добавления: <b className="select-all text-brand">{social.friendCode||'…'}</b></p><form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={e=>{e.preventDefault();action('/friends',{method:'POST',body:{friendCode:code}}).then(()=>F(''))}}><input value={code} onChange={e=>F(e.target.value)} placeholder="Код друга" className="min-w-0 flex-1 rounded-xl border p-3 dark:border-gray-700 dark:bg-gray-800"/><button disabled={busy||!code} className="rounded-xl bg-brand px-5 py-3 font-bold text-white">Добавить</button></form>{social.requests.map(r=><div key={r.friendshipId} className="mt-3 flex justify-between rounded-xl bg-sky-50 p-3 dark:bg-sky-950"><span>{r.name} отправил запрос</span><button onClick={()=>action('/friends/'+r.friendshipId+'/accept',{method:'POST'})} className="font-bold text-brand">Принять</button></div>)}{social.friends.map(f=><div key={f.id} className="flex items-center justify-between border-b py-3 dark:border-gray-700"><span>{f.name} <small className="text-slate-500">· {f.xp} XP</small></span><button onClick={()=>action('/duels',{method:'POST',body:{friendId:f.id}})} className="rounded-lg border px-3 py-2 text-sm font-bold hover:border-brand hover:text-brand">Дуэль</button></div>)}{!social.friends.length&&!social.requests.length&&<p className="mt-3 text-sm text-slate-500">Добавь друга по его коду, чтобы начать.</p>}{msg&&<p role="status" className="mt-3 text-sm text-sky-700">{msg}</p>}</section>
 {social.duels.length>0&&<section className="mt-5 rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h3 className="font-black">Дуэль · XP за 24 часа</h3>{social.duels.map(d=><div key={d.id} className="flex justify-between gap-2 border-b py-3 last:border-0 dark:border-gray-700"><span>{d.challenger_name} {d.challengerScore??0} — {d.opponent_name} {d.opponentScore??0} XP</span>{d.status==='pending'&&d.opponent_id===user.id?<button onClick={()=>action('/duels/'+d.id+'/accept')} className="font-bold text-brand">Принять</button>:<small>{d.status==='finished'?'завершена':d.status==='active'?'идёт 24 часа':d.status}</small>}</div>)}</section>}
 {progress.saved.length>0&&<div className="mt-6 rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><b>{t.words}</b><div className="mt-3 flex flex-wrap gap-2">{progress.saved.map(x=><span key={x} className="rounded-full bg-sky-50 px-3 py-1 text-sm text-brand">{x}</span>)}</div></div>}</div></Page></Shell>
}
export function Ranking() {
  const { user, progress, lang } = React.useContext(C);
  const words = {
    ru: { title: '\u0420\u0435\u0439\u0442\u0438\u043d\u0433', subtitle: '\u0421\u0440\u0430\u0432\u043d\u0438\u0432\u0430\u0439 \u0441\u0432\u043e\u0439 \u043e\u043f\u044b\u0442 \u0441 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438 \u0438 \u0432\u0441\u0435\u043c\u0438 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430\u043c\u0438 LinguaApp.', tabFriends: '\u0414\u0440\u0443\u0437\u044c\u044f', tabGlobal: '\u0412\u0441\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438', yourPlace: '\u0422\u0432\u043e\u0451 \u043c\u0435\u0441\u0442\u043e', outOf: '\u0438\u0437', memberCount: '\u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432', you: '\u0422\u044b', loading: '\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043c \u0440\u0435\u0439\u0442\u0438\u043d\u0433\u2026', noFriends: '\u041f\u043e\u043a\u0430 \u0442\u044b \u0432 \u0440\u0435\u0439\u0442\u0438\u043d\u0433\u0435 \u043e\u0434\u0438\u043d.', invite: '\u0414\u043e\u0431\u0430\u0432\u044c \u0434\u0440\u0443\u0437\u0435\u0439 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u0435, \u0447\u0442\u043e\u0431\u044b \u0441\u0440\u0430\u0432\u043d\u0438\u0432\u0430\u0442\u044c \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b.', profile: '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c', member: '\u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a', error: '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0440\u0435\u0439\u0442\u0438\u043d\u0433.' },
    en: { title: 'Ranking', subtitle: 'Compare your XP with friends or everyone using LinguaApp.', tabFriends: 'Friends', tabGlobal: 'Everyone', yourPlace: 'Your place', outOf: 'of', memberCount: 'members', you: 'You', loading: 'Loading ranking...', noFriends: 'You are the only person on your friends leaderboard.', invite: 'Add friends from your profile to compare progress.', profile: 'Open profile', member: 'Member', error: 'Could not load the ranking.' },
    uz: { title: 'Reyting', subtitle: 'XP natijalaringizni \u0434\u043e\u2018stlaringiz va LinguaApp foydalanuvchilari bilan solishtiring.', tabFriends: 'D\u043e\u2018stlar', tabGlobal: 'Barcha foydalanuvchilar', yourPlace: 'O\u2018rningiz', outOf: 'dan', memberCount: 'ishtirokchi', you: 'Siz', loading: 'Reyting yuklanmoqda\u2026', noFriends: 'D\u043e\u2018stlar reytingida hozircha faqat siz borsiz.', invite: 'Natijalarni solishtirish uchun profilingizdan d\u043e\u2018st q\u043e\u2018shing.', profile: 'Profilni ochish', member: 'Ishtirokchi', error: 'Reytingni yuklab b\u043e\u2018lmadi.' },
  };
  const t = words[lang] || words.ru;
  const [scope, setScope] = useState('friends');
  const [friendData, setFriendData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [friendError, setFriendError] = useState('');
  const [globalError, setGlobalError] = useState('');

  React.useEffect(() => {
    tr('/social').then(setFriendData).catch((cause) => setFriendError(cause.message || t.error));
    tr('/ranking').then(setGlobalData).catch((cause) => setGlobalError(cause.message || t.error));
  }, []);

  const friendEntries = friendData ? [
    { id: user.id, name: user.name, xp: Number(progress.xp) || 0, current: true },
    ...(friendData.friends || []).map((friend) => ({ ...friend, xp: Number(friend.xp) || 0 })),
  ].sort((a, b) => b.xp - a.xp || String(a.name).localeCompare(String(b.name))) : null;
  const globalEntries = globalData?.ranking?.map((entry) => ({
    ...entry,
    xp: Number(entry.xp) || 0,
    current: Number(entry.id) === Number(user.id),
  })) ?? null;
  const entries = scope === 'friends' ? friendEntries : globalEntries;
  const error = scope === 'friends' ? friendError : globalError;
  const position = entries?.findIndex((entry) => entry.current) + 1;

  return (
    <Shell>
      <Page title={t.title} sub={t.subtitle}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900" role="group" aria-label={t.title}>
            {[
              ['friends', t.tabFriends],
              ['global', t.tabGlobal],
            ].map(([value, label]) => <button key={value} type="button" aria-pressed={scope === value} onClick={() => setScope(value)} className={'min-h-11 flex-1 rounded-xl px-3 py-2.5 text-sm font-extrabold transition ' + (scope === value ? 'bg-brand text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-gray-800')}>
              {label}
            </button>)}
          </div>

          {entries && <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/80 p-5 dark:border-sky-900/60 dark:bg-sky-950/40">
            <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand shadow-sm dark:bg-gray-900"><Star size={20} aria-hidden="true" /></span><div><p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{t.yourPlace}</p><p className="text-xl font-black">#{position}</p></div></div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{entries.length} {t.memberCount}</p>
          </section>}

          {error && <p role="alert" className="mb-4 rounded-xl bg-rose-50 p-4 text-sm font-bold text-rose-600">{error}</p>}
          {!entries && !error && <div role="status" className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm font-semibold text-slate-500 dark:border-gray-800 dark:bg-gray-900"><LoaderCircle size={22} className="mx-auto mb-3 animate-spin text-brand" aria-hidden="true" />{t.loading}</div>}

          {entries?.length > 0 && <section aria-label={scope === 'friends' ? t.tabFriends : t.tabGlobal} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="grid grid-cols-[2.5rem_2.75rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-400 dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-[3rem_3rem_minmax(0,1fr)_6rem] sm:px-6">
              <span>#</span><span aria-hidden="true"></span><span>{t.member}</span><span className="text-right">XP</span>
            </div>
            <ol>
              {entries.map((entry, index) => <li key={entry.id} className={'grid grid-cols-[2.5rem_2.75rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-0 dark:border-gray-800 sm:grid-cols-[3rem_3rem_minmax(0,1fr)_6rem] sm:px-6 ' + (entry.current ? 'bg-sky-50/80 dark:bg-sky-950/40' : 'transition hover:bg-slate-50 dark:hover:bg-gray-800/60')}>
                <span className={'grid h-9 w-9 place-items-center rounded-xl text-sm font-black ' + (entry.current ? 'bg-brand text-white' : index < 3 ? 'bg-sky-100 text-brand dark:bg-sky-950' : 'bg-slate-100 text-slate-500 dark:bg-gray-800 dark:text-slate-300')}>{index + 1}</span>
                <span className={'grid h-10 w-10 place-items-center rounded-full text-sm font-black ' + (entry.current ? 'bg-white text-brand dark:bg-gray-900' : 'bg-slate-100 text-slate-500 dark:bg-gray-800')}>{String(entry.name || '?').slice(0, 1).toUpperCase()}</span>
                <span className="min-w-0"><span className="block truncate font-extrabold">{entry.name}</span>{entry.current && <span className="mt-0.5 block text-xs font-bold text-brand">{t.you}</span>}</span>
                <b className="text-right text-sm tabular-nums">{entry.xp} XP</b>
              </li>)}
            </ol>
          </section>}

          {scope === 'friends' && friendData && friendData.friends?.length === 0 && <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-slate-300 p-5 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-extrabold">{t.noFriends}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.invite}</p></div><Link to="/profile" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-brand transition hover:border-sky-300 hover:bg-sky-50 dark:border-gray-700 dark:hover:bg-sky-950">{t.profile}</Link></div>}
          {entries?.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm font-semibold text-slate-500 dark:border-gray-700">{t.error}</p>}
        </div>
      </Page>
    </Shell>
  );
}
function AuthForm({register=false}){const{lang,login,user}=React.useContext(C),t=copy[lang],nav=useNavigate(),[error,E]=useState(''),[busy,B]=useState(false),[showPassword,ShowPassword]=useState(false);if(user)return <Navigate to="/profile"/>;async function submit(e){e.preventDefault();B(true);E('');const data=Object.fromEntries(new FormData(e.currentTarget));try{const d=await login(register?'/auth/register':'/auth/login',data);nav(d.progress.studyPlan?.startLevel?'/learn':'/assessment?type=placement')}catch(e){E(e.message)}finally{B(false)}}return <Shell><div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2"><div><p className="font-bold uppercase tracking-widest text-brand">{t.tag}</p><h1 className="mt-4 text-4xl font-black sm:text-5xl">{register?t.makeAccount:t.welcome}</h1><p className="mt-4 text-lg leading-8 text-slate-500">{register?t.registerHint:t.loginHint}</p></div><form onSubmit={submit} className="rounded-3xl border bg-white p-7 shadow-xl dark:border-gray-800 dark:bg-gray-900"><h2 className="text-2xl font-black">{register?t.register:t.login}</h2>{register&&<label className="mt-5 block text-sm font-bold">{t.name}<input name="name" minLength="2" maxLength="60" required className="mt-2 w-full rounded-xl border p-3 dark:bg-gray-900"/></label>}<label className="mt-5 block text-sm font-bold">{t.email}<input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border p-3 dark:bg-gray-900"/></label><label className="mt-5 block text-sm font-bold">{t.password}<span className="relative mt-2 block"><input name="password" type={showPassword?'text':'password'} minLength={register?8:1} autoComplete={register?'new-password':'current-password'} required className="w-full rounded-xl border p-3 pr-12 dark:bg-gray-900"/><button type="button" onClick={()=>ShowPassword(v=>!v)} aria-label={showPassword?'Скрыть пароль':'Показать пароль'} aria-pressed={showPassword} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-brand">{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button></span></label>{error&&<p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-bold text-rose-600">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-brand py-3 font-extrabold text-white disabled:opacity-50">{busy?<LoaderCircle className="mx-auto animate-spin"/>:register?t.register:t.sign}</button><p className="mt-5 text-center text-sm text-slate-500">{register?t.hasAccount:t.noAccount} <Link className="font-bold text-brand" to={register?'/login':'/register'}>{register?t.login:t.register}</Link></p></form></div></Shell>}
export const Login=()=> <AuthForm/>,Register=()=> <AuthForm register/>;export function NotFound(){const{lang}=React.useContext(C);return <Shell><Page title="404"><Link className="text-brand" to="/">{copy[lang].back}</Link></Page></Shell>}







