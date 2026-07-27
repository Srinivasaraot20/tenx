import React from 'react';
import { ServiceItem } from '../../types/service';
import { ArrowRight, Monitor, Store, Zap, Package, Layers, Boxes, ClipboardList, CreditCard, LayoutDashboard, UserCircle, Warehouse, Truck, Repeat, Building2, ShoppingBag } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-8 h-8" />,
  Store: <Store className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  Boxes: <Boxes className="w-8 h-8" />,
  ClipboardList: <ClipboardList className="w-8 h-8" />,
  CreditCard: <CreditCard className="w-8 h-8" />,
  LayoutDashboard: <LayoutDashboard className="w-8 h-8" />,
  UserCircle: <UserCircle className="w-8 h-8" />,
  Warehouse: <Warehouse className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  Repeat: <Repeat className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />
};

export default function OurServicesGrid({ data }: { data?: ServiceItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Enterprise Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Our E-Commerce Solutions</h2>
          <p className="text-lg text-slate-600">Comprehensive, end-to-end digital commerce services designed to scale your operations and maximize conversions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {iconMap[service.icon] || <Monitor className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{service.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>
              
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-6 pt-4 border-t border-slate-100">
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center text-sm text-slate-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto pt-4 flex items-center text-blue-600 font-semibold cursor-pointer group/link">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
