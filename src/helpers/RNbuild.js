/* eslint-disable no-prototype-builtins */

import { objectMap } from "./functions";

const TypeNames = {
  stack: "Stack",
  tab: "BottomTab",
  drawer: "Drawer",
}

const TypeImportNames = {
  stack: 'stack',
  tab: 'bottom-tabs',
  drawer: 'drawer'
}

const createTree = (edges, nodes) => {

  const tree = edges.reverse().reduce((acc, edge) => {
    const { source, target } = edge;
    const sourceLabel = nodes.find(x => x.id === source)?.data.label
    const targetLabel = nodes.find(x => x.id === target)?.data.label

    if (!acc[sourceLabel]) {
      acc[sourceLabel] = [];
    }

    acc[sourceLabel].push(targetLabel);

    return acc;
  }, {});

  return tree
}

const createNavigator = (tree, nodes) => {
  let code = ""

  objectMap(tree, (value, key) => {

    const nodeType = nodes.find(node => node.data.label === key).type
    const typeName = TypeNames[nodeType]
    const formattedName = key.charAt(0).toUpperCase() + key.slice(1);
    const navigatorName = `${formattedName}${typeName}Navigator`

    //Create the navigator
    code = `\nconst ${navigatorName} = create${typeName}Navigator();` + code + `\n`;

    //Navigator Wrapper
    code += `\nconst ${formattedName}${typeName}= () => (\n\t <${navigatorName}.Navigator>\n`

    value.map((item) => {
      if (!tree.hasOwnProperty(item)) {
        code += `\t\t <${navigatorName}.Screen name="${item}" component={${item}}/>\n`
      }
      else {
        const childNodeType = TypeNames[nodes.find(node => node.data.label === item).type]
        code += `\t\t <${navigatorName}.Screen name="${item}${childNodeType}" component={${item}${childNodeType}}/>\n`
      }
    })

    code += `\t</${navigatorName}.Navigator>\n)`

  })

  return code;
}

const addImports = (nodes,code) => {

  let imports = ''
  const nodeTypes = new Set(nodes.map(node => node.type));

  nodeTypes.forEach(type => {
    const typeName = TypeNames[type];
    const typeImportName = TypeImportNames[type];

    if (typeImportName) {
      imports = `import { create${typeName}Navigator } from '@react-navigation/${typeImportName.toLowerCase()}';\n` + imports;
    }
  });

  return imports + code;
}

export default function generateRN(edges, nodes) {
  let code = ""

  const tree = createTree(edges, nodes)

  code = createNavigator(tree, nodes)

  code = addImports(nodes,code) 

  return code
}