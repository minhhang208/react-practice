import * as React from "react";
import { RadialChart, ArcSeries, ArcLabel, multiHueScaleFactory } from '@data-ui/radial-chart';
import {LegendOrdinal } from '@vx/legend';
const data = [{ label: 'Google Chrome', value: 200 }, { label: 'Facebook', value: 150 }, { label: 'Amazon', value: 21 }];

const categoryColorScale = multiHueScaleFactory();
export class About extends React.Component {
    public render(): React.ReactNode {

        const radius = 300;
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <RadialChart
                    ariaLabel="This is a radial-chart chart of..."
                    width={400}
                    height={400}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    renderTooltip={this.renderTooltip}
                >
                    <ArcSeries
                        data={data}
                        pieValue={this.renderPieValue}
                        fill={this.renderColorScale}
                        stroke="#fff"
                        strokeWidth={1}
                        label={this.renderLabel}
                        labelComponent={<ArcLabel stroke="#222" fill="#fff" fontSize={10}><a href="test.html"/></ArcLabel>}
                        innerRadius={0}
                        outerRadius={0.6 * radius}
                        labelRadius={this.labelRadius} 
                        />     
                        
                </RadialChart>
                <LegendOrdinal
                    direction="column"
                    scale={categoryColorScale}
                    shape="circle"
                    fill={this.renderFillLegend}
                    labelFormat={this.renderLabelFormat}
                />
            </div>
        );
    }
   
    private renderTooltip(input: any) {
        const { datum, fraction } = input

        const { label } = datum;
        const style = { color: categoryColorScale(label) };

        return (
            <div>
                <div>
                    <strong style={style}>{label}</strong>
                </div>
                <div>{(fraction * 100).toFixed()}%</div>
            </div>
        );

    }
    
    private renderLabel(arc: any) {
        return (<a href="/test">{arc.value}</a>);
    }
    private renderFillLegend(input: any) {
        return categoryColorScale(input.datum);
    }
    private renderColorScale(arc: any) {
        return categoryColorScale(arc.data.label)
    }
    private renderPieValue(d: any) {
        return d.value;
    }
    private renderLabelFormat(label: any) {
        return label;
    }
    private labelRadius(radius: any) {
        return 0.47 * radius;
    }
}
