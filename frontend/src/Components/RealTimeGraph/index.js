import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useFontFamily from "../../Utilities/useFontFamily";

const RealTimeGraph = ({ data }) => {
  const d3Container = useRef(null);
  const fontFamilyLight = useFontFamily("Light");

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const svg = d3.select(d3Container.current);
      const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // Increased bottom margin for rotated labels
      const parentWidth = d3Container.current.parentElement.clientWidth;

      const width = 700;
      const height = 300;

      svg.selectAll("*").remove(); // Clear previous drawing

      svg
        .attr("width", width)
        .attr("height", height)
        .style("min-width", "700px");
      // Set minimum width using CSS style
      const processedData = processDataPerMinute(data);

      const x = d3
        .scaleBand()
        .domain(processedData.map((d) => d.timestamp))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(processedData, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(5))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .selectAll(".tick line")
              .clone()
              .attr("x2", width)
              .attr("stroke-opacity", 0.1)
          );

      const line = d3
        .line()
        .x((d) => x(d.timestamp) + x.bandwidth() / 2)
        .y((d) => y(d.count))
        .curve(d3.curveMonotoneX); // Apply smoothing

      const path = svg
        .append("path")
        .datum(processedData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "rgba(4, 30, 73, 0.7)")
        .attr("stroke-width", 2)
        .attr("d", line);

      const circles = svg
        .selectAll("circle")
        .data(processedData)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.timestamp) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.count))
        .attr("r", 4)
        .attr("fill", "rgba(4, 30, 73, 0.7)")
        .attr("stroke", "rgba(4, 30, 73, 1)")
        .attr("stroke-width", 1);

      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      circles.attr("r", 0).transition().duration(1000).attr("r", 4);
      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
      // Add legend
      svg
        .append("rect")
        .attr("x", width / 2)
        .attr("y", 10)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "rgba(4, 30, 73, 0.7)");

      svg
        .append("text")
        .attr("x", width / 2 - 70)
        .attr("y", 25)
        .text("Abonnés")
        .style("font-size", "12px")
        .style("font-family", fontFamilyLight)
        .attr("alignment-baseline", "middle");
      circles
        .on("mouseover", (event, d) => {
          const tooltip = d3.select("#tooltip");
          tooltip.transition().duration(200).style("opacity", 0.9);

          tooltip
            .html(
              `<strong>Date:</strong> ${d3.timeFormat("%Y-%m-%d %H:%M")(
                new Date(d.timestamp)
              )}<br/><strong>Abonnés:</strong> ${d.count}`
            )
            .style("left", `0px`)
            .style("top", `0px`);
        })
        .on("mouseout", () => {
          d3.select("#tooltip").transition().duration(500).style("opacity", 0);
        });
    }
  }, [data, fontFamilyLight]);

  // Function to process data into minute intervals
  const processDataPerMinute = (data) => {
    const minuteData = [];
    const minuteFormat = d3.timeFormat("%Y-%m-%dT%H:%M");
    let cumulativeCount = 0;

    // Iterate through the data
    data.forEach((d) => {
      const minuteTimestamp = minuteFormat(new Date(d.timestamp));
      const existingEntry = minuteData.find(
        (entry) => entry.timestamp === minuteTimestamp
      );

      cumulativeCount++;

      // If entry exists, increment count; otherwise, add new entry
      if (existingEntry) {
        existingEntry.count = cumulativeCount;
      } else {
        minuteData.push({ timestamp: minuteTimestamp, count: cumulativeCount });
      }
    });

    // Limit to 20 points if more than 20
    if (minuteData.length > 20) {
      const step = Math.ceil(minuteData.length / 20); // Calculate step size
      const aggregatedData = minuteData.filter((d, i) => i % step === 0); // Filter by step
      return aggregatedData;
    }

    return minuteData;
  };

  return (
    <div style={{ position: "relative" }}>
      <svg className="d3-component" ref={d3Container} />
      <div
        id="tooltip"
        className="tooltip absolute"
        style={{
          pointerEvents: "none",
          backgroundColor: "black",
          color: "white",
          padding: "5px",
          borderRadius: "3px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
};

export default RealTimeGraph;
