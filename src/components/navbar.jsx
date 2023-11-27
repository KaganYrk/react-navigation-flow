import { Button, Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, PopoverContent, Popover, PopoverTrigger } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { CiDark, CiLight } from "react-icons/ci";
import { ThemeContext } from '../contexts/themeContext';
import { useEdges, useNodes, useReactFlow } from 'reactflow';
import { BuilderContext } from '../contexts/builderContext';
import generateER from '../helpers/ERbuild';
import generateRN from '../helpers/RNbuild';



const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <NextNavbar maxWidth='full' className='NextNavbar shadow-sm navbar border-default-50 border-b-[1px]' >
            <NavbarBrand>
                <p className="font-normal antialiased">React Navigation <span className='text-secondary-500 '>Flow</span></p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        isIconOnly
                        variant='light'
                        onClick={() => {
                            const newTheme = theme === 'light' ? 'dark' : 'light'
                            setTheme(newTheme)
                        }}>
                        {theme === 'dark' ?
                            <CiLight className="theme-icon" size="1.5rem" />
                            :
                            <CiDark className="theme-icon" size="1.5rem" />
                        }
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <UploadShemeButton />
                </NavbarItem>
                <NavbarItem>
                    <SaveSchemeButton />
                </NavbarItem>
                <NavbarItem>
                    <GenerateButton />
                </NavbarItem>
            </NavbarContent>


        </NextNavbar>
    )
}

const GenerateButton = () => {
    const { setGeneratedCode, setIsOpen } = useContext(BuilderContext)
    const nodes = useNodes();
    const edges = useEdges();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (



        <Popover onClose={()=>setIsPopoverOpen(false)} isOpen={isPopoverOpen} backdrop='opaque' placement="bottom" showArrow offset={10}>
            <PopoverTrigger>
                <Button onClick={()=>setIsPopoverOpen(true)} className='generate-button' color="primary">Generate</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
                <div className="px-1 py-2 w-full">
                    <div className=" flex flex-col gap-2 w-full">
                        <Button
                            className='bg-secondary-300 font-normal'
                            variant='flat'
                            title="React Navigation"
                            type="button"
                            onClick={() => {
                                setIsPopoverOpen(false);
                                setIsOpen(true);
                                setGeneratedCode(generateRN(edges, nodes))
                            }}>
                            React Navigation
                        </Button>
                        <Button
                            className='bg-foreground text-background font-normal'
                            variant='flat'
                            title="Expo Router"
                            type="button"
                            onClick={() => {
                                setIsPopoverOpen(false);
                                generateER(edges, nodes)
                            }}>
                            Expo Router
                        </Button>

                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}

const SaveSchemeButton = () => {
    const nodes = useNodes();
    const edges = useEdges();
    return (
        <Button
            color='default'
            title="Generate"
            className='font-extralight'
            type="button"
            onClick={() => {
                const dataStr = JSON.stringify({ nodes, edges }, null, 2); // stringify with pretty print
                const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
                const element = document.createElement("a");
                element.setAttribute("href", dataUri);
                element.setAttribute("download", "rn_flow_scheme.json");
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
                document.body.removeChild(element);
            }} >
            Save
        </Button>
    )


}

function UploadShemeButton() {
    const reactFlow = useReactFlow();
    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const data = JSON.parse(e.target.result);
            reactFlow.setNodes(data.nodes);
            reactFlow.setEdges(data.edges);
        };
    };

    return (
        <>
            <input
                type="file"
                id="fileUpload"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            <Button
                color='default'
                className='font-extralight'
                onClick={() => document.getElementById('fileUpload').click()}
            >
                Load
            </Button>
        </>
    );
}


export default Navbar;