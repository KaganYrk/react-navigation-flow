import { useEdges, useNodes, useReactFlow } from "reactflow";
import { useCallback } from "react";
import Dagre from '@dagrejs/dagre';
import { Button, Divider, Link } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

export default function Sidebar() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="sidebar-container  shadow-foreground-400 shadow-[0_3px_30px_-14px]">
            <div className="draggables-container">
                <Button color="secondary" variant="flat" className="font-light draggable" onDragStart={(event) => onDragStart(event, 'stack')} draggable>
                    Stack
                </Button>
                <Button color="secondary" variant="flat" className="font-light  draggable" onDragStart={(event) => onDragStart(event, 'tab')} draggable>
                    Tab
                </Button>
                <Button color="secondary" variant="flat" className="font-light draggable" onDragStart={(event) => onDragStart(event, 'drawer')} draggable>
                    Drawer
                </Button>
            </div>
            <Divider />
            <FormatLayoutButton />
            <div className="flex flex-1 justify-center items-end mt-4">
                <Link href="https://github.com/KaganYrk/react-navigation-flow" className=" justify-end " isExternal color="foreground" showAnchorIcon anchorIcon={<FaGithub size={20} />} />
            </div>
        </div>
    )
}


const FormatLayoutButton = () => {

    const { setNodes, setEdges, fitView } = useReactFlow()
    const nodes = useNodes();
    const edges = useEdges();
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const getLayoutedElements = (nodes, edges) => {
        g.setGraph({ rankdir: 'TB' });
        edges.forEach((edge) => g.setEdge(edge.source, edge.target));
        nodes.forEach((node) => g.setNode(node.id, node));
        Dagre.layout(g);
        return {
            nodes: nodes.map((node) => {
                const { x, y } = g.node(node.id);

                return { ...node, position: { x, y } };
            }),
            edges,
        };
    };

    const onLayout = useCallback(
        () => {
            const layouted = getLayoutedElements(nodes, edges);
            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);
            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges]
    );

    return (
        <Button variant="solid" className="font-light" title="Generate" type="button" onClick={() => onLayout()}>Format</Button>

    )
}


