import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexBarChart extends React.Component {
    constructor(props) {
        super(props);

        // Datos de dispositivos simulados
        const mobileData = [60, 62, 65, 70, 72, 68, 75];
        const desktopData = [40, 38, 35, 30, 28, 32, 25];

        this.state = {
            series: [{
                name: 'Móvil',
                data: mobileData
            }, {
                name: 'Escritorio',
                data: desktopData
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    background: '#1f2937', // neutral-900
                    foreColor: '#f5f5f5'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                title: {
                    text: 'Dispositivos de Conexión (Última Semana)',
                    align: 'left',
                    style: { color: '#f5f5f5' }
                },
                xaxis: {
                    categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    labels: { style: { colors: '#f5f5f5' } }
                },
                yaxis: {
                    title: {
                        text: 'Usuarios',
                        style: { color: '#f5f5f5' }
                    },
                    labels: { style: { colors: '#f5f5f5' } }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " usuarios";
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }
}

export default ApexBarChart;
