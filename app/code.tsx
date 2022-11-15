import Prism from "prismjs"
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-http";
import "prismjs/components/prism-http";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-git";
import { useMemo, use, FC, useId, useRef, useState } from "react";
import "prismjs/themes/prism.css";
import { NextFont } from "@next/font/dist/types";
import localFont from "@next/font/local";
import html2canvas from "html2canvas";

const firaCodeBold = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Bold.woff2" });
const firaCodeLight = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Light.woff2" });
const firaCodeMedium = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Medium.woff2" });
const firaCodeRegular = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Regular.woff2" });
const firaCodeSemiBold = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-SemiBold.woff2" });
const firaCodeVF = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-VF.woff2" });

const fontDict: Record<FontKeys, NextFont> = {
    "FiraCode-Bold": firaCodeBold,
    "FiraCode-Light": firaCodeLight,
    "FiraCode-Medium": firaCodeMedium,
    "FiraCode-Regular": firaCodeRegular,
    "FiraCode-SemiBold": firaCodeSemiBold,
    "FiraCode-VF": firaCodeVF,
};

const languageDict: Record<Language, Prism.Grammar> = {
    "javascript": Prism.languages.javascript,
    "typescript": Prism.languages.typescript,
    "rust": Prism.languages.rust,
    "http": Prism.languages.http,
    "json": Prism.languages.json,
    "json5": Prism.languages.json5,
    "git": Prism.languages.git,
}

export enum FontKeys {
    FiraCodeBold = "FiraCode-Bold",
    FiraCodeLight = "FiraCode-Light",
    FiraCodeMedium = "FiraCode-Medium",
    FiraCodeRegular = "FiraCode-Regular",
    FiraCodeSemiBold = "FiraCode-SemiBold",
    FiraCodeVF = "FiraCode-VF",
}

export enum Language {
    javascript = "javascript",
    typescript = "typescript",
    rust = "rust",
    http = "http",
    json = "json",
    json5 = "json5",
    git = "git",
}

const selectFont = (fontKey: string): NextFont => fontDict[fontKey] ?? firaCodeMedium
const selectLanguage = (languageKey: string): Prism.Grammar => languageDict[languageKey] ?? Prism.languages.typescript

export const Code: FC<{ fontKey?: string, tabTitle?: string, language?: string, code?: string }> = ({ tabTitle, code = `const a:string = "1234"`, fontKey = FontKeys.FiraCodeMedium, language = Language.typescript }) => {
    const codeBlockRef = useRef<HTMLDivElement>();
    const font = selectFont(fontKey);
    const [clicks, setClicks] = useState<number[]>([]);
    const htmlOutput = useMemo(() => Prism.highlight(code, selectLanguage(language), language), [code, language]);

    const span = async () => {
        if (codeBlockRef.current) {
            const canvas = await html2canvas(codeBlockRef.current);
            const blob = await new Promise<Blob>(resolve => canvas.toBlob(resolve, "png"));
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            console.log("ok");
            const t = Date.now();
            setClicks(e => [...e, t]);
            setTimeout(() => {
                setClicks(e => e.filter(e => e !== t));
            }, 250);
        }
    }

    return <>
        <div className="p-4 flex items-center gap-2">
            <button onClick={span} className="px-4 py-2 border rounded">📸 Guardar</button>
            {clicks.map(e => <span key={e}>✅</span>)}
        </div>
        <div className="p-4">
            <div ref={codeBlockRef} className="bg-white border border-solid border-gray-200 rounded-lg text-[27px] inline-block">
                <div className="bg-[#F0F0F0] rounded-t-lg">
                    <span aria-hidden className="flex justify-start items-center">
                        <span className="flex gap-2 px-4 min-h-[50px] items-center">
                            <span className="block w-[27px] h-[27px] rounded-full border-[4px] border-[#B5B5B5]"></span>
                            <span className="block w-[27px] h-[27px] rounded-full border-[4px] border-[#B5B5B5]"></span>
                            <span className="block w-[27px] h-[27px] rounded-full border-[4px] border-[#B5B5B5]"></span>
                        </span>
                        {tabTitle &&
                            <span className="bg-white text-gray-500 px-10 min-h-[50px] flex items-center"><span>{tabTitle}</span></span>
                        }
                    </span>
                </div>
                <div className="p-5">
                    <code>
                        <pre className={`${font.className} whitespace-pre`} dangerouslySetInnerHTML={{ __html: htmlOutput }}></pre>
                    </code>
                </div>
            </div>
        </div>
    </>
}