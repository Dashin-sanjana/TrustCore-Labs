import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  getCompany() {
    return {
      name: 'TrustCore Labs',
      tagline: 'Growth-focused software teams for ambitious businesses.',
      metrics: [
        { label: 'Core service lines', value: '04' },
        { label: 'Live project portfolio', value: '5+' },
        { label: 'Team extension mindset', value: '1' },
      ],
      services: [
        'Product & Software Engineering',
        'Web & Mobile Solutions',
        'ERP & Business Systems',
        'Digital Growth & Support',
      ],
    };
  }
}
