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
import TerminalSVG from "../assets/logos/terminal-1.svg";


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
    '.sh': TerminalSVG,
    '.bash': TerminalSVG,
    '.zsh': TerminalSVG,
    '.fish': TerminalSVG,
};
export const selectExtend = (pat: string): any => Object.entries(iconExtends).find(([match]) => pat.endsWith(match))?.[1];
