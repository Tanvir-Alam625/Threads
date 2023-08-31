import { Html, Head, Main, NextScript } from "next/document";


function MyDocument() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/logo.png" />
                <meta name="theme-color" content="#877EFF" />
                <meta
                    name="description"
                    content="Welcome to the Social Media Thread Application! This full-stack application is built using Next.js, TypeScript, MongoDB, and Mongoose. It provides a platform for users to engage in discussions, share ideas, and connect with communities. Below, you'll find an overview of the application's features, how to set up the project, and how to navigate through its various functionalities."
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;