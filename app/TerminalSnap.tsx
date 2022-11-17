'use client';

import { FC, CSSProperties, MutableRefObject, useRef, useEffect, forwardRef, useState, KeyboardEvent, useId } from "react";
import { NextFont } from "@next/font/dist/types";
import Image from "next/image";
import prism from "prismjs";
import t from "./T.module.css";
import prismTheme from "./theme.module.scss";
import classNames from "classnames";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-http";
import "prismjs/components/prism-http";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-git";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-csv";

const useCopied = (timeout: number = 500): { copiead: boolean, copy: (payload: string) => void } => {
    const [logsCopied, setLogsCopied] = useState<NodeJS.Timeout[]>([]);

    const copy = (payload: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(payload);
            const timer = setTimeout(() => {
                setLogsCopied(timers => timers.filter(currentTimer => currentTimer !== timer));
            }, timeout);
            setLogsCopied(timers => [...timers, timer]);
        }
    }

    return {
        copiead: !!logsCopied.length,
        copy,
    }
}


interface Theme {
    box?: CSSProperties;
}

type Opts = {
    theme?: Theme;
    style?: CSSProperties;
    codeBlockRef: MutableRefObject<HTMLDivElement>;
    shadownStyle: string;
    tabTitle: string;
    imageExt: any;
    toclipboardCode: () => void;
    logsCopied: NodeJS.Timeout[];
    onChangeCode: (code: string) => void;
    code: string;
    language: string;
    font: NextFont;
}

export const TerminalSnap: FC<Opts> = ({
    code,
    theme,
    style,
    codeBlockRef,
    shadownStyle,
    tabTitle,
    imageExt,
    logsCopied,
    onChangeCode,
    language,
    font,
}) => {
    const { copiead, copy } = useCopied();
    const codeRef = useRef<HTMLPreElement>();

    return <div className="p-4" style={{ ...theme?.box, ...style }}>
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
                                        <Image alt="" src={imageExt} width={17}></Image>}
                                    {tabTitle}
                                </span>
                            </span>
                        </span>}
                    <span className="flex-auto"></span>
                    <span className="flex items-center relative">
                        <button onClick={() => copy(code)} className="border px-2 py-1 rounded text-gray-700 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
                            {!copiead ? "Copy" : "Copied 🎉"}
                        </button>
                    </span>
                </div>
                <div className={`${prismTheme.box} py-[25px] px-[21px]`}>
                    <ToggleEditCode language={language} code={code} className={`${font.className}`}></ToggleEditCode>
                </div>
            </div>
        </div>
    </div>;
};

const ToggleEditCode: FC<{ language: string, code: string, contentEditable?: boolean, className?: string }> = ({ className, language, code, contentEditable = false }) => {
    const id = useId();
    const fresh = useRef<number>(0);
    const [onEdition, setOnEdition] = useState<boolean>(contentEditable);

    const codeRef = useRef<HTMLPreElement>();

    useEffect(() => {
        if (codeRef.current) {
            // prism.highlightElement(codeRef.current, true)
            prism.highlightAll();
            console.log('render', codeRef.current);
        }
    }, [codeRef.current, code, language, onEdition, fresh.current])

    const save = () => {
        setOnEdition(false);
        fresh.current = fresh.current + 1;
    }

    const cancel = () => {
        setOnEdition(false);
    }

    const closeEdit = (event: KeyboardEvent<HTMLDivElement>) => {
        const key = event.key
        const metaKey = event.metaKey
        if (metaKey && key == "Enter") {
            save()
        }
    }

    if (onEdition) return <>
        <div onKeyDown={closeEdit} className={classNames(className, "whitespace-pre")} contentEditable={true}>{code}</div>
        <div className="flex gap-2 mt-4">
            <span className="flex-auto"></span>
            <button onClick={cancel} className="border px-4 py-2">Cancel</button>
            <button onClick={save} className="border px-4 py-2">Save</button>
        </div>
    </>

    return <pre key={fresh.current} ref={codeRef} className={classNames(className, `language-${language}`)}><code>{code}</code></pre>;
}
