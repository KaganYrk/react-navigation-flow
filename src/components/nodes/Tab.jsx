/* eslint-disable react/jsx-key */
import { semanticColors } from '@nextui-org/react';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Handle, NodeToolbar, Position, useReactFlow } from 'reactflow';
import StatusBar from '../statusbar';
import { ThemeContext } from '../../contexts/themeContext';



function TabNode({ data, isConnectable, selected, id }) {
    const [label, setLabel] = useState(data.label)
    const ReactFlow = useReactFlow()
    const { theme } = useContext(ThemeContext)


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
        <div className='screen-frame bg-secondary-500' style={{ borderColor: selected ? semanticColors[theme].foreground[700] : 'transparent' }}>
            <StatusBar />
            <div className='text-[10px] font-light absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'  >
                {label}

            </div>
            <NodeToolbar isVisible={data.toolbarVisible} position={Position.Top}>
                <input value={label} onChange={x => { setLabel(x.target.value) }} placeholder='name' className='name-input'></input>
            </NodeToolbar>
            <Handle className='handle' type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
            <Handle className='handle' type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />

        </div >
    );
}

export default TabNode;




