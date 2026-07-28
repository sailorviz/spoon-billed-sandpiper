// import { useEffect, useRef, useState } from "react";
// import Migration from "../sections/migration/Migration";
// import "../styles/migration.css";
// import ReactMarkdown from "react-markdown";
// import { useLanguage } from "../components/LanguageContext";

// export default function ScrollForMigration() {
//   const MigrationRef = useRef(null);
//   const sectionRef = useRef(null);
//   const [textSteps, setTextSteps] = useState([]);
//   const { language } = useLanguage(); // 获取当前语言

//   // 从 public 文件夹中加载 单独text 文件
//   useEffect(() => {
//     const url = `/data/text/${language}/ending-Migration-text.md`;
//     fetch(url)    
//       .then((res) => res.text())
//       .then((text) => {
//         const blocks = text
//           .split(/<!--\s*step\d+\s*-->/gm)
//           .filter((block) => block.trim().length > 0)
//           .map((block) => block.trim());
//         setTextSteps(blocks);
//       })
//       .catch((err) => console.error("加载 单独text 出错:", err));
//   }, []);

//   useEffect(() => {
//     function onScroll() {
//       const rect = sectionRef.current.getBoundingClientRect();

//       const vh = window.innerHeight;

//       // ⭐ 核心：计算 progress
//       let progress = 0;

//       if (rect.top <= 0 && rect.bottom >= vh) {
//         progress = Math.abs(rect.top) / (rect.height - vh);
//       } else if (rect.top > 0) {
//         progress = 0;
//       } else {
//         progress = 1;
//       }

//       // ⭐ 传给系统
//       MigrationRef.current?.setProgress(progress);
//     }

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div ref={sectionRef} className="Migration">
//       <div className="text-Migration">
//         <ReactMarkdown>{textSteps[0]}</ReactMarkdown>
//       </div>

//       <div className="Migration-stickyContainer">
//         <Migration ref={MigrationRef} />
//       </div>
//     </div>
//   );
// }

import { useRef, useEffect } from "react";
import Migration from "../sections/migration/migration";
import "../styles/migration.css"
import { getNarrativeProgress } from "../utils/progress/getNarrativeProgress";

export default function ScrollForMigration() {

    const migrationRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {

        function onScroll() {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();

            const progress = getNarrativeProgress(
                rect,
                window.innerHeight
            );

            migrationRef.current?.updateProgress(progress);

            // console.log(progress);

        }

        onScroll();
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);

    }, []);

    return (

        <section ref={sectionRef} className="migration-section">

            <div className="migration-stickyContainer">

                <Migration ref={migrationRef} />

            </div>

        </section>

    );

}