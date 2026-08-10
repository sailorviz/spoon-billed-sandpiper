import Bird from "../../assets/icons/spoon_bill_outline.svg?react";

// export default function PopulationIcon({ state, color }) {
//   // 构建 SVG 的样式对象
//   const svgStyle = {
//     color: color ?? "#999",
//     fill: state === "solid" ? "currentColor" : "none",
//     stroke: state === "outline" ? "currentColor" : "none",
//     strokeWidth: state === "outline" ? "20" : "0",
//   };

//   return (
//     <div className="population-icon">
//         <Bird style={svgStyle} />
//     </div>
//   );
// }

    // <div className="population-icon">
    //   {type === "pair" ? (
    //     <div className="pair-icon">
    //       <Bird style={svgStyle} />  {/* 直接传给 SVG */}
    //       <Bird style={svgStyle} />
    //     </div>
    //   ) : (
    //     <Bird style={svgStyle} />
    //   )}
    // </div>

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
  }

  return (
    <div className="population-icon">
      <Bird style={svgStyle} />
    </div>
  );
}