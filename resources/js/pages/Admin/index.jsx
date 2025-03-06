import React from 'react';
import Layout from '@/Layouts/Layout';
import ApexChart from '@/components/charts/ApexChart';
import ApexAreaChart from '@/components/charts/ApexAreaChart';
import ApexBarChart from '@/components/charts/ApexBarChart';

const Index = () => {
    return (
        <Layout>
            <div className="chart-container py-8">
                <ApexChart />
            </div>
            <div className="grid md:grid-cols-2 w-full md:gap-4">
                <div className="chart-container">
                    <ApexAreaChart />
                </div>
                <div className="chart-container">
                    <ApexBarChart />
                </div>
            </div>
        </Layout>
    );
};

export default Index;
