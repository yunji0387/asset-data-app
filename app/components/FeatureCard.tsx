import React from 'react';
import { feature_list } from '@/public/infos/feature_list';

export default function FeatureCard() {
  return (
    <div className="flex flex-col gap-2">
        {feature_list.map((feature, index) => (
        <div key={index} className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
    ))}
    </div>
  );
}
