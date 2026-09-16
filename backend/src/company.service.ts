import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  getCompany() {
    return {
      name: 'TrustCore Labs',
      tagline: 'Growth-focused software teams for ambitious businesses.',
      metrics: [
        { label: 'Core service lines', value: '04' },
        { label: 'Live project portfolio', value: '6+' },
        { label: 'Team extension mindset', value: '1' },
      ],
      services: [
        'Product & Software Engineering',
        'Web & Mobile Solutions',
        'ERP & Business Systems',
        'Digital Growth & Support',
      ],
      contact: {
        address: 'No.257/3, Old Road, Moraketiya, Pannipitiya, Sri Lanka, 10230.',
        email: 'info@trustcorelabs.com',
        phones: [
          { label: 'Office Number', number: '+94 11 208 8358' },
          { label: 'Hashan Amarasinghe', number: '+94 77 200 9665' },
          { label: 'Dashin Sanjana', number: '+94 78 841 8981' },
        ],
      },
    };
  }
}

