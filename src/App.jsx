import {useEffect, useState} from 'react'
import RepoTree from './components/repoTree';
import run from './gemini';
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function App() {

  const [url, setUrl] = useState('');
  const [structure, setStructure] = useState("")
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false)
  const [svgContent, setSvgContent] = useState("")
  const [summary, setSummary] = useState("");
  const [isToggeled, setIsToggeled] = useState(false)

  const generate = async()=>{
    generateSummary(url)
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);  // regesx method 
    if (!match) throw new Error("Invalid GitHub URL");

  const [_, owner, repo] = match;
    try{
        const repoMeta = await fetch(`https://api.github.com/repos/${owner}/${repo}`).then(r => r.json());
        const branch = repoMeta.default_branch;

        // Fetch tree
        const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
        const treeData = await treeRes.json();
        console.log(treeData)
       
        const mermaidStr = await generateMermaid(treeData)
        
        setStructure(mermaidStr)
        
      }
      catch(err){
        console.log(err)
      }
  }

  function sanitizeId(path) {
  return path.replace(/[^a-zA-Z0-9_]/g, "_");
}

function generateMermaid(data) {
  let mermaid = "graph TD\n";
  const nodes = new Set();
  const edges = [];
  const subgraphs = {};

  data.tree.forEach(item => {
    const parts = item.path.split("/");
    for (let i = 0; i < parts.length; i++) {
      const rawId = parts.slice(0, i + 1).join("_");
      const id = sanitizeId(rawId);
      const label = parts[i];

      // add node
      if (!nodes.has(id)) {
        mermaid += `  ${id}[${label}]\n`;
        nodes.add(id);
      }

      // add edge
      if (i > 0) {
        const parentRawId = parts.slice(0, i).join("_");
        const parentId = sanitizeId(parentRawId);
        edges.push(`  ${parentId} --> ${id}`);
      }

      // track children for subgraph grouping
      if (i > 0) {
        const parentPath = parts.slice(0, i).join("_");
        if (!subgraphs[parentPath]) subgraphs[parentPath] = [];
        subgraphs[parentPath].push(id);
      }
    }
  });

  // render edges
  edges.forEach(edge => {
    mermaid += edge + "\n";
  });

  // wrap children in subgraphs (vertical stacking)
  Object.keys(subgraphs).forEach(parent => {
    mermaid += `  subgraph ${parent}_group[" "]\n`;
    mermaid += `    direction TB\n`;
    subgraphs[parent].forEach(childId => {
      mermaid += `    ${childId}\n`;
    });
    mermaid += `  end\n`;
  });

  return mermaid;
}

const downloadSVG = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg"; // filename
    a.click();

    URL.revokeObjectURL(url); // cleanup
  };

  const generateSummary = (url)=>{
    setIsGenerating(true)
    let message = `Here's the github repository link "${url}" generate an summary of it for user easability`
    run(message)
    .then((res)=>{
      if(res){
        console.log(res)
        setSummary(res);
        setIsGenerating(false)
        setIsGenerated(true)
      }
    })
    .catch((err)=>{
      console.log(err)
      setIsGenerating(false);
      setIsGenerated(true)
    })
  }




  return (

    <div id='body' className={`w-full min-h-[100vh]  bg-slate-800 text-slate-200 font-underdog flex flex-col items-center  gap-10 bg-[url("/carbon-fibre.png")] `}>
      <div id='navbar' className='w-full h-15 bg-slate-800 flex justify-between items-center px-2.5 '>
        <div className='flex items-center'>
          <img className='h-11' src='./icon.png'/>
          <h2 className='text-xl md:text-2xl font-extrabold'>Git Structure</h2>
        </div>
        <div className='flex items-center gap-2'>
          <a href="https://github.com/radhechaudhary" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} style={{ fontSize: 20, color:"GrayText" }}/></a>
          <a href="https://www.linkedin.com/in/mohit-chaudhary-5a0002272/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 20, color:'GrayText' }}/></a>
          <a href="https://portfolio2-blue-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className='text-lg text-gray-500 font-extrabold'>Portfolio</a>
        </div>
        
      </div>
      <div className='w-full flex flex-col gap-2 items-center'>
        {!isGenerated?<div className='header w-[90%] md:w-[60%] lg:w-[40%]'>
          <h1 className='font-bold text-slate-400 text-7xl text-center'>Git Repo to <span className='text-slate-300'>Structure</span></h1>
          <p className='text-center mt-5 text-[16px]'>
            Get Your Github repo's structure for the ease of visualization<br/>
            This is useful for quickly getting project's file structure<br/>
            Paste Your Url here....
          </p>
        </div>:null}
        <div className={`w-[90%] md:w-[60%] lg:w-[40%] flexflex-col p-10 bg-slate-800 rounded-lg shadow-black shadow-lg`}>
          <div className='flex gap-5'>
            <input  onChange={((e)=>{setUrl(e.target.value)})} type='text' value={url} placeholder='paste your repo link here' className='flex-1 py-1.5 text-lg rounded-md pl-3 border-[0.5px]  border-slate-200 focus:outline-0'/>
            <button onClick={generate} className='flex justify-center items-center bg-slate-200 text-slate-900 rounded-md px-2 active:scale-90 font-medium cursor-pointer'>Generate</button>
          </div> 
          {isGenerated?<div className='flex gap-2'>
          <button
            onClick={downloadSVG}
            className="mt-4 px-3 py-[6px] bg-blue-900 text-white rounded cursor-pointer active:scale-90"
          >
            Download SVG
          </button>
          {!isToggeled?<button
            onClick={()=>setIsToggeled(!isToggeled)}
            className="mt-4 px-3 py-[6px] bg-blue-900 text-white rounded cursor-pointer active:scale-90 flex gap-1 items-center"
          >
            Show Summary
            <img  className='h-7 w-7' src='./gemini-icon.svg'/>
          </button>:
          <button
            onClick={()=>setIsToggeled(!isToggeled)}
            className="mt-4 px-3 py-[6px] bg-blue-900 text-white rounded cursor-pointer active:scale-90"
          >
            Show Diagram
          </button>}
        </div>:null}
      </div>
      </div>
      {isGenerating?<div className='flex gap-2 m-t-10'>
          Generating
          <motion.div
            animate={{rotate:360}}
            transition={{
              ease:'linear',
              duration:1,
              repeat:Infinity
            }}
             className='border-b-slate-500  border-r-slate-500 border-r-[1px] border-b-[1px] rounded-full  w-5 h-5 '></motion.div>
        </div>:null}
      {isGenerated && !isGenerating && !isToggeled?<div className={` w-[98%]`}>
        <RepoTree mermaidCode={structure} setSvgContent={setSvgContent}/>
      </div>:null}
      {isToggeled?
      <div className='w-9/10 '>
        <p className='whitespace-pre-wrap'>{summary}</p>
        
      </div>:null}
      <div className='footer flex justify-center items-center w-full h-10'>
        <p className='text-slate-500 text-[14px] font-bold'>created By: Mohit Chaudahry</p>
      </div>
    </div>
    
  )
}

export default App