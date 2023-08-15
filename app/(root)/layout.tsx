import { ClerkProvider } from '@clerk/nextjs';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Bottombar from '@/components/shared/Bottombar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Threads',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='ru'>
				<body className={inter.className}>
					<Topbar />
					<main>
						<LeftSidebar />
						<section className='main-cointaner'>
							<div className='w-full max-w-4xl'></div>
						</section>
						<RightSidebar />
					</main>
					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}