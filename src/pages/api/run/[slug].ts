import { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const slug = req.query.slug as string;
    const filePath = path.resolve(process.cwd(), 'src/problems', `${slug}.ts`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Problem file not found.' });
    }

    try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const output = execSync(`npx ts-node ${filePath}`, { encoding: 'utf-8' });
        res.status(200).json({ code, output });
    } catch (err: any) {
        console.error('[API ERROR]', err);
        res.status(500).json({ code: '', output: err.message });
    }
}