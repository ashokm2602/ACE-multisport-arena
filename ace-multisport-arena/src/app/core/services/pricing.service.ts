import { Injectable } from '@angular/core';
import { TurfPricing } from '../../shared/models/arena.models';
// Pricing is loaded and saved through GET/PUT /api/admin/pricing. No production prices are bundled.
@Injectable({ providedIn: 'root' })
export class PricingService {
  load(): Promise<TurfPricing[]> { return Promise.reject(new Error('Pricing API is not connected.')); }
  save(_pricing: TurfPricing): Promise<TurfPricing> { return Promise.reject(new Error('Pricing API is not connected.')); }
}
