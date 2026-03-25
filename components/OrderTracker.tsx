
import React from 'react';
import { CheckCircle, Clock, Truck, Home, Package } from 'lucide-react';
import { OrderStatus } from '../types';

interface OrderTrackerProps {
  status: OrderStatus;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ status }) => {
  const steps = [
    { key: 'RECEIVED', label: 'Received', icon: Package },
    { key: 'PREPARING', label: 'Preparing', icon: Clock },
    { key: 'OUT-FOR-DELIVERY', label: 'Out for Delivery', icon: Truck },
    { key: 'DELIVERED', label: 'Delivered', icon: Home },
  ];

  const getStatusIndex = (s: OrderStatus) => {
    return steps.findIndex(step => step.key === s);
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-amber-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${isActive ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-slate-400 border-2 border-slate-200'}
                ${isCurrent ? 'ring-4 ring-amber-100 scale-110' : ''}
              `}>
                {isActive && index < currentIndex ? (
                  <CheckCircle size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </div>
              <span className={`mt-2 text-xs font-semibold whitespace-nowrap ${isActive ? 'text-amber-800' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
