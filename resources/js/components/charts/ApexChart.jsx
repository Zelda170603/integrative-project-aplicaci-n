import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        // Datos de ventas simulados
        const salesData = [30, 45, 32, 50, 60, 70, 65]; // Ventas diarias

        this.state = {
            series: [{
                name: "Ventas",
                data: salesData
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    background: '#1f2937', // neutral-900
                    foreColor: '#f5f5f5' // Color de texto claro
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth', // Cambié 'straight' a 'smooth' para un efecto más agradable
                    colors: ['#3b82f6'] // Azul claro
                },
                title: {
                    text: 'Ventas Diarias (Última Semana)',
                    align: 'left',
                    style: { color: '#f5f5f5' }
                },
                grid: {
                    row: {
                        colors: ['#374151', 'transparent'], // neutral-800
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    labels: { style: { colors: '#f5f5f5' } }
                },
                yaxis: {
                    labels: { style: { colors: '#f5f5f5' } }
                }
            }
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        );
    }
}

export default ApexChart;
