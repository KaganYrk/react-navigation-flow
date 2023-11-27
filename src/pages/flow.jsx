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
                "label": "Screen0"
            },
            "positionAbsolute": {
                "x": 378,
                "y": 166
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen1",
            "type": "stack",
            "position": {
                "x": 398,
                "y": 690
            },
            "data": {
                "label": "Screen1"
            },
            "positionAbsolute": {
                "x": 398,
                "y": 690
            },
            "selected": false,
            "dragging": false
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen2",
            "type": "stack",
            "position": {
                "x": 435,
                "y": 1075
            },
            "data": {
                "label": "Screen2"
            },
            "positionAbsolute": {
                "x": 435,
                "y": 1075
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen3",
            "type": "stack",
            "position": {
                "x": 460,
                "y": 1478
            },
            "data": {
                "label": "Screen3"
            },
            "positionAbsolute": {
                "x": 460,
                "y": 1478
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen4",
            "type": "stack",
            "position": {
                "x": 480,
                "y": 1931
            },
            "data": {
                "label": "Screen4"
            },
            "positionAbsolute": {
                "x": 480,
                "y": 1931
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen5",
            "type": "stack",
            "position": {
                "x": 441,
                "y": 2318
            },
            "data": {
                "label": "Screen5"
            },
            "positionAbsolute": {
                "x": 441,
                "y": 2318
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen6",
            "type": "stack",
            "position": {
                "x": 508,
                "y": 2744
            },
            "data": {
                "label": "Screen6"
            },
            "positionAbsolute": {
                "x": 508,
                "y": 2744
            },
            "selected": false,
            "dragging": false
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen7",
            "type": "stack",
            "position": {
                "x": 548,
                "y": 3229
            },
            "data": {
                "label": "Screen7"
            },
            "positionAbsolute": {
                "x": 548,
                "y": 3229
            }
        },
        {
            "width": 154,
            "height": 304,
            "id": "Screen8",
            "type": "stack",
            "position": {
                "x": 581,
                "y": 3739
            },
            "data": {
                "label": "Screen8"
            },
            "positionAbsolute": {
                "x": 581,
                "y": 3739
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
        },
        {
            "source": "Screen1",
            "sourceHandle": "b",
            "target": "Screen2",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen1b-Screen2a"
        },
        {
            "source": "Screen2",
            "sourceHandle": "b",
            "target": "Screen3",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen2b-Screen3a"
        },
        {
            "source": "Screen3",
            "sourceHandle": "b",
            "target": "Screen4",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen3b-Screen4a"
        },
        {
            "source": "Screen4",
            "sourceHandle": "b",
            "target": "Screen5",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen4b-Screen5a"
        },
        {
            "source": "Screen5",
            "sourceHandle": "b",
            "target": "Screen6",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen5b-Screen6a"
        },
        {
            "source": "Screen6",
            "sourceHandle": "b",
            "target": "Screen7",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen6b-Screen7a"
        },
        {
            "source": "Screen7",
            "sourceHandle": "b",
            "target": "Screen8",
            "targetHandle": "a",
            "id": "reactflow__edge-Screen7b-Screen8a"
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