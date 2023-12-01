import {ClerkProvider, currentUser} from "@clerk/nextjs";
import {ruRU} from "@clerk/localizations";
import "../globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import {fetchUser} from "@/lib/actions/user.action";
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "TalkTalk",
	description: "Talk with TalkTalk",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUserfromClerk = await currentUser();
	const user = await fetchUser(currentUserfromClerk?.id!);

	// if (!user) redirect("/onboarding");

	// if (!currentUserfromClerk) redirect("/sign-in");

	// if (!user || !currentUserfromClerk) return null;

	return (
		<ClerkProvider localization={ruRU}>
			<html lang='ru'>
				<body className={inter.className}>
					<Topbar />
					<main className='flex'>
						<LeftSidebar username={user?.username} />
						<section className='main-container'>
							<div className='w-full max-w-4xl text-white'>{children}</div>
						</section>
						<RightSidebar />
					</main>
					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}
