import chai from 'chai'

import {opaqueParser, chartTranc, BarChartTranc} from '../src/app/helpers'

describe('Helpers', function() {
    describe('Chart', function() {
        const text = `1,3.9215131,0.0000000,0.0000000,0.0000000,0\n2,3.92530158,0.00000000,0.00000000,0.00000000,0`
        const chartData = chartTranc(opaqueParser(text));
        let BarChartData = BarChartTranc(chartData, 'TWDJPY', {
            strokeWidth: 3,
            strokeDashArray: "5,5"
        });

        it('all should be function', function() {
            chai.assert.isFunction(chartTranc);
            chai.assert.isFunction(opaqueParser);
            chai.assert.isFunctoin(BarChartTranc);
        })
        it('should return new array with object which contains label and value of num', function() {

            chai.expect(chartData).to.eql([
                {
                    x: 1,
                    y: 3.9215131
                }, {
                    x: 2,
                    y: 3.92530158
                }
            ]);

        })

        it('should avoid when src is undefined', function() {
            let text = ''
            let chartData = chartTranc(opaqueParser(text));
            let BarChartData = BarChartTranc(chartData);
            chai.expect(chartData).to.eql([]);
            chai.expect(BarChartData).to.eql([
                {
                    name: 'label',
                    values: []
                }
            ])
        })

        describe('ChartData', function() {
            it('should be the array with label and values', function() {
                chai.expect(BarChartData).to.eql([
                    {
                        name: 'TWDJPY',
                        strokeDashArray: "5,5",
                        strokeWidth: 3,
                        values: [
                            {
                                x: 1,
                                y: 3.9215131
                            }, {
                                x: 2,
                                y: 3.92530158
                            }
                        ]
                    }
                ]);
            })
        })

    })
})
