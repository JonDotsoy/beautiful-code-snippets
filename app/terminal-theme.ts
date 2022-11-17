export interface TerminalTheme {
}

const defaultTheme: TerminalTheme = {
}

export const themes: Record<string, TerminalTheme> = {
    default: defaultTheme,
}

export const selectTheme = (themeName: string): TerminalTheme => Object.entries(themes).find(([name, theme]) => themeName === name)?.[1] ?? defaultTheme;


