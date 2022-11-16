import Prism from "prismjs"
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-http";
import "prismjs/components/prism-http";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-git";
import { useMemo, FC, useRef, useState, CSSProperties } from "react";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { NextFont } from "@next/font/dist/types";
import localFont from "@next/font/local";
import * as htmlToImage from "html-to-image";
import Image from "next/image";


import ApolloGraphqlCompactSVG from "../assets/logos/apollo-graphql-compact.svg";
import CssSVG from "../assets/logos/css.svg";
import GraphqlSVG from "../assets/logos/graphql.svg";
import HtmlSVG from "../assets/logos/html.svg";
import JavaSVG from "../assets/logos/java.svg";
import JavascriptSVG from "../assets/logos/javascript.svg";
import MongodbSVG from "../assets/logos/mongodb.svg";
import PhpSVG from "../assets/logos/php.svg";
import PrismaSVG from "../assets/logos/prisma.svg";
import PythonSVG from "../assets/logos/python.svg";
import ReactSVG from "../assets/logos/react.svg";
import RubySVG from "../assets/logos/ruby.svg";
import RustSVG from "../assets/logos/rust.svg";
import SvgSVG from "../assets/logos/svg.svg";
import SwiftSVG from "../assets/logos/swift.svg";
import TailwindcssSVG from "../assets/logos/tailwindcss.svg";
import TypescriptSVG from "../assets/logos/typescript.svg";
import { inspect } from "util";


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

export const iconExtends: Record<string, any> = {
    ApolloGraphqlCompactSVG: ApolloGraphqlCompactSVG,
    '.css': CssSVG,
    '.graphql': GraphqlSVG,
    '.graphqls': GraphqlSVG,
    '.gql': GraphqlSVG,
    '.html': HtmlSVG,
    '.java': JavaSVG,
    '.js': JavascriptSVG,
    '.mongodb': MongodbSVG,
    '.php': PhpSVG,
    '.prisma': PrismaSVG,
    '.py': PythonSVG,
    '.jsx': ReactSVG,
    '.tsx': ReactSVG,
    '.rb': RubySVG,
    '.rs': RustSVG,
    '.svg': SvgSVG,
    '.swift': SwiftSVG,
    'tailwind.config.js': TailwindcssSVG,
    '.ts': TypescriptSVG,
}

const selectExtend = (pat: string): any => Object.entries(iconExtends).find(([match]) => pat.endsWith(match))?.[1];

const selectFont = (fontKey: string): NextFont => fontDict[fontKey] ?? firaCodeLight
const selectLanguage = (languageKey: string): Prism.Grammar => languageDict[languageKey] ?? Prism.languages.typescript

interface Theme {
    '--accent-bg': string
    '--control-btn-1': string
    '--control-btn-2': string
    '--control-btn-3': string
    '--shadown-style': string
}

export const Code: FC<{ shadownStyle?: string, fontKey?: string, tabTitle?: string, language?: string, code?: string, onChangeCode?: ((code: string) => void), useAccent?: boolean }> = ({ tabTitle, code = `const a:string = "1234"`, fontKey = FontKeys.FiraCodeMedium, language = Language.typescript, onChangeCode, useAccent = false, shadownStyle = "rgb(38, 57, 77) 0px 20px 30px -10px" }) => {
    const codeBlockRef = useRef<HTMLDivElement>();
    const codeContentRef = useRef<HTMLDivElement>();
    const font = selectFont(fontKey);
    const [clicks, setClicks] = useState<number[]>([]);
    const htmlOutput = useMemo(() => Prism.highlight(code, selectLanguage(language), language), [code, language]);
    const imageExt = useMemo(() => selectExtend(tabTitle), [tabTitle]);

    const snap = async () => {
        if (codeBlockRef.current) {
            const blob = await htmlToImage.toBlob(codeBlockRef.current, { pixelRatio: 3 });
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            console.log("ok");
            const t = Date.now();
            setClicks(e => [...e, t]);
            setTimeout(() => {
                setClicks(e => e.filter(e => e !== t));
            }, 250);
        }
    }

    const theme: Theme = {
        "--shadown-style": shadownStyle,
        "--accent-bg": useAccent ? '#f2f2f2' : 'white',
        "--control-btn-1": '#ff5f57',
        "--control-btn-2": '#febc2e',
        "--control-btn-3": '#28c840',
    };

    const style = theme as CSSProperties;

    return <>
        <div className="p-4 flex items-center gap-2">
            <button onClick={snap} className="px-4 py-2 border rounded">📸 Guardar</button>
            {clicks.map(e => <span key={e}>✅</span>)}
        </div>
        <div className="p-4" style={style}>
            <div ref={codeBlockRef} className="p-[35px] overflow-hidden inline-block bg-transparent">
                <div className="bg-white border-gray-200 rounded-lg text-[14px] inline-block overflow-hidden" style={{
                    boxShadow: shadownStyle
                }}>
                    <div className="bg-[var(--accent-bg)] px-[16px] h-[45px] flex gap-[16px]">
                        <span className="flex gap-2 items-center">
                            <span className="block w-[13px] h-[13px] rounded-full bg-[var(--control-btn-1)]"></span>
                            <span className="block w-[13px] h-[13px] rounded-full bg-[var(--control-btn-2)]"></span>
                            <span className="block w-[13px] h-[13px] rounded-full bg-[var(--control-btn-3)]"></span>
                        </span>
                        {tabTitle &&
                            <span className="pt-1 rounded-t-lg flex">
                                <span className="bg-white text-[#000000cc] px-[17px] flex items-center rounded-t-lg relative">
                                    <span className="absolute bottom-0 -left-[12px] h-[12px] w-[12px] bg-white shadown shadow-black"></span>
                                    <span className="absolute bottom-0 -left-[12px] h-[12px] w-[12px] bg-[var(--accent-bg)] rounded-br-lg shadown shadow-black"></span>
                                    <span className="absolute bottom-0 -right-[12px] h-[12px] w-[12px] bg-white"></span>
                                    <span className="absolute bottom-0 -right-[12px] h-[12px] w-[12px] bg-[var(--accent-bg)] rounded-bl-lg"></span>
                                    <span className="flex gap-[8px]">
                                        {imageExt &&
                                            <Image alt="" src={imageExt} width={17} ></Image>
                                        }
                                        {tabTitle}
                                    </span>
                                </span>
                            </span>
                        }
                    </div>
                    <div className="py-[25px] px-[21px]">
                        <span onInput={t => onChangeCode?.(t.currentTarget.innerText)} className={`${font.className} whitespace-pre line-numbers`}>
                            <span className={`${font.className} whitespace-pre`} dangerouslySetInnerHTML={{ __html: htmlOutput }}></span>
                        </span>
                    </div>
                </div>
            </div>
            {/* <div x-snap-me="true" className="p-[8px] overflow-hidden inline-block bg-black">
                <div className="bg-white border shadow-white shadow-md border-solid border-gray-800 rounded-lg text-[27px] inline-block">
                    <div className="bg-[#242424] rounded-t-lg">
                        <span aria-hidden className="flex justify-start items-center">
                            <span className="flex gap-2 px-4 min-h-[50px] items-center">
                                <span className="block w-[20px] h-[20px] rounded-full border-[2px] border-[#774343]"></span>
                                <span className="block w-[20px] h-[20px] rounded-full border-[2px] border-[#B5B5B5]"></span>
                                <span className="block w-[20px] h-[20px] rounded-full border-[2px] border-[#B5B5B5]"></span>
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
            </div> */}
            {/* <Image alt="Demo" src={demo} width={589}></Image> */}
        </div>
    </>
}