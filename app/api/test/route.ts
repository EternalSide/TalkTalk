import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		return NextResponse.json('all good');
	} catch (error) {
		console.log(error);
	}
}
