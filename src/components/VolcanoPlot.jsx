import React from "react";
import * as d3 from "d3";
import useChartDimensions from "../hooks/useChartDimensions";

const VolcanoPlot = ({data, dimensions}) => {
    //const svgRef = React.useRef(null);

    const [svgRef, dms] = useChartDimensions(dimensions);
    
    const xScale = React.useMemo(() => d3.scaleLinear()
    .domain([-5,5])
    .range([0, dms.boundedWidth]).interpolate(d3.interpolateRound), [dms.boundedWidth]);

    const yScale = React.useMemo(() => d3.scaleLinear()
    .range([dms.boundedHeight, 0]).interpolate(d3.interpolateRound), [dms.boundedHeight]);

    React.useLayoutEffect(() => {
        
        const xmin = d3.min(data, d => d.logFC);
        const xmax = d3.max(data, d => d.logFC);
        
        const ymax = d3.max(data, d => d.logP);
        yScale.domain([0,ymax+5]);
       
        const xaxis = d3.axisBottom(xScale).ticks(dms.width / 80);
        const yaxis = d3.axisLeft(yScale).ticks(dms.height/ 50);

        const svg = d3.select(svgRef.current).select("svg");
    

        // not canvas
        // svg.append("g")
        // .attr("transform", `translate(${dms.marginLeft}, ${dms.marginTop})`)
        // .selectAll("circle")
        //     .data(data)
        //     .join("circle")
        //         .attr("cx", d => xScale(d.logFC))
        //         .attr("cy", d => yScale(d.logP))
        //         .attr("r", 2)
        //         .style("fill", "red");

        const r = 2;

        // CANVAS ONLY
        const canvas = d3.select(svgRef.current).select("canvas");
        const context = canvas.node().getContext("2d");        
        data.forEach(point => {
            drawPoint(point);
        });
        function drawPoint(p) {
            context.beginPath();
            context.fillStyle = "red";
            const px = xScale(p.logFC);
            const py = yScale(p.logP);         
            context.arc(px, py, 2, 0, 2 * Math.PI,true);
            context.fill();
         }
        // CANVAS ONLY


        const gx = svg.append("g")
            .attr("transform", `translate(${dms.marginLeft}, ${dms.marginTop + dms.boundedHeight})`)
            .call(xaxis)
            .attr("stroke-opacity", 0.25)
        svg.append("text")
            .attr("transform", `translate(${dms.marginLeft + dms.boundedWidth/2}, ${-dms.marginBottom/2 + 10 + dms.height})`)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .style("text-anchor", "middle")
            .style("fill", "black")
            .text(" logFC ");
        const gy = svg.append("g")
            .attr("transform", `translate(${dms.marginLeft}, ${dms.marginTop})`)
            .call(yaxis)
            .attr("stroke-opacity", 0.25)
        svg.append("text")
                .attr("transform", `translate(${dms.marginLeft/2 - 5}, ${dms.boundedHeight/2} ) rotate(-90)`)
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .style("fill", "black")
                .text("-log P");

        d3.select(context.canvas).call(d3.zoom()
            .scaleExtent([1, 8])
            .translateExtent([[0,0],[dms.boundedWidth, dms.boundedHeight]])
            .on("zoom", ({transform}) => zoomed(transform)));

        function zoomed(transform) {

            gx.call(xaxis.scale(transform.rescaleX(xScale)));
            gy.call(yaxis.scale(transform.rescaleY(yScale)));


            // CANVAS ONLY ---
            context.save();
            context.clearRect(0, 0, dms.boundedWidth, dms.boundedHeight);
            context.translate(transform.x, transform.y);
            context.scale(transform.k, transform.k);
            context.beginPath();
            data.forEach(point => {
              const px = xScale(point.logFC);
              const py = yScale(point.logP);         
              context.moveTo(px + r, py);
              context.arc(px, py, r, 0, 2 * Math.PI);
            });
            context.fill();
            context.restore();
            // CANVAS ONLY ---
          }
        
        zoomed(d3.zoomIdentity);

        
    }, [data]);

    return (
        <div className="Chart__wrapper" ref={svgRef}>
            <svg width={dms.width} height={dms.height} style={{position: "absolute"}}/>
            <canvas width={dms.boundedWidth} height={dms.boundedHeight} style={{position: "absolute", marginLeft: dms.marginLeft+"px", marginTop: dms.marginTop+"px"}}/>
        </div>
    );

}

export default VolcanoPlot;