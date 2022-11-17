import Prism from "prismjs"
import { useMemo, FC, useRef, useState, CSSProperties } from "react";
// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { NextFont } from "@next/font/dist/types";
import * as htmlToImage from "html-to-image";
import { inspect } from "util";
import { TerminalSnap } from "./TerminalSnap";
import { fontDict, FontKeys, selectFont } from "./fonts";
import { iconExtends, selectExtend } from "./selectExtend";
import { useActionableAnimation } from "./useActionableAnimation";
import classNames from "classnames";

type Fn = () => void

const useToggle = (defaultToggled: boolean = false): { toggled: boolean, toggle: Fn, open: Fn, close: Fn } => {
    const [toggled, setToggled] = useState(defaultToggled);

    const toggle: Fn = () => setToggled(b => !b)
    const open: Fn = () => setToggled(true)
    const close: Fn = () => setToggled(false)

    return {
        toggled
        , toggle
        , open
        , close
    }
}

const languageDict: Record<Language, Prism.Grammar> = {
    "javascript": Prism.languages.javascript,
    "typescript": Prism.languages.typescript,
    "rust": Prism.languages.rust,
    "http": Prism.languages.http,
    "json": Prism.languages.json,
    "json5": Prism.languages.json5,
    "git": Prism.languages.git,
    "bash": Prism.languages.bash,
    "csv": Prism.languages.csv,
}

export enum Language {
    javascript = "javascript",
    typescript = "typescript",
    rust = "rust",
    http = "http",
    json = "json",
    json5 = "json5",
    git = "git",
    bash = "bash",
    csv = "csv",
}

export const extensionLanguage: Record<string, Language> = {
    '.ts': Language.typescript,
    '.tsx': Language.typescript,
    '.js': Language.javascript,
    '.jsx': Language.javascript,
    '.sh': Language.bash,
    '.bash': Language.bash,
    '.zsh': Language.bash,
    '.fish': Language.bash,
    '.rs': Language.rust,
}

export const inferLanguageByFilename = (filename: string): Language => Object.entries(extensionLanguage).find(([pat, lang]) => filename.endsWith(pat))?.[1];

const selectLanguage = (languageKey: string): Prism.Grammar => languageDict[languageKey] ?? Prism.languages.typescript

interface Theme {
    '--accent-bg': string
    '--control-btn-1': string
    '--control-btn-2': string
    '--control-btn-3': string
    '--shadown-style': string
}

export const Code: FC<{ shadownStyle?: string, fontKey?: string, tabTitle?: string, language?: string, code?: string, onChangeCode?: ((code: string) => void), useAccent?: boolean }> = ({ tabTitle, code = `const a:string = "1234"`, fontKey = FontKeys.FiraCodeMedium, language = Language.typescript, onChangeCode, useAccent = false, shadownStyle = "rgb(38, 57, 77) 0px 20px 30px -10px" }) => {
    const { actived: captured, action: capture } = useActionableAnimation();
    const stateMenuTheme = useToggle(false);

    const codeBlockRef = useRef<HTMLDivElement>();
    const codeContentRef = useRef<HTMLDivElement>();
    const font = selectFont(fontKey);
    const [clicks, setClicks] = useState<number[]>([]);
    const [logsCopied, setLogsCopied] = useState<NodeJS.Timeout[]>([]);
    const htmlOutput = useMemo(() => Prism.highlight(code, selectLanguage(language), language), [code, language]);
    const imageExt = useMemo(() => selectExtend(tabTitle), [tabTitle]);

    const snap = async () => {
        if (codeBlockRef.current) {
            const blob = await htmlToImage.toBlob(codeBlockRef.current, { pixelRatio: 3 });
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            console.log("ok");
            capture()
        }
    }

    const toclipboardCode = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
            const timeout = setTimeout(() => {
                setLogsCopied(e => e.filter(a => a !== timeout));
            }, 250);
            setLogsCopied(e => [...e, timeout]);
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
        <div className="p-4 flex items-center gap-2 justify-center">
            <button onClick={snap} className="px-4 py-2 border rounded">{captured ? 'Copied on clipboard 🎉' : '📸 Guardar'}</button>
            <button onClick={stateMenuTheme.toggle} className="px-4 py-2 border rounded">Theme</button>
        </div>

        <div className={classNames("overflow-x-hidden overflow-auto transition-all", stateMenuTheme.toggled ? 'h-fit scale-100' : 'h-0 scale-0')}>
            <div className="rounded-lg border-4 border-blue-300">
                <div className="border-b p-[17px] flex">
                    <h3 className="text-lg">Themes</h3>
                    <span className="flex-auto"></span>
                    <button className="border px-4 rounded-md" onClick={stateMenuTheme.close}>Cerrar</button>
                </div>
                <div className="flex gap-2 p-4 max-h-[600px] overflow-auto">
                    {new Array(40).fill(0).map((_, i) =>
                        <div key={i} className="rounded-lg border-2 hover:scale-110 bg-white transition-all z-0 hover:z-10">
                            <TerminalSnap
                                style={style}
                                codeBlockRef={codeBlockRef}
                                shadownStyle={shadownStyle}
                                tabTitle={'script.js'}
                                imageExt={iconExtends['.ts']}
                                toclipboardCode={toclipboardCode}
                                logsCopied={logsCopied}
                                onChangeCode={onChangeCode}
                                code={'// your code here'}
                                language={'javascript'}
                                font={font}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="flex overflow-auto">
            <span className="flex-auto"></span>
            <TerminalSnap
                style={style}
                codeBlockRef={codeBlockRef}
                shadownStyle={shadownStyle}
                tabTitle={tabTitle}
                imageExt={imageExt}
                toclipboardCode={toclipboardCode}
                logsCopied={logsCopied}
                onChangeCode={onChangeCode}
                code={code}
                language={language}
                font={font}
            />
            <span className="flex-auto"></span>
        </div>
    </>
}


