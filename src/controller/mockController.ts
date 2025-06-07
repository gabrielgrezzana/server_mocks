import { Request, Response } from "express";
import mockService from "../service/mockService";
import { ApiResponse, MockDefaultResponse, MockTestResponse, RandomDataResponse, RigListResponse } from "../types/server.types";
import { mock } from "node:test";

interface MockController {
    getDefault: (req: Request, res: Response) => void;
    getTest: (req: Request, res: Response) => void;
    getrandomData: (req: Request, res: Response) => void;
    getRigs: (req: Request, res: Response) => void;
    getRandomRig: (req: Request, res: Response) => void;
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
    getrandomData: (req: Request, res: Response): void => {
        try{
            const data: RandomDataResponse = mockService.generateRandomData();
            const response : ApiResponse<RandomDataResponse> = {
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
    getRigs: (req: Request, res: Response): void => {
        try {
          const count = parseInt(req.query.count as string) || 50;
          const maxCount = 1000; // Limite para não quebrar o navegador
          
          const finalCount = Math.min(count, maxCount);
          const data: RigListResponse = mockService.generateMultipleRigs(finalCount);
          
          res.json(data);
        } catch (error) {
          const errorMessage = (error as Error).message;
          const errorResponse: ApiResponse = {
            error: errorMessage,
            timestamp: new Date().toISOString()
          };
          res.status(500).json(errorResponse);
        }
      }, getRandomRig: (req: Request, res: Response): void => {
        try {
          const data = mockService.generateRandomData();
          res.json(data);
        } catch (error) {
          const errorMessage = (error as Error).message;
          const errorResponse: ApiResponse = {
            error: errorMessage,
            timestamp: new Date().toISOString()
          };
          res.status(500).json(errorResponse);
        }
      }
}


export default mockController;