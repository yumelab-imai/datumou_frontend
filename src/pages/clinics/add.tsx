// import React, { useEffect } from 'react';

import * as React from "react";

import {
    ChakraProvider,
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure, //utility hooks の一つ
} from "@chakra-ui/react";
import { Form } from "../../components/clinics/registerForm";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
      <ChakraProvider>
          <Button onClick={onOpen}>クリニックを登録する</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>クリニック登録フォーム</ModalHeader>
                  <ModalBody>
                      <Form />
                  </ModalBody>
              </ModalContent>
          </Modal>
      </ChakraProvider>
  );
}
