import { useState } from "react";

export default function DeclineRateLineChart({ data }) {

    const [activeIndex, setActiveIndex] = useState(null);


    // -------------------------
    // SVG dimensions
    // -------------------------

    const viewBoxWidth = 1000;
    const viewBoxHeight = 500;

    const margin = {
        top: 40,
        right: 40,
        bottom: 70,
        left: 60,
    };

    const chartWidth =
        viewBoxWidth - margin.left - margin.right;

    const chartHeight =
        viewBoxHeight - margin.top - margin.bottom;


    // -------------------------
    // Scales
    // -------------------------

    const xScale = (year) => {

        return (
            margin.left +
            ((year - 2002) / (2026 - 2002)) *
            chartWidth
        );

    };


    const yScale = (rate) => {

        return (
            margin.top +
            chartHeight -
            (rate / 30) * chartHeight
        );

    };


    // -------------------------
    // Axis ticks
    // -------------------------

    const yTicks = [
        0,
        5,
        10,
        15,
        20,
        25,
        30,
    ];


    // -------------------------
    // Render
    // -------------------------

    return (

        <div className="decline-rate-chart-wrapper">

        <svg
            className="decline-rate-line-chart"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            width="100%"
            height="100%"
        >

                {/* =========================
                    Y AXIS
                ========================= */}

                <g className="y-axis">

                    {yTicks.map((tick) => {

                        const y = yScale(tick);

                        return (

                            <g
                                key={tick}
                                className="y-axis-tick"
                            >

                                {/* grid line */}

                                <line
                                    className="y-grid-line"
                                    x1={margin.left}
                                    x2={
                                        viewBoxWidth + 20
                                    }
                                    y1={y}
                                    y2={y}
                                />


                                {/* label */}

                                <text
                                    className="y-axis-label"
                                    x={
                                        margin.left -
                                        10
                                    }
                                    y={y}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                >
                                    {tick}
                                </text>

                            </g>

                        );

                    })}

                </g>


                {/* =========================
                    X AXIS
                ========================= */}

                <g className="x-axis">
                    {/* ticks && labels */}
                    {data.map((d, i) => {

                        const x = xScale(d.to + 1);

                        return (

                            <g
                                key={`${d.from}-${d.to}`}
                                className="x-axis-tick"
                            >

                                {/* tick */}

                                <line
                                    className="x-axis-mark"
                                    x1={x}
                                    x2={x}
                                    y1={
                                        margin.top +
                                        chartHeight
                                    }
                                    y2={
                                        margin.top +
                                        chartHeight +
                                        6
                                    }
                                />


                                {/* year_to label */}

                                <text
                                    className={
                                        `x-axis-label ${
                                            activeIndex === i
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    x={x}
                                    y={
                                        margin.top +
                                        chartHeight +
                                        25
                                    }
                                    textAnchor="end"
                                >
                                    {d.to}
                                </text>

                            </g>

                        );

                    })}

                    {/* active lables */}
                    {activeIndex !== null && (

                        <g className="active-x-label">

                            {(() => {

                                const d = data[activeIndex];

                                const x =
                                    xScale(d.from);

                                return (

                                    <text
                                        className="x-axis-label active"
                                        x={x}
                                        y={
                                            margin.top +
                                            chartHeight +
                                            25
                                        }
                                        textAnchor="start"
                                    >
                                        {d.from}
                                    </text>

                                );

                            })()}

                        </g>

                    )}

                    {/* active ticks */}
                    {activeIndex !== null && (

                        <line
                            className="active-x-guide"
                            x1={
                                xScale(
                                    data[activeIndex].to + 1
                                )
                            }
                            x2={
                                xScale(
                                    data[activeIndex].to + 1
                                )
                            }
                            y1={
                                yScale(
                                    data[activeIndex].annualRate
                                )
                            }
                            y2={
                                margin.top + chartHeight
                            }
                        />

                    )}

                    {/* active x-interval-line */}
                    {activeIndex !== null && (

                        <line
                            className="decline-rate-interval"
                            x1={xScale(data[activeIndex].from)}
                            x2={xScale(data[activeIndex].to + 1)}
                            y1={margin.top + chartHeight}
                            y2={margin.top + chartHeight}
                        />

                    )}

                </g>


                {/* =========================
                    DATA
                ========================= */}

                <g className="decline-rate-data">
                    
                    {/* =========================
                        DATA LINE
                    ========================= */}

                    <polyline
                        className="decline-rate-line"
                        points={
                            data
                                .map((d) => {

                                    const x = xScale(d.to + 1);
                                    const y = yScale(d.annualRate);

                                    return `${x},${y}`;

                                })
                                .join(" ")
                        }
                    />


                    {/* =========================
                        POINTS
                    ========================= */}

                    {data.map((d, i) => {

                        /*
                         * Important:
                         *
                         * year_from
                         *     → xScale(d.from)
                         *
                         * year_to
                         *     → xScale(d.to + 1)
                         *
                         * point
                         *     → same position as year_to
                         */

                        const fromX =
                            xScale(d.from);

                        const toX =
                            xScale(d.to + 1);

                        const y =
                            yScale(d.annualRate);


                        const isActive =
                            activeIndex === i;


                        return (

                            <g
                                key={`${d.from}-${d.to}`}
                                className={
                                    `decline-rate-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }

                                onMouseEnter={() =>
                                    setActiveIndex(i)
                                }

                                onMouseLeave={() =>
                                    setActiveIndex(null)
                                }
                            >

                                {/* =================
                                    POINT
                                ================= */}

                                <circle
                                    className={
                                        `decline-rate-point ${
                                            activeIndex === i
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                    cx={toX}
                                    cy={y}
                                    r={5}
                                />

                            </g>

                        );

                    })}

                    {/* tooltip */}

                    {activeIndex !== null && (() => {

                        const d = data[activeIndex];

                        const pointX = xScale(d.to + 1);
                        const pointY = yScale(d.annualRate);

                        const tooltipWidth = 170;
                        const tooltipHeight = 42;
                        const tooltipGap = 10;

                        const tooltipOnRight =
                            pointX + tooltipGap + tooltipWidth <= viewBoxWidth;

                        const tooltipX = tooltipOnRight
                            ? pointX + tooltipGap
                            : pointX - tooltipGap - tooltipWidth;

                        const tooltipY =
                            pointY - tooltipHeight - tooltipGap;


                        return (

                            <g
                                className="decline-rate-tooltip"
                                transform={`
                                    translate(
                                        ${tooltipX},
                                        ${tooltipY}
                                    )
                                `}
                            >

                                {/* background */}

                                <rect
                                    className="tooltip-background"
                                    width={tooltipWidth}
                                    height={tooltipHeight}
                                    rx="6"
                                />


                                {/* interval */}

                                <text
                                    className="tooltip-text"
                                    x="10"
                                    y="17"
                                    textAnchor="start"
                                >
                                    interval: {d.from} – {d.to}
                                </text>


                                {/* rate */}

                                <text
                                    className="tooltip-text"
                                    x="10"
                                    y="34"
                                    textAnchor="start"
                                >
                                    rate: {d.annualRate}%
                                </text>

                            </g>

                        );

                    })()}

                </g>

            </svg>


        </div>

    );
}