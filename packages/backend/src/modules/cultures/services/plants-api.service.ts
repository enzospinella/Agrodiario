import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { TranslationService } from './translation.service';

export interface WikidataCrop {
  id: string;
  label: string;
  description?: string;
  aliases?: string[];
}

export interface WikidataCultivar {
  id: string;
  label: string;
  description?: string;
}

@Injectable()
export class PlantsApiService {
  private readonly logger = new Logger(PlantsApiService.name);
  private readonly trefleApi: AxiosInstance;
  private readonly apiToken: string;

  constructor(
    private configService: ConfigService,
    private translationService: TranslationService,
  ) {
    this.apiToken = this.configService.get<string>('TREFLE_API_TOKEN') || 'usr-KHirc_oh8C0Sk_y8uTPn8LmidIo7k66ANcadoCYqjF4';
    
    this.trefleApi = axios.create({
      baseURL: 'https://trefle.io/api/v1',
      timeout: 15000,
      params: {
        token: this.apiToken,
      },
    });
  }

  async searchCrops(searchTerm?: string, limit: number = 50): Promise<WikidataCrop[]> {
    try {
      const params: any = {};

      if (searchTerm) {
        params.q = searchTerm;
      }

      // Filter for edible plants only
      params['filter[edible]'] = true;

      const response = await this.trefleApi.get('/plants/search', { params });

      if (!response.data?.data) {
        return [];
      }

      // Filter: only plants with common_name (not null)
      const plantsWithCommonName = response.data.data.filter((plant: any) => plant.common_name);

      // Translate common names to Portuguese
      const cropsData = plantsWithCommonName.slice(0, limit);
      const translatedNames = await this.translationService.translateBatch(
        cropsData.map((plant: any) => plant.common_name)
      );

      const crops = cropsData.map((plant: any, index: number) => ({
        id: plant.id.toString(),
        label: translatedNames[index], // Translated to Portuguese
        description: plant.scientific_name,
        aliases: [],
      }));

      this.logger.log(`Trefle found ${crops.length} crops with common names for term: ${searchTerm || 'all'}`);
      return crops;
    } catch (error) {
      this.logger.error(`Trefle API error: ${error.message}`);
      return [];
    }
  }

  async searchCultivars(cropName: string, limit: number = 20): Promise<WikidataCultivar[]> {
    try {
      const response = await this.trefleApi.get('/plants/search', {
        params: {
          q: cropName,
          'filter[edible]': true,
        },
      });

      if (!response.data?.data) {
        return [];
      }

      // Filter: only plants with common_name (not null)
      const plantsWithCommonName = response.data.data.filter((plant: any) => plant.common_name);

      // Translate common names to Portuguese
      const cultivarsData = plantsWithCommonName.slice(0, limit);
      const translatedNames = await this.translationService.translateBatch(
        cultivarsData.map((plant: any) => plant.common_name)
      );

      const cultivars = cultivarsData.map((plant: any, index: number) => ({
        id: plant.id.toString(),
        label: translatedNames[index], // Translated to Portuguese
        description: `${plant.scientific_name}${plant.family_common_name ? ` (${plant.family_common_name})` : ''}`,
      }));

      this.logger.log(`Trefle found ${cultivars.length} cultivars with common names`);
      return cultivars;
    } catch (error) {
      this.logger.error(`Trefle cultivars error: ${error.message}`);
      return [];
    }
  }
}
