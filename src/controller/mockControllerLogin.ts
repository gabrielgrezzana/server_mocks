import { Request, Response } from 'express';

interface MockControllerLogin {
	postLogin: (req: Request, res: Response) => void;
}

const mockControllerLogin: MockControllerLogin = {
	postLogin: (req: Request, res: Response): void => {
		try {
			const { username, password } = req.body;
			if (!username || !password) {
				res.status(400).json({ error: 'Username and password are required' });
				return;
			} else {
				res.status(200).json({ message: 'Login successful' });
				return;
			}
			// const user = mockService.getUser(username, password);
			// if(!user){
			// 	return res.status(401).json({ error: "Invalid username or password" });
			// }
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	},
};

export default mockControllerLogin;
