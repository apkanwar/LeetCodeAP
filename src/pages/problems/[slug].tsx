import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';

export default function ProblemPage() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeLoading, setCodeLoading] = useState(true);
    const [executionTime, setExecutionTime] = useState<number | null>(null);

    const slug = useMemo(() => {
        const querySlug = router.query.slug;
        return Array.isArray(querySlug) ? querySlug[0] : querySlug;
    }, [router.query.slug]);

    useEffect(() => {
        if (!router.isReady || !slug) return;
        setCodeLoading(true);
        fetch(`/api/run/${slug}`)
            .then(res => res.json())
            .then(data => {
                setCode(data.code || '// Code not found');
                setResult(''); // clear output
                setExecutionTime(null);
                setCodeLoading(false);
            });
    }, [router.isReady, slug]);

    const handleRunCode = async () => {
        if (!slug) return;
        setLoading(true);
        const start = performance.now();
        const res = await fetch(`/api/run/${slug}`);
        const data = await res.json();
        const end = performance.now();
        setExecutionTime(end - start);
        setResult(data.output || '');
        setCode(data.code || '');
        setLoading(false);
    };

    if (!router.isReady || !slug) return null;

    return (
        <div className="flex flex-col h-screen bg-[#1C1D22]">
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-gray-200 px-6 py-3 shadow">
                <a href="/" className="text-blue-600 font-semibold hover:underline">Home</a>
                <div className="flex items-center space-x-4">
                    {executionTime !== null && (
                        <div className="bg-green-200 text-green-800 px-3 py-1 rounded">
                            Time: {executionTime.toFixed(2)} ms
                        </div>
                    )}
                    <button
                        onClick={handleRunCode}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? 'Running...' : 'Run Code'}
                    </button>
                </div>
            </div>

            {/* Code & Output */}
            <div className="grid grid-cols-2 gap-4 p-6 flex-1 overflow-hidden">
                <div className="flex flex-col overflow-auto">
                    <h2 className="text-xl font-semibold mb-2 p-1 rounded-md bg-gray-100">Code</h2>
                    <pre className="bg-gray-100 p-4 rounded-md flex-1 overflow-auto">
                        {codeLoading ? (
                            <div className="flex justify-center h-full">
                              <CircularProgress />
                            </div>
                        ) : (
                            <code dangerouslySetInnerHTML={{
                                __html: code.replace(/(\/\/.*?$)/gm, '<span class="text-green-600">$1</span>')
                            }} />
                        )}
                    </pre>
                </div>
                <div className="flex flex-col overflow-auto">
                    <h2 className="text-xl font-semibold mb-2 p-1 rounded-md bg-gray-100">Output</h2>
                    <div className="bg-gray-100 p-4 rounded-md flex-1 overflow-auto whitespace-pre-wrap">
                        {loading ? (
                          <div className="flex justify-center h-full">
                            <CircularProgress color='success' />
                          </div>
                        ) : result}
                    </div>
                </div>
            </div>
        </div>
    );
}