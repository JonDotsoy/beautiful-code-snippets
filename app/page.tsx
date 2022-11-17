'use client';

import { FC, FormEvent, useId, useState } from "react";
import { Code, inferLanguageByFilename, Language } from "./code";
import GithubSVG from "../assets/logos/github-2.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const filenameQuery = searchParams.get("f") ?? searchParams.get("filename") ?? 'app.ts';
    const payloadQuery = searchParams.get("p") ?? searchParams.get("payload") ?? defaultPayload;
    const languageQuery = searchParams.get("l") ?? searchParams.get("language") ?? inferLanguageByFilename(filenameQuery);
    const accentQuery = searchParams.get("a") ?? searchParams.get("accent") ?? "false";

    const useAccent = ["1", "true", "on"].includes(accentQuery);

    const [fontKey, setFontKey] = useState(FontKeys.FiraCodeVF);
    const [language, setLanguage] = useState(languageQuery);
    const [tabTitle, setTabTitle] = useState(filenameQuery);
    const [code, setCode] = useState<string | undefined>(payloadQuery);
    const [shadownStyle, setShadownStyle] = useState<string>(shadowStyles.at(0) ?? 'rgb(38, 57, 77) 0px 20px 30px -10px');
    // const [useAccent, setUseAccent] = useState<boolean>(false);
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()
    const id5 = useId()
    const id6 = useId()

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        // console.log(Array.from(formData.entries()))

        const searchParams = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            searchParams.set(key, value.toString());
        }

        router.push(`?${searchParams.toString()}`);
    }

    return <>
        <Code fontKey={fontKey} tabTitle={tabTitle} language={language} code={code} onChangeCode={code => setCode(code)} useAccent={useAccent} shadownStyle={shadownStyle}></Code>

        <section className="m-auto max-w-4xl pb-8 text-gray-500">
            <h2 className="text-center font-bold text-3xl pb-4">API</h2>
            {/* <p>Use the query params <code>payload</code> to change body</p> */}

            <form onSubmit={submit} className="border bg-white p-[17px] rounded-md shadow-md max-w-md mx-auto my-8 flex flex-col gap-4">
                <FieldText name="filename" label="Filename" defaultValue={tabTitle}></FieldText>
                <FieldText name="payload" label="Payload" defaultValue={code} multiline></FieldText>
                <FieldCheckbox name="accent" label="Accent" defaultChecked={useAccent} />
                <div className="px-[17px] justify-center flex">
                    <button itemType="submit" className="border rounded-md px-4 py-2">Update</button>
                </div>
            </form>
        </section>
    </>
}

const FieldText: FC<{ name?: string, label?: string, defaultValue?: string, multiline?: boolean }> = ({ name, label, defaultValue, multiline }) => {
    const fieldId = useId()
    return <div>
        <label htmlFor={fieldId} className="block px-4 font-bold">{label}</label>
        {multiline
            ?
            <textarea id={fieldId} rows={10} name={name} className="block border w-full px-4 py-2" defaultValue={defaultValue} />
            :
            <input id={fieldId} type="text" name={name} className="block border w-full px-4 py-2" defaultValue={defaultValue} />
        }
    </div>;
}

const FieldCheckbox: FC<{ name?: string, label?: string, defaultChecked?: boolean }> = ({ name, label, defaultChecked }) => {
    const fieldId = useId()
    return <div className="flex px-[17px]">
        <input id={fieldId} name={name} type={"checkbox"} defaultChecked={defaultChecked} />
        <label htmlFor={fieldId} className="block px-4 font-bold">{label}</label>
    </div>;
}
