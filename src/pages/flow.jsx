import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge
} from 'reactflow';

import StackNode from '../components/nodes/Stack';
import TabNode from '../components/nodes/Tab';
import DrawerNode from '../components/nodes/Drawer';
import { Button,  Kbd, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { CiCircleInfo } from 'react-icons/ci';
const nodeTypes = { stack: StackNode, tab: TabNode, drawer: DrawerNode };

let id = 11;

const getId = () => `Screen${id++}`;

const Flow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState([
        {
            "width": 154,
            "height": 304,
            "id": "Screen0",
            "type": "stack",
            "position": {
                "x": 378,
                "y": 166
            },
            "data": {
                "label": "Root"
            },
            "positionAbsolute": {
                "x": 378,
                "y": 166
            }
        },
        {
            "width": 134,
            "height": 304,
            "id": "Screen1",
            "type": "stack",
            "position": {
                "x": 398,
                "y": 690
            },
            "data": {
                "label": "Home"
            },
            "positionAbsolute": {
                "x": 398,
                "y": 690
            }
        }
    ]);
    const [edges, setEdges] = useState([
        {
            "source": "Screen0",
            "sourceHandle": "b",
            "target": "Screen1",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen0b-Screen1a"
        }
    ]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onNodesChange = useCallback(
        (changes) => { setNodes((nds) => applyNodeChanges(changes, nds)) },
        []
    );

    const onEdgesChange = useCallback(
        (changes) => { setEdges((eds) => applyEdgeChanges(changes, eds)) },
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
            };
            newNode.data = { label: newNode.id }
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const onConnect = useCallback((params) => { setEdges((eds) => addEdge(params, eds)) }, []);

    function InfoButton() {


        return (
            <Popover className='w-fit' placement="left-start">
                <PopoverTrigger>
                    <Button variant='light' isIconOnly>
                        <CiCircleInfo size='1.5rem' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent >
                    <div className="px-1 py-2 flex flex-1 items-center  flex-row gap-3 ">
                        <div className='flex flex-1  gap-1'>
                            <Kbd keys={["up"]} />
                            <Kbd keys={["down"]} />
                            <Kbd keys={["left"]} />
                            <Kbd keys={["right"]} />
                        </div>
                        <div className='flex flex-1'>
                            <div className="text-tiny">Move node</div>
                        </div>
                    </div>
                    <div style={{flex:1}} className="px-1 py-2 flex self-stretch items-center  flex-row gap-3 ">
                        <div className='flex  gap-1'>
                            <div style={{}}>
                                <Kbd keys={["delete"]} />
                            </div>
                        </div>
                            <div className=' flex flex-1 justify-end'>
                                <div className="text-tiny">Delete node & edge</div>
                            </div>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
    return (
        <div style={{ flex: 1, height: '100%' }} ref={reactFlowWrapper}>
            <div className='info-button'>
                <InfoButton />

            </div>
            <ReactFlow
                minZoom={0.1}
                className='react-flow'
                nodes={nodes}
                onNodesChange={onNodesChange}
                elementsSelectable
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                deleteKeyCode={["Backspace", "Delete"]}
            >
                <Background />
                <Controls />

            </ReactFlow>

        </div>
    )
}
export default Flow;