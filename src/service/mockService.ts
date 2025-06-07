import { randomUUID } from "crypto";
import { MockDefaultResponse, MockTestResponse, RandomDataResponse, RigListResponse, TestData } from "../types/server.types";

interface MockService {
    getDefaultData: () => MockDefaultResponse;
    generateTestData: () => MockTestResponse;
    generateRandomData: () => RandomDataResponse;
    generateMultipleRigs: (count?: number) => RigListResponse;
    updateRandomRig: (rigs: RandomDataResponse[]) => RandomDataResponse[];
}

const locations = ['Location1', 'Location2', 'Location3', 'DataCenter-A', 'DataCenter-B', 'Cloud-US', 'Cloud-EU'];
const types = ['Mining', 'Gaming', 'Server', 'Workstation'];
const models = ['RTX4090', 'RTX4080', 'RTX3080', 'RX7900XT', 'A100', 'H100'];
const statuses: Array<'active' | 'inactive' | 'maintenance' | 'error'> = ['active', 'inactive', 'maintenance', 'error'];

const getRandomItem = <T>(arr: T[]): T => {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index] as T;
};

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
    },
    generateRandomData: (): RandomDataResponse => {
        const randomBytes = new Uint8Array(4);
        crypto.getRandomValues(randomBytes);
        const rigNameSuffix = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        
        return {
          id: randomUUID(),
          message: 'Data generated successfully',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          created_at: new Date().toISOString(),
          rig_name: `RIG-${rigNameSuffix.substring(0, 6).toUpperCase()}`,
          temp_rig: Math.floor(Math.random() * 40) + 40, // 40-80°C
          end_ring_service: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '',
          token_rig: randomUUID(),
          rig_status: getRandomItem(statuses),
          rig_location: getRandomItem(locations),
          rig_type: getRandomItem(types),
          rig_model: getRandomItem(models),
          rig_serial_number: Math.floor(Math.random() * 9000000000) + 1000000000 + '',
          rig_ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          rig_port: Math.floor(Math.random() * 9000) + 3000,
          rig_username: 'admin'
        };
      },
    generateMultipleRigs: (count: number = 50): RigListResponse => {
        const rigs: RandomDataResponse[] = [];
        
        for (let i = 0; i < count; i++) {
          rigs.push(mockService.generateRandomData());
        }
    
        return {
          data: rigs,
          total: count,
          page: 1,
          per_page: count,
          timestamp: new Date().toISOString()
        };
      },
    
      // Simula atualizações em tempo real - atualiza temperatura e status aleatoriamente
      updateRandomRig: (rigs: RandomDataResponse[]): RandomDataResponse[] => {
        return rigs.map(rig => {
          // 30% chance de atualizar cada rig
          if (Math.random() < 0.3) {
            return {
              ...rig,
              temp_rig: Math.floor(Math.random() * 40) + 40,
              rig_status: Math.random() < 0.1 ? 'error' : 
                         Math.random() < 0.15 ? 'maintenance' : 'active',
              timestamp: new Date().toISOString()
            };
          }
          return rig;
        });
      }
}

export default mockService;