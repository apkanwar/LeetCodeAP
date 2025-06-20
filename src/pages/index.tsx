import Link from 'next/link';
import { useEffect, useState } from 'react';
import problems from '@/data/problems';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('date-desc');
  const [sortedProblems, setSortedProblems] = useState(problems);

  useEffect(() => {
    let filtered = problems.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    switch (sortType) {
      case 'alpha':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty':
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        filtered.sort(
          (a, b) =>
            order[a.difficulty as keyof typeof order] -
            order[b.difficulty as keyof typeof order]
        );
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
        break;
      case 'date-desc':
      default:
        filtered.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    }

    setSortedProblems(filtered);
  }, [query, sortType]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Completed LeetCode Problems</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search problems..."
          className="p-2 border rounded w-full bg-white"
          onChange={e => setQuery(e.target.value)}
        />
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="p-2 border rounded bg-white text-black ml-4"
        >
          <option value="alpha">Alphabetical (A-Z)</option>
          <option value="difficulty">Difficulty</option>
          <option value="date-desc">Date Completed (Newest)</option>
          <option value="date-asc">Date Completed (Oldest)</option>
        </select>
      </div>
      <table className="w-full border border-gray-300 text-white">
        <thead>
          <tr className="bg-[#151b23]">
            <th className="text-left p-2 border-b">Problem Name</th>
            <th className="text-left p-2 border-b">Difficulty</th>
            <th className="text-left p-2 border-b">Completed</th>
          </tr>
        </thead>
        <tbody>
          {sortedProblems.map(problem => (
            <tr key={problem.slug} className="bg-[#222831]">
              <td className="p-2 border-b">
                <Link href={`/problems/${problem.slug}`} className="text-blue-500 hover:underline">
                  {problem.title}
                </Link>
              </td>
              <td className="p-2 border-b">{problem.difficulty}</td>
              <td className="p-2 border-b">{formatDate(problem.completedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}