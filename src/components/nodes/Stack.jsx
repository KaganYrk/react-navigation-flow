
import { semanticColors } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useReactFlow } from 'reactflow';
import StatusBar from '../statusbar';
import { useTheme } from 'next-themes';

function StackNode({ data, isConnectable, selected, id }) {
    const [label, setLabel] = useState(data.label)
    const ReactFlow = useReactFlow()
    const { theme } = useTheme()



    useEffect(() => {
        if (label) {
            ReactFlow.setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === id) {
                        node.data = {
                            ...node.data,
                            label: label,
                        };
                    }
                    return node;
                })
            )
        }
    }, [label, selected]);

    return (
        <div className=' screen-frame bg-secondary-100' style={{ borderColor: selected ? semanticColors[theme].foreground[500] : 'transparent' }}>
            <StatusBar />
            <div className=' absolute  text-[10px] font-light  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {label}
            </div>
            <NodeToolbar isVisible={data.toolbarVisible} position={Position.Top}>
                <input value={label} onChange={x => { setLabel(x.target.value) }} placeholder='name' className='name-input'></input>
            </NodeToolbar>
            <Handle className='handle' type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
            <Handle className='handle' type="source" onConnect={x => console.log(x)} position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default StackNode;




