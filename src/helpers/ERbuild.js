import JSZip from "jszip";
import { saveAs } from 'file-saver';

const TypeNames = {
  stack: "Stack",
  tab: "BottomTab",
  drawer: "Drawer",
}

const layoutContent= (type)=> `

import { ${TypeNames[type]} } from 'expo-router';

export default function Layout() {
  return <${TypeNames[type]} />;
}
`
const indexContent= (name)=> `


export default function ${name}() {
  return <View></View>;
}

`

const createTree = (edges, nodes) => {
  const nodeMap = nodes.reduce((acc, node) => {
    console.log(node,"a")
    acc[node.data.label] = { name: node.data.label, children: [], type: node.type };
    return acc;
  }, {});

  edges.forEach(edge => {
    const parent = nodeMap[nodes.find(x => x.id === edge.source)?.data.label];
    const child = nodeMap[nodes.find(x => x.id === edge.target)?.data.label];
    parent.children.push(child);
  });

  const childNodes = new Set(edges.map(edge => nodes.find(x => x.id === edge.target)?.data.label));
  return Object.values(nodeMap).filter(node => !childNodes.has(node.name));
}


const createFolder = (nodes, path) => {
  nodes.forEach(node => {
    const folder = path.folder(node.name);
    folder.file("_layout.js", layoutContent(node.type))
    folder.file("index.js", indexContent(node.name))
    if (node.children.length > 0) {
      createFolder(node.children, folder);
    }
  });
};


function createFile(tree) {
  const zip = new JSZip();
  const scheme = zip.folder("expo-router-scheme");

  createFolder(tree, scheme);

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "expo-router-scheme.zip");
  });
}


export default function generateER(edges, nodes) {

  const tree = createTree(edges, nodes);
  createFile(tree)

}