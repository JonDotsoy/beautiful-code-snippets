import { NextFont } from "@next/font/dist/types";
import localFont from "@next/font/local";

const firaCodeBold = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Bold.woff2" });
const firaCodeLight = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Light.woff2" });
const firaCodeMedium = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Medium.woff2" });
const firaCodeRegular = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-Regular.woff2" });
const firaCodeSemiBold = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-SemiBold.woff2" });
const firaCodeVF = localFont({ src: "../fonts/Fira_Code_v6.2/woff2/FiraCode-VF.woff2" });

export const fontDict: Record<FontKeys, NextFont> = {
    "FiraCode-Bold": firaCodeBold,
    "FiraCode-Light": firaCodeLight,
    "FiraCode-Medium": firaCodeMedium,
    "FiraCode-Regular": firaCodeRegular,
    "FiraCode-SemiBold": firaCodeSemiBold,
    "FiraCode-VF": firaCodeVF,
};

export enum FontKeys {
    FiraCodeBold = "FiraCode-Bold",
    FiraCodeLight = "FiraCode-Light",
    FiraCodeMedium = "FiraCode-Medium",
    FiraCodeRegular = "FiraCode-Regular",
    FiraCodeSemiBold = "FiraCode-SemiBold",
    FiraCodeVF = "FiraCode-VF",
}

export const selectFont = (fontKey: string): NextFont => fontDict[fontKey] ?? firaCodeLight;
