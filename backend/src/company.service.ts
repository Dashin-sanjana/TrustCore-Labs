import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  getCompany() {
    return {
      name: 'TrustCore Labs',
      tagline: 'Secure digital products for ambitious teams.',
      metrics: [
        { label: 'Delivery Pods', value: '04' },
        { label: 'Security Layers', value: '9+' },
        { label: 'Launch Rhythm', value: '30d' },
      ],
      services: [
        'React product interfaces',
        'Nest API platforms',
        'AI workflow automation',
        'Blockchain integrations',
        'CRM and SaaS systems',
        'Security-first cloud builds',
      ],
    };
  }
}
