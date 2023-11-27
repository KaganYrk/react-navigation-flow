import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, semanticColors } from "@nextui-org/react";
import { createContext,  useEffect, useState } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { toast } from "react-toastify";
import blockStyle from "../helpers/blockStyle";

const BuilderContext = createContext();

const BuilderProvider = ({ children }) => {
    const [generatedCode, setGeneratedCode] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (generatedCode)
            setIsOpen(true)
    }, [generatedCode])

    return (
        <BuilderContext.Provider value={{ generatedCode, setGeneratedCode, isOpen, setIsOpen }}>
            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                scrollBehavior="inside"
                className=" bg-gradient-to-bl from-secondary-50 to-default-50 bg-opacity-90"
                backdrop="blur"
                size="4xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">
                                Scheme Code
                            </ModalHeader>
                            <ModalBody>
                                <SyntaxHighlighter lineNumberStyle={{ color: semanticColors.dark.foreground[500] }} showLineNumbers language="javascript" style={blockStyle}>
                                    {generatedCode}
                                </SyntaxHighlighter>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="success" onPress={() => navigator.clipboard.writeText(generatedCode).then(() => toast("Copied to clipboard", { type: 'info' }))}>
                                    Copy
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {children}
        </BuilderContext.Provider>
    )
}

export { BuilderContext, BuilderProvider }