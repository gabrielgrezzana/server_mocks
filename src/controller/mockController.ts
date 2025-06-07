import { Request, Response } from "express";
import mockService from "../service/mockService";
import { ApiResponse, MockDefaultResponse, MockTestResponse } from "../types/server.types";

interface MockController {
    getDefault: (req: Request, res: Response) => void;
    getTest: (req: Request, res: Response) => void;
}

const mockController: MockController = {
    getDefault: (req: Request, res: Response): void => {       
        try{
            const data: MockDefaultResponse = mockService.getDefaultData();
            const response: ApiResponse<MockDefaultResponse> = {
                data,
                timestamp: new Date().toISOString(),
            };
            res.json(response);        
        }catch (error) {
            const errorMessage = (error as Error).message;
            const errorResponse: ApiResponse = {
                error: errorMessage,
                timestamp: new Date().toISOString(),
            };
            res.status(500).json(errorResponse);
        }
    },

    getTest: (req: Request,res: Response): void => {
        try{            
            const data: MockTestResponse = mockService.generateTestData();            
            const response: ApiResponse<MockTestResponse> = {
                data,        
                timestamp: new Date().toISOString(),         
            };
            res.json(response);
        } catch(error){
            const errorMessage = (error as Error).message;
            const errorResponse: ApiResponse = {
                error: errorMessage,
                timestamp: new Date().toISOString(),
            };
            res.status(500).json(errorResponse);
        }
    },
}


export default mockController;