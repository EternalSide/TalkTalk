import mongoose from 'mongoose';

let isConnected = false;

export const connectTODB = async (): Promise<void> => {
	mongoose.set('strictQuery', true);
	if (!process.env.MONGODB_URL) {
		console.log('Mongodb url not found');
	}

	if (isConnected) {
		console.log('Already connected');
	}
	try {
		await mongoose.connect(process.env.MONGODB_URL!);

		isConnected = true;
		console.log('connected to mongodb');
	} catch (error) {
		console.log(error);
	}
};
