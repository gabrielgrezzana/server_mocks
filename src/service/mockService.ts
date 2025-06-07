import { randomUUID } from "crypto";
import { MockDefaultResponse, MockTestResponse, TestData } from "../types/server.types";

interface MockService {
    getDefaultData: () => MockDefaultResponse;
    generateTestData: () => MockTestResponse;
}

const mockService: MockService =  {
    getDefaultData: (): MockDefaultResponse => {
        return {
            message: 'Mock Api is running',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        };
    },

    generateTestData: (): MockTestResponse => {
        const testData: TestData = {
            uuid: randomUUID(),
            status: 'active',
            created_at: new Date().toISOString(),
        };
        console.log("testData", testData);
        return {
            id: randomUUID(),
            message: 'Data generated sucessfully',
            random_number: Math.floor(Math.random() * 1000),
            test_data: testData,
            timestamp: new Date().toISOString(),
        };
    }
}

export default mockService;