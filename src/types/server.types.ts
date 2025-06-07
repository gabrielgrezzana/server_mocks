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

export interface RandomDataResponse {
    id: string;
    message: string;
    timestamp: string;
    version: string;
    created_at: string;
    rig_name: string;
    temp_rig: number;
    end_ring_service: string;
    token_rig: string;
    rig_status: 'active' | 'inactive' | 'maintenance' | 'error';
    rig_location: string;
    rig_type: string;
    rig_model: string;
    rig_serial_number: string;
    rig_ip_address: string;
    rig_port: number;
    rig_username: string;
  }


  export interface RigListResponse {
    data: RandomDataResponse[];
    total: number;
    page: number;
    per_page: number;
    timestamp: string;
  }