import Prism from "prismjs"
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import { useMemo, use, FC } from "react";
import "prismjs/themes/prism.css";
import { NextFont } from "@next/font/dist/types";
import localFont from "@next/font/local";

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
    "Javascript": Prism.languages.javascript,
    "Typescript": Prism.languages.typescript,
    "Rust": Prism.languages.rust,
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
    Javascript = "Javascript",
    Typescript = "Typescript",
    Rust = "Rust",
}

const selectFont = (fontKey: string): NextFont => fontDict[fontKey] ?? firaCodeMedium
const selectLanguage = (languageKey: string): Prism.Grammar => languageDict[languageKey] ?? Prism.languages.typescript

export const Code: FC<{ fontKey?: string, tabTitle?: string, language?: string, code?: string }> = ({ tabTitle, code = `const a:string = "1234"`, fontKey = FontKeys.FiraCodeMedium, language = Language.Typescript }) => {
    const font = selectFont(fontKey);
    const htmlOutput = useMemo(() => Prism.highlight(code, selectLanguage(language), language), [code, language]);

    return <>
        <div className="p-4">
            <div className="bg-white border border-solid border-gray-200 rounded-lg text-[27px] inline-block">
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