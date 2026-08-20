import Bird from "../../assets/icons/spoon_bill_outline.svg?react";

export default function PopulationIcon({ state, color }) {
  const currentColor = color ?? "#999";
  
  // 构建样式
  let svgStyle = {
    color: currentColor,
  };

  if (state === "solid") {
    svgStyle = {
      ...svgStyle,
      fill: "currentColor",
      stroke: "none",
    };
  } else if (state === "outline") {
    svgStyle = {
      ...svgStyle,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "25",
    };
  } else if (state === "only estimation") {
    svgStyle = {
      ...svgStyle,
      fill: "currentColor",
      stroke: "currentColor",
      strokeWidth: "25",
      fillOpacity: "0.6", // 或使用 opacity: "0.6"
    };
  } else if (!state) {
    svgStyle = {
      ...svgStyle,
      fill: "currentColor",
    }
  }

  return (
    <div className="population-icon">
      <Bird style={svgStyle} />
    </div>
  );
}