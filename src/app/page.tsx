import Link from "next/link";
import { clsx } from "clsx";

const SUPPORTED_YEARS = [
  2019,
  2020,
  2021,
  2022,
]

export const metadata = {
  title: "Tax Calculator",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-lg min-h-screen mx-auto bg-white space-y-6 py-6 px-4">
        <h1 className="text-4xl">Tax calculator</h1>
        <section>
          <h2>Calculator form</h2>
          <Link
            className={clsx(
              "transition-colors inline-block px-2 py-1 rounded border border-gray-300",
              "bg-white hover:bg-blue-100"
            )}
            href={"form"}
          >
            Form
          </Link>
        </section>
        <section>
          <h2>Year calculators</h2>
          <nav>
            <menu className="flex flex-wrap gap-2">
              {SUPPORTED_YEARS.map((year) => (
                <li key={year}>
                  <Link
                    className={clsx(
                      "transition-colors block px-2 py-1 rounded border border-gray-300",
                      "bg-white hover:bg-blue-100"
                    )}
                    href={`/tax-calculator/${year}`}
                  >
                    {`${year} calculator`}
                  </Link>
                </li>
              ))}
            </menu>
          </nav>
        </section>
      </main>
    </div>
  );
}
