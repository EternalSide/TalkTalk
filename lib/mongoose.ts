import mongoose from 'mongoose';

let isConnected = false;

export const connectTODB = async (): Promise<void> => {
	mongoose.set('strictQuery', true);
	if (!process.env.MONGODB_URL) {
		console.log('Mongodb url not found');
	}

	if (isConnected) {
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URL!);

		isConnected = true;
	} catch (error) {
		console.log(error);
	}
};
