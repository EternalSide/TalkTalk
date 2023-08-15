import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
	title: 'Threads Auth',
	description: 'A next js app',
};
import { Inter } from 'next/font/google';

import '../globals.css';
const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<html lang='ru'>
				<body className={`${inter.className} bg-dark-1`}>{children}</body>
			</html>
		</ClerkProvider>
	);
};
export default RootLayout;
