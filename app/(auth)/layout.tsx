import {ClerkProvider} from "@clerk/nextjs";

export const metadata = {
	title: "TalkTalk - вход в аккаунт",
	description: "TalkTalk - вход в аккаунт",
};
import {Inter} from "next/font/google";

import "../globals.css";
import {ruRU} from "@clerk/localizations";
const inter = Inter({subsets: ["latin"]});

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<ClerkProvider localization={ruRU}>
			<html lang='ru'>
				<body
					className={`${inter.className} bg-dark-1 flex items-center min-h-[100vh] justify-center`}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
};
export default RootLayout;
