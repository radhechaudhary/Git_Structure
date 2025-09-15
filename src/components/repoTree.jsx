import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";

export default function RepoTree({ mermaidCode, setSvgContent }) {
  const containerRef = useRef(null);
  

  if(!mermaidCode) return;

  useEffect(() => {
    mermaid.initialize({
        startOnLoad: true,
        theme: "dark",
        themeVariables: {
            fontSize: "16px",
        },
        flowchart: {
            useMaxWidth: true,
            
            nodeSpacing: 10,
            rankSpacing: 200,
        },
    });

    if (containerRef.current) {
      const renderId = `mermaid-${Date.now()}`; // unique id for diagram
      mermaid.render(renderId, mermaidCode).then(({ svg }) => {
        containerRef.current.innerHTML = svg; // inject SVG
        setSvgContent(svg)
      });
    }
  }, [mermaidCode]);

  
  return (
    <div>
      <div className=" w-full overflow-auto " ref={containerRef}></div>
      
    </div>
  );
}
