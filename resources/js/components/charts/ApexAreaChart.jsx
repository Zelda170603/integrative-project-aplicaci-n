import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexAreaChart extends React.Component {
    constructor(props) {
        super(props);

        // Datos de actividad de usuario simulados
        const userActivityData = [120, 150, 130, 170, 160, 180, 200];

        this.state = {
            series: [{
                name: "Usuarios Activos",
                data: userActivityData
            }],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    background: '#1f2937', // neutral-900
                    foreColor: '#f5f5f5'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    colors: ['#ffcc00'] // Amarillo brillante
                },
                title: {
                    text: 'Actividad de Usuarios (Última Semana)',
                    align: 'left',
                    style: { color: '#f5f5f5' }
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
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>
        );
    }
}

export default ApexAreaChart;
