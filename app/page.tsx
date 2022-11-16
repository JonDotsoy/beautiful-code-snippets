'use client';
import { useId, useState } from "react";
import { Code, FontKeys, Language } from "./code";
import GithubSVG from "../assets/logos/github-2.svg";
import Image from "next/image";

const shadowStyles = [
    'rgb(38, 57, 77) 0px 20px 30px -10px',
    'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;',
] as const;

const defaultPayload = `import express, { Express, Request, Response } from 'express'
const app: Express = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`)
})`

export default function () {
    const [fontKey, setFontKey] = useState(FontKeys.FiraCodeVF);
    const [language, setLanguage] = useState(Language.typescript);
    const [tabTitle, setTabTitle] = useState("app.ts");
    const [code, setCode] = useState<string | undefined>(defaultPayload);
    const [shadownStyle, setShadownStyle] = useState<string>(shadowStyles.at(0) ?? 'rgb(38, 57, 77) 0px 20px 30px -10px');
    const [useAccent, setUseAccent] = useState<boolean>(false);
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()
    const id5 = useId()
    const id6 = useId()

    return <>
        <form className="grid grid-cols-2 p-4">
            {/* <label htmlFor={id1}>Font Style</label>
            <select id={id1} onChange={t => setFontKey(t.currentTarget.value as any)} defaultValue={fontKey}>
                {Object.values(FontKeys).map(e => <option key={e}>{e}</option>)}
            </select> */}
            <label htmlFor={id5}>Tab Accent</label>
            <input id={id5} type={"checkbox"} onChange={t => setUseAccent(t.currentTarget.checked)} />
            <label htmlFor={id2}>Tab Title</label>
            <input id={id2} type="text" onChange={t => setTabTitle(t.currentTarget.value)} defaultValue={tabTitle} className="border" />
            <label htmlFor={id3}>Language</label>
            <select id={id3} onChange={t => setLanguage(t.currentTarget.value as any)} defaultValue={language}>
                {Object.values(Language).map(e => <option key={e}>{e}</option>)}
            </select>
            {/* <label htmlFor={id6}>Shadown</label>
            <select id={id6} onChange={t => setShadownStyle(t.currentTarget.value as any)} defaultValue={shadownStyle}>
                {Array.from(shadowStyles).map(e => <option key={e}>{e}</option>)}
            </select> */}
            <label htmlFor={id4}>Code</label>
            <textarea id={id4} onChange={t => setCode(t.currentTarget.value)} defaultValue={code} />
        </form>
        <hr />
        <Code fontKey={fontKey} tabTitle={tabTitle} language={language} code={code} onChangeCode={code => setCode(code)} useAccent={useAccent} shadownStyle={shadownStyle}></Code>

        <footer>
            <p>View project on <a href="https://github.com/JonDotsoy/beautiful-code-snippets"><strong>GitHub</strong></a></p>
        </footer>
    </>
}