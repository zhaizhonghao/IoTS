$(function() {
    $.ajax({
        url: '/THData',
        contentType: 'application/json',
        success: function (response) {
            var chart = Highcharts.chart('container', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: '实验室温湿度日平均值'
                },

                xAxis: {
                    categories: ['1点', '2点', '3点', '4点', '5点', '6点',
                        '7点', '8点', '9点', '10点', '11点', '12点']
                },
                yAxis: {
                    title: {
                        text: '温湿度'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: '温度',
                    marker: {
                        symbol: 'square'
                    },
                    data: response.temperature
                }, {
                    name: '湿度',
                    marker: {
                        symbol: 'diamond'
                    },
                    data: response.humidy
                }]
            });

        }
    });

})



