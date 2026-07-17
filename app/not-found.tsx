import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#02040A] px-6 py-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100dvh-14rem)] max-w-4xl flex-col justify-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">404</p>
        <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl">
          Ta strona nie istnieje.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
          Link jest nieaktualny albo adres został wpisany ręcznie. Najszybciej wrócisz do oferty Getbuild z poniższych przycisków.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#041018] transition duration-200 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 active:scale-[0.98]"
          >
            Wróć na stronę główną
          </Link>
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 active:scale-[0.98]"
          >
            Przejdź do kontaktu
          </Link>
        </div>
      </section>
    </main>
  )
}
