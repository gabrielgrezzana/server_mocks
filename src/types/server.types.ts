export interface ApiResponse<T = any> {
    message?: string;
    data?: T;
    error?: string;
    timestamp: string;
}

export interface MockDefaultResponse {
    message: string;
    timestamp: string;
    version: string;
}

export interface TestData {
    uuid: string;
    created_at: string;
    status: 'active' | 'inactive' | 'pending';
}

export interface MockTestResponse {
    id: string;
    message: string;
    timestamp: string;
    random_number: number;
    test_data: TestData;
}

