import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[var(--bg-base)] px-6 py-28 text-[var(--ink)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--brand-100)] opacity-60 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[var(--brand-50)] opacity-80 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100dvh-14rem)] max-w-4xl flex-col justify-center">
        <span className="section-kicker">404</span>
        <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--ink)] sm:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Ta strona nie istnieje.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-[var(--ink-2)] sm:text-lg">
          Link jest nieaktualny albo adres został wpisany ręcznie. Najszybciej wrócisz do oferty Getbuild z poniższych przycisków.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Wróć na stronę główną
          </Link>
          <Link href="/#kontakt" className="btn btn-ghost">
            Przejdź do kontaktu
          </Link>
        </div>
      </section>
    </main>
  )
}
