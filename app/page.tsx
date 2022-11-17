'use client';

import { useId, useState } from "react";
import { Code, inferLanguageByFilename, Language } from "./code";
import GithubSVG from "../assets/logos/github-2.svg";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { FontKeys } from "./fonts";

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
    const searchParams = useSearchParams();
    const filenameQuery = searchParams.get("f") ?? searchParams.get("filename") ?? 'app.ts';
    const payloadQuery = searchParams.get("p") ?? searchParams.get("payload") ?? defaultPayload;
    const languageQuery = searchParams.get("l") ?? searchParams.get("language") ?? inferLanguageByFilename(filenameQuery);

    const [fontKey, setFontKey] = useState(FontKeys.FiraCodeVF);
    const [language, setLanguage] = useState(languageQuery);
    const [tabTitle, setTabTitle] = useState(filenameQuery);
    const [code, setCode] = useState<string | undefined>(payloadQuery);
    const [shadownStyle, setShadownStyle] = useState<string>(shadowStyles.at(0) ?? 'rgb(38, 57, 77) 0px 20px 30px -10px');
    const [useAccent, setUseAccent] = useState<boolean>(false);
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()
    const id5 = useId()
    const id6 = useId()

    globalThis.g = searchParams;

    return <>
        <Code fontKey={fontKey} tabTitle={tabTitle} language={language} code={code} onChangeCode={code => setCode(code)} useAccent={useAccent} shadownStyle={shadownStyle}></Code>
    </>
}