/* eslint-disable @next/next/no-head-element */
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Beautiful Code Snippets</title>
      </head>
      <body>
        {children}

        <footer className="flex justify-center">
          <p className="text-gray-500">View project on <a href="https://github.com/JonDotsoy/beautiful-code-snippets"><strong>GitHub</strong></a></p>
        </footer>
      </body>
    </html>
  );
}
