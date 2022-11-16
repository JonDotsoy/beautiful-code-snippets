'use client';
import { useId, useState } from "react";
import { Code, FontKeys, Language } from "./code";

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
    const [fontKey, setFontKey] = useState(FontKeys.FiraCodeLight);
    const [language, setLanguage] = useState(Language.typescript);
    const [tabTitle, setTabTitle] = useState("app.ts");
    const [code, setCode] = useState<string | undefined>(defaultPayload);
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()

    return <>
        <form className="grid grid-cols-2 p-4">
            {/* <label htmlFor={id1}>Font Style</label>
            <select id={id1} onChange={t => setFontKey(t.currentTarget.value as any)} defaultValue={fontKey}>
                {Object.values(FontKeys).map(e => <option key={e}>{e}</option>)}
            </select> */}
            <label htmlFor={id2}>Tab Title</label>
            <input id={id2} type="text" onChange={t => setTabTitle(t.currentTarget.value)} defaultValue={tabTitle} className="border" />
            <label htmlFor={id3}>Language</label>
            <select id={id3} onChange={t => setLanguage(t.currentTarget.value as any)} defaultValue={language}>
                {Object.values(Language).map(e => <option key={e}>{e}</option>)}
            </select>
            <label htmlFor={id4}>Code</label>
            <textarea id={id4} onChange={t => setCode(t.currentTarget.value)} defaultValue={code} />
        </form>
        <hr />
        <Code fontKey={fontKey} tabTitle={tabTitle} language={language} code={code} onChangeCode={code => setCode(code)}></Code>
    </>
}